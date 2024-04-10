import { Router } from "express";
import { createUser, getUsers, deleteUser, getUserByID, loginUser } from "../controllers/UsersController";
import auth from "../middlewares/auth";
import sanitizeUserInput from "../middlewares/sanitizeUserInput";

const usersRouter:Router = Router();

usersRouter.get('/', auth, getUsers);

usersRouter.post('/user/register', sanitizeUserInput, createUser);

usersRouter.post('/login', sanitizeUserInput, loginUser);

usersRouter.delete('/', deleteUser);

usersRouter.get('/user/:id', getUserByID);

export default usersRouter;