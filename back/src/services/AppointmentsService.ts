import { error } from "console";
import { AppointmentModel, UserModel } from "../config/data-source";
import Appointment from "../dto/AppointmentDTO";
import IAppointment from "../interfaces/IAppointment";
import AppointmentDTO from "../dto/AppointmentDTO";

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
        const appointments = await AppointmentModel.find({
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

    async createAppointment(appointmentData: AppointmentDTO) {       

         //*? finds the user. Only if it exist we will create and save the appointment.
        //*? user is one register, one entity instance of type User (entity) so it has an appointment property > the foreign key column >
        const user = await UserModel.findOneBy({id:appointmentData.userId})

        //*?  the checker suggest to use '?' cause this could be null if userId is not found. We handle this with  an if statemente for now.
        if(user){      
             //*? bear in mind, that for now I'm passing the userID manually through postman
             //*? creates the appointment and saves it in its table
        const newAppointment = await AppointmentModel.create(appointmentData);
        await AppointmentModel.save(newAppointment);

        newAppointment.user = user;
        await AppointmentModel.save(newAppointment);

           //*! updates the user entity instance 'appoitment' property (the join column) BUT does not save it in database!!!!
            // user.appointment = newAppointment;     

          //*! saves any updates on user entity instance in database (persistance)
            // await UserModel.save(user);

            return newAppointment;  
        } else {
            throw Error(`user was not found`)
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