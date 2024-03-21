import { Router } from "express";
import { cancelAppointment, createNewAppointment, getAppointmentByID, getAppointments } from "../controllers/AppointmentsController";
import auth from "../middlewares/auth";

const appointmentsRouter:Router = Router();

appointmentsRouter.get('/', getAppointments);

appointmentsRouter.post('/aschedule', createNewAppointment);

appointmentsRouter.put('/cancel', cancelAppointment);

appointmentsRouter.get('/:id', getAppointmentByID);

export default appointmentsRouter;