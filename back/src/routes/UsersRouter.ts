import { Router } from "express";
import { createUser, getUsers, deleteUser, getUserByID, loginUser } from "../controllers/UsersController";
import auth from "../middlewares/auth";

const usersRouter:Router = Router();

usersRouter.get('/', auth, getUsers);

usersRouter.post('/register', createUser);

usersRouter.post('/login', loginUser);

usersRouter.delete('/', deleteUser);

usersRouter.get('/:id', getUserByID);

export default usersRouter;