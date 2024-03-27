import { Router } from "express";
import { cancelAppointment, createNewAppointment, getAppointmentByID, getAppointments } from "../controllers/AppointmentsController";
import auth from "../middlewares/auth";

const appointmentsRouter:Router = Router();

appointmentsRouter.get('/', auth, getAppointments);

appointmentsRouter.post('/schedule', createNewAppointment);

appointmentsRouter.put('/cancel', cancelAppointment);

appointmentsRouter.get('/:id', getAppointmentByID);

export default appointmentsRouter;