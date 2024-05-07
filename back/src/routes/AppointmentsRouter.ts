import { Router } from "express";
import { cancelAppointment, createNewAppointment, getAppointmentByID, getAppointments } from "../controllers/AppointmentsController";
import auth from "../middlewares/auth";
import sanitizeDeploymentInput from "../middlewares/sanitizeDeploymentInput";

const appointmentsRouter:Router = Router();

appointmentsRouter.get('/',getAppointments);

appointmentsRouter.post('/schedule',sanitizeDeploymentInput, createNewAppointment);

appointmentsRouter.put('/cancel/:id', cancelAppointment);

appointmentsRouter.get('/:id', getAppointmentByID);

export default appointmentsRouter;