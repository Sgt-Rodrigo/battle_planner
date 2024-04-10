import { query } from "express";
import { AppDataSource} from "../config/data-source";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import AppointmentRepository from "../repositories/AppointmentRepository";


const usersPreload = [
     {
        usrName: 'Emma',
        email: 'emma@mail.com',
        birthDate: "1975-07-13",
        nationalId: 1111,
        password: "secretQueent"
    },
    {
        usrName: 'Ricky',
        email: 'ricky@mail.com',
        birthDate: "1975-07-13",
        nationalId: 22222,
        password: "secretKing"
    },

     {
        usrName: 'George',
        email: 'george@mail.com',
        birthDate: "1975-07-13",
        nationalId: 333333,
        password: "georgeisn'tathomenow"
    },
    {
        usrName: 'Cosmo',
        email: 'cosmo@mail.com',
        birthDate: "1975-07-13",
        nationalId: 4444444,
        password: "theass-man"
    },
    {
        usrName: 'Elaine',
        email: 'elaine@mail.com',
        birthDate: "1975-07-13",
        nationalId: 555555,
        password: "sweetlaugh"
    }
]

const appointmentsPreload = [
    {
        date: "2024-5-23",
        time: "10:00",
        userId: 5,
        status: 'active' as 'active'
    },
    {
        date: "2024-2-03",
        time: "22:00",
        userId: 1,
        status: 'active ' as 'active'
    },
    {
        date: "2024-9-5",
        time: "15:00",
        userId: 1,
        status: 'active' as 'active'
    },
    {
        date: "2024-1-6",
        time: "12:00",
        userId: 1,
        status: 'active' as 'active'
    },
    {
        date: "2024-7-9",
        time: "6:00",
        userId: 5,
        status: 'active' as 'active'
    }
]


export const UsersPreLoadData = async ()=>{

     await   AppDataSource.manager.transaction(async(transactionalEntityManager)=>{

            const users = await UserRepository.find(); //*?returns an array
            //*? if array is not empty > 
            if(users.length) return console.log(`Preload aborted: previous UsersPreload  still exist in database`)

            for await (const user of usersPreload){
                const newUser = await UserRepository.create(user);
                await transactionalEntityManager.save(newUser);
            }        
        
            console.log('Database - UsersPreload Done');
        
        })
}


export const AppointmentsPreLoadData = async ()=> {
    //*? creates runner and connects
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    //*? turns array of apointments into array of promises.
    //*! > REMEMBER > every 'async' function returns a PROMISE implicitly. 
    //*! > .map() iterates through the appointments array. 
    //*! > for each appointment, an async function IS EXECUTED, sequentially of course(it is an iteration) 
    //*! each asycn func  execution is handled by a worker or other thread different from the main thread > 
    //*! This is an example of CONCURRENCY > the execution of multiple tasks at the same time (not same start) using one single core and multitasking thecniques. 
    //*! .map() method itself DOES NOT WAIT!!! for each execution to finish >
    //*! .map() method immediatly returns an array of promises after last iteration. 
    //*! By this time, some asyn functions weren't resolved yet, which means, initially the array returned by map() will contain Promise<pending> objects.   
    const promises = appointmentsPreload.map(async(appointment)=>{
        //* verifies user exist first
        const user = await UserRepository.findOneBy({id: appointment.userId});

        //* 'throw' terminates function execution as 'return'
        if(!user) throw Error ('User Not Found');

        //* if user exists, creates new appointment instance using the Appointment Repository.create() method (creates the appointment on my behalf, intead of me doing it manually  with new Appointment())
        const newAppointment = await AppointmentRepository.create(appointment);

        //* save the user in the 'user' property of newAppointment
        newAppointment.user = user;

        //*save record via query runner.
        //*! queryRunner saves the new appointment instance via the EntityManager (.manager).
        //*! The EntityManager is aware of the Appointment entity and its mapping to the appointments table, so it knows how to persist the newAppointment instance to the database correctly.
        await queryRunner.manager.save(newAppointment);
    })

    //*! This will log an array with [Promise<pending>, Promise<pending>....]
    console.log(promises);

    //*! If you were to end your script right here. By the time you go check your database, if everything went ok, you will see the appointments saved there. 
    //*! Of course, this can't be let to luck of the draw. That's why we can use a transaction and try/catch with this > 

    //*? transaction starts from here, It can be placed outside the try block like the docs show.
    await queryRunner.startTransaction();
      
   try { 
       
       //* takes an array of promises and returns a new promise that resolves if all promises in the array are resolved, or rejects immediatly after 1 (one) promise rejects and returns the reason of the rejected promise.
       //*? awaits until ALL of them are resolved (with success). If at least 1 is rejected, the rest are not awaited to be settled. The flow jumps to the catch block.
       //*? Promises usually DO NOT resolve in the order they were executed, HOWEVER, Promise.all  returns the resolved Promises in their original order by default, if they all resolve.
     await Promise.all(promises);
 
     console.log(`Appointments Preload > DONE`)

     //*confirms the changes to make them permanent. It represents the COMMIT command in SQL
     await queryRunner.commitTransaction();
   } catch (error) {
    console.log(`Appointments could not be created`);
    //* reverses all changes made in the transaction.
    await queryRunner.rollbackTransaction();       
   } finally {
    //*? 'finally' is always executed regardless of any error cast
    //*? performance wise, we must always 'release'/ terminate the runner. 
    console.log(`Appointments Preload Attempt Terminated`);
    await queryRunner.release();
   }
}