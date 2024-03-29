import { error } from "console";
import { AppDataSource} from "../config/data-source";
import Appointment from "../dto/AppointmentDTO";
import IAppointment from "../interfaces/IAppointment";
import AppointmentDTO from "../dto/AppointmentDTO";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

// let id = 13;

// const appointments: IAppointment[] = [
//     {
//         id: 1,
//         date: "2024-3-25",
//         time: '10:00',
//         userId: 1,
//         status: 'active'
//     },
//     {
//         id: 2,
//         date: "2024-3-26",
//         time: '11:00',
//         userId: 2,
//         status: 'cancelled'
//     },
//     {
//         id: 3,
//         date: "2024-3-27",
//         time: '12:00',
//         userId: 3,
//         status: 'active'
//     }
// ];

export default class AppointmentsService {

    async getAllAppointments(){
        const appointments = await AppointmentRepository.find({
            relations: {
                user: true
            }
        });
        return appointments
    }

    async getAppointmentById(id:number) {
        // const appointment = appointments.find(appointment => appointment.id === id);

        // return appointment ? appointment : null
    }

    async createAppointment(appointmentData: AppointmentDTO){  
        //* Service using queryRunner

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();

       try {
         queryRunner.startTransaction();
 
         const newAppointment = await AppointmentRepository.create(appointmentData);
         await queryRunner.manager.save(newAppointment);
 
         const user = await UserRepository.findById(appointmentData.userId);
 
         newAppointment.user = user;
         await queryRunner.manager.save(newAppointment);
 
         await queryRunner.commitTransaction();
 
         return newAppointment
       } catch (error) {
           await queryRunner.rollbackTransaction();
           throw Error(`User Not Found.Appointment was not created`);
       }finally {
        await queryRunner.release();
       }        
     }

    async cancelAppointment(appointmentId: number): Promise<void> {
        //*identifies the appointment by id
        // const appointmentIndex = appointments.findIndex(appointment => appointment.id === appointmentId);
        
        // if (appointmentIndex !== -1) {
        //     appointments[appointmentIndex].status = 'cancelled';
        // } else {
        //     throw new Error('Appointment not found');
        // }
    }
    
}