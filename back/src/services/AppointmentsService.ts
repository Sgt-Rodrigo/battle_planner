import Appointment from "../interfaces/IAppointment";

let id = 4;

const appointments: Appointment[] = [
    {
        id: 1,
        date: new Date(2024, 3, 25),
        time: '10:00',
        userId: 1,
        status: 'active'
    },
    {
        id: 2,
        date: new Date(2024, 3, 26),
        time: '11:00',
        userId: 2,
        status: 'cancelled'
    },
    {
        id: 3,
        date: new Date(2024, 3, 27),
        time: '12:00',
        userId: 3,
        status: 'active'
    }
];

export default class AppointmentsService {

    async getAllAppointments():Promise<Appointment[]>{
        return appointments
    }

    async getAppointmentById(id:number): Promise<Appointment | null> {
        const appointment = appointments.find(appointment => appointment.id === id);

        return appointment ? appointment : null
    }

    async createAppointment(appointmentData: Appointment, userId: number): Promise<Appointment> {
        if (!userId) {
            throw new Error('User ID is required');
        }
    
        const newAppointment: Appointment = {
            id: id,
            date: appointmentData.date,
            time: appointmentData.time,
            userId: userId,
            status: 'active'
        };
        appointments.push(newAppointment);
        id++;
        
        return newAppointment;
    }

    async cancelAppointment(appointmentId: number): Promise<void> {
        //*identifies the appointment by id
        const appointmentIndex = appointments.findIndex(appointment => appointment.id === appointmentId);
        
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex].status = 'cancelled';
        } else {
            throw new Error('Appointment not found');
        }
    }
    
}