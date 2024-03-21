import { Request, Response } from "express";


export const getAppointments = (req:Request ,res:Response)=> {
    res.json(`returns all appointments`)
}

export const getAppointmentByID = (req:Request ,res:Response)=> {
    res.json(`return one specific appointment`)
}

export const createNewAppointment = (req:Request ,res:Response)=> {
    res.json(`creates new appointment`)
}

export const cancelAppointment = (req:Request ,res:Response)=> {
    res.json(`cancel one appointment`)
}