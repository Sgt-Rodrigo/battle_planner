import { query } from "express";
import { AppDataSource, AppointmentModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";


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
        userId: 6,
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

            const users = await UserModel.find(); //*?returns an array
            //*? if array is not empty > 
            if(users.length) return console.log(`Preload aborted: previous UsersPreload  still exist in database`)

            for await (const user of usersPreload){
                const newUser = await UserModel.create(user);
                await transactionalEntityManager.save(newUser);
            }        
        
            console.log('Database - UsersPreload Done');
        
        })
}


// export const AppointmentsPreLoadData = async ()=>{

//    await AppDataSource.manager.transaction(async(transactionalEntityManager)=>{

//         const appointments = await AppointmentModel.find();

//         if(appointments.length) return console.log('Preload aborted: previous AppointmentsPreload still exist in database')

//         for await (const appointment of appointmentsPreload){
//             const newAppointment = await AppointmentModel.create(appointment);
//             await transactionalEntityManager.save(newAppointment);

//             const user = await UserModel.findOneBy({id:appointment.userId});

//             if(user){
//                 newAppointment.user = user;
//                 transactionalEntityManager.save(newAppointment);
//             } else {
//                 console.log(`User not found, appointment assignment failed`)
//             }
//         }

//         console.log('Database - AppointmentsPreload Done')
//     })
// }



export const AppointmentsPreLoadData = async ()=> {
    //*? creates runner and connects
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    //*? turns array of apointments into array of promises. Promises that run the operation needed.
    const promises = appointmentsPreload.map(async(appointment)=>{
        const newAppointment = await AppointmentModel.create(appointment);
        await queryRunner.manager.save(newAppointment);
        const user = await UserModel.findOneBy({id: appointment.userId});
        if(!user) throw Error ('User Not Found')
        newAppointment.user = user;
        queryRunner.manager.save(newAppointment);

    })

    //*? Now we can use try/catch > not clear why I couldn't before (search)
    
   try {
     //*? transaction starts from here
     await queryRunner.startTransaction();
     
     await Promise.all(promises);
 
     console.log(`Appointments Preload > DONE`)
 
     await queryRunner.commitTransaction();
   } catch (error) {
    console.log(`Appointments could not be created`);
    await queryRunner.rollbackTransaction();       
   } finally {
    //*? 'finally' always executed regardless of there is or not an error
    //*? performance wise, we must always 'release'/ terminate the runner. 
    console.log(`Appointments Preload Attempt Terminated`);
    await queryRunner.release();
   }
}