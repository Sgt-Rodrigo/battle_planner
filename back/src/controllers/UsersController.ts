//*? imports the UsersService
//*? I could have used static methods but this approach is close to angular(i like angular)

import { Request, Response } from "express";
import UsersServices from "../services/UsersService";
import IUser from "../interfaces/IUser";
import { User } from "../entities/User";


//*? instantiate UsersService to use the instance methods (services)
const userService = new UsersServices();

//*? CONTROLLERS > 

export const createUser = async (req: Request, res: Response) => {

  //*destructures the user data
  const { usrName, email, birthDate, nationalId, password } = req.body;

  //* creates the new user via createUser service
  const newUser: User = await userService.createUser({
    usrName,
    email,
    birthDate,
    nationalId,
  }, password);
  res.status(201).json(newUser);
};

export const loginUser = async (req: Request, res: Response) => {
  res.json(`logins a user`);
};

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await userService.getUsers();
  res.status(200).json(users);
};

export const getUserByID = async (req: Request, res: Response) => {
  const {id}= req.params;
  const user:User | null = await userService.getUserById(Number(id));
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  await userService.deleteUser(id);
  res.status(200).json(`User Deleted Successfully`);
};
