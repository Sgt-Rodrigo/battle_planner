import { Router } from "express";
import { createUser, getUsers, deleteUser, getUserByID, loginUser } from "../controllers/UsersController";
import auth from "../middlewares/auth";
import sanitizeRegisterInput from "../middlewares/sanitizeRegisterInput";
import sanitizeLoginInput from "../middlewares/sanitizeLoginInput";

const usersRouter:Router = Router();

usersRouter.get('/', auth, getUsers);

usersRouter.post('/user/register', sanitizeRegisterInput, createUser);

usersRouter.post('/login', sanitizeLoginInput, loginUser);

usersRouter.delete('/', deleteUser);

usersRouter.get('/user/:id', getUserByID);

export default usersRouter;