import { Router } from "express";
import { cancelAppointment, createNewAppointment, getAppointmentByID, getAppointments } from "../controllers/AppointmentsController";
import auth from "../middlewares/auth";

const appointmentsRouter:Router = Router();

appointmentsRouter.get('/',getAppointments);

appointmentsRouter.post('/schedule', createNewAppointment);

appointmentsRouter.put('/cancel/:id', cancelAppointment);

appointmentsRouter.get('/:id', getAppointmentByID);

export default appointmentsRouter;