import { Request, Response } from "express";
import AppointmentsService from "../services/AppointmentsService";
import IAppointment from "../interfaces/IAppointment";

const appointmentsService = new AppointmentsService();

export const getAppointments = async (req:Request ,res:Response)=> {
    const allAppointments = await appointmentsService.getAllAppointments();
    res.status(200).json(allAppointments);
}

export const getAppointmentByID = async (req:Request ,res:Response)=> {
    const {id} = req.body;
    const appointment = await appointmentsService.getAppointmentById(id);
    res.status(200).json(appointment);
}

export const createNewAppointment = async (req:Request ,res:Response)=> {
    const { date, time, userId } = req.body;

   
  
    try {
        const newAppointment: IAppointment= await appointmentsService.createAppointment({
          date,
          time,
          userId,
          status: 'active',
        });
      
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({error:`User Not Found.Appointment was not created`})
    }
}

export const cancelAppointment = async (req:Request ,res:Response)=> {
    const {id} = req.body;
    await appointmentsService.cancelAppointment(id);
    res.json(`The Appointment was CANCELLED succesfully`)
}