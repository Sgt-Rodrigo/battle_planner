import { AppDataSource} from "../config/data-source";
// import IAppointment from "../interfaces/IAppointment";
import AppointmentDTO from "../dto/AppointmentDTO";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import { Appointment } from "../entities/Appointment";
import IAppointment from "../interfaces/IAppointment";
import { User } from "../entities/User";


export default class AppointmentsService {

    async getAllAppointments(){
       try {
         const appointments = await AppointmentRepository.find({
             relations: {
                 user: true
             }
         });

         if(!appointments.length) throw new Error(`No Appointments in current Schedule`)

         return appointments
       } catch (error) {
        throw error
       }
    }

    async getAppointmentById(id:number) {
       try {
        //*? findOne() like find() takes an object with a WHERE condition (also an object)
        const appointment = await AppointmentRepository.findOne({where: {id:id}});
        if(!appointment){
            throw new Error(`Appointment Not Found`);
        } else {
            return appointment;
        }
        //*? always return explicitly so the controller gets the result.
       } catch (error) {
             console.log(error);
             throw error    
       }
    }

    async createAppointment(appointmentData: AppointmentDTO){  
        //*! for function parameters always use a DTO >
       //*! In this case it would crash with IAppointment/Appointment.
      
        //* Service using queryRunner
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        queryRunner.startTransaction();

       try { 
        //*? verifies user exists first
        //*! .findById() is a custom function you made via the Repo. IT IS NOT TYPEORM'S > its counterpart would be findOne({where:{}})

         const user = await UserRepository.findById(appointmentData.userId);

         //*? this line is useless now cause the custom function .findById() already 'throws' and propagates an error to a top level caller function(this one) and hence terminates it.
        //  if (!user) throw new Error(`User Not Found`)

        //*? create appointment, assign user, save and commit.
         const newAppointment:Appointment = await AppointmentRepository.create(appointmentData); 
         newAppointment.user = user;
         //*! it is RECOMMENDED to use queryRunner.manager to save() changes in transactions
         //* You can use the Repo, Class and the instance though but to keep it consistant use the runner.manager
         await queryRunner.manager.save(newAppointment);
 
         await queryRunner.commitTransaction();

         //*! This returned appointment is the complete one, the one saved in the database, it now has the id. 
         return newAppointment
       } catch (error) {
           await queryRunner.rollbackTransaction();
           //*! notice how I re-throw the error >
           //*! this (error) is passed from the try block, so you don't need to throw a new one, just re-throw it so the controller can handle it.
           throw error;
       }finally {
        await queryRunner.release();
       }        
     }

    async cancelAppointment(id: number){
        //*identifies the appointment by id
        try {
            //*? returns the whole record object
            const appointment = await Appointment.findOne({where:{id:id}})
            if(!appointment) throw new Error(`Appointment Not Found`);
            
            //*? changes the status. 
            //*? notice await is not used, this is a sync operation(we have the object now)
            appointment.status = 'cancelled';

            //*? saves the modified object
            //*? notice I 'm not using the AppointmentRepository nor the class here
            //*? this is valid, entity instances actually have save() method and  typeorm understands this is an instance of Appointment so it knows where to save it.
            //*? Of course, the best practice is to use the Repo.
            await appointment.save();

        } catch (error) {
            console.log(error);
            //*! Remember: throw 'propagates' up to the calling function (the controller) so this Error is actually caught by the controller and can be displayed with json({message:error})
            throw new Error(`Cancelation failed: Appointment Not Found`)
        }      
    }
    
}