import { Request, Response } from "express";
import AppointmentsService from "../services/AppointmentsService";
import { Appointment } from "../entities/Appointment";
import { reportError } from "../helpers/reportError";

const appointmentsService = new AppointmentsService();

export const getAppointments = async (req: Request, res: Response) => {
 try {
   const allAppointments = await appointmentsService.getAllAppointments();
 
   if (!allAppointments.length) res.status(404).json(`Appointment not found`);
 
   res.status(200).json(allAppointments);
 } catch (error) {
  reportError(error, 404, res)
 }
};

export const getAppointmentByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    //*! req.params are all strings, you must parse values like numbers and booleans
    const appointment = await appointmentsService.getAppointmentById(
      parseInt(id)
    );
    res.status(200).json(appointment);
  } catch (error) {
    return reportError(error, 404, res);

    // if(error instanceof Error) {
    //   res.status(400).json({ message: error.message });
    // }
  }
};

export const createNewAppointment = async (req: Request, res: Response) => {
  const { date, time, location, gameMode, userId } = req.body;

  try {
    //*! Remeber: typeorm understands the any 'GeneratedColumn' value will be automatically created by the database later, that's why using this interface as a type does NOT raise an error.
    //*! Hence, you can type this with IAppointment or Appointment

    const newAppointment: Appointment =
      await appointmentsService.createAppointment({
        date,
        time,
        location,
        gameMode,
        userId,
        status: "active",
      });

    res.status(201).json(newAppointment);
  } catch (error) {
    reportError(error, 400, res);

    // if(error instanceof Error) {
    //     res
    //       .status(400)
    //       .json({message: error.message});
    // }
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  //*! params are ALL strings > parse them if needed
  const { id } = req.params;

  try {
    await appointmentsService.cancelAppointment(parseInt(id));
    res.json(`Appointment CANCELLED`);
  } catch (error) {
    reportError(error, 404, res)

    // if (error instanceof Error) {
    //   //*! this error is coming from the Service, throw errors propagate up to the calling function. (read more on your notes)
    //   res.status(404).json({ message: error.message });
    // }
  }
};
