import { Request, Response } from "express";
import AppointmentsService from "../services/AppointmentsService";
import Appointment from "../dto/AppointmentDTO";
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

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    const newAppointment: IAppointment= await appointmentsService.createAppointment({
      id: 0,
      date,
      time,
      userId,
      status: 'active',
    }, userId);
  
    res.status(201).json(newAppointment);
}

export const cancelAppointment = async (req:Request ,res:Response)=> {
    const {id} = req.body;
    await appointmentsService.cancelAppointment(id);
    res.json(`The Appointment was CANCELLED succesfully`)
}