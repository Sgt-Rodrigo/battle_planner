import { Router } from "express";
import usersRouter from "./UsersRouter";
import appointmentsRouter from "./AppointmentsRouter";

//*creates main router and types it via @type/express.
const router:Router = Router();

//*? routes by entity

router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);

export default router;