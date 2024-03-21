//*? imports the UsersService
//*? I could have used static methods but this approach is close to angular(i like angular)

import { Request, Response } from "express";
import UsersServices from "../services/UsersService";
import IUser from "../interfaces/IUser";

//*? instantiate UsersService to use the instance methods (services)
const userService = new UsersServices();

export const createUser = async (req: Request, res: Response) => {
  const { usrName, email, active } = req.body;
  const newUser: IUser = await userService.createUser({
    usrName,
    email,
    active,
  });
  res.status(201).json(newUser);
};

export const loginUser = async (req: Request, res: Response) => {
  res.json(`logins a user`);
};

export const getUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await userService.getUsers();
  res.status(200).json(users);
};

export const getUserByID = async (req: Request, res: Response) => {
  res.json(`returns one specific user via its id`);
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body;
  await userService.deleteUser(id);
  res.status(200).json(`User Deleted Successfully`);
};
