//*? imports the UsersService
//*? I could ve used static methods but this approach is closer to angular

import { Request, Response } from "express";
import UsersServices from "../services/UsersService";
import IUser from "../interfaces/IUser";
import { User } from "../entities/User";
import ILoginResponse from "../interfaces/ILoginResponse";
import { reportError } from "../helpers/reportError";

//*? instantiate UsersService to use the instance methods (services)
const userService = new UsersServices();

//*? CONTROLLERS > 

export const createUser = async (req: Request, res: Response) => {

  //*destructures the user data
  //*! you must sanitize this cause right now you can send a number as 'username',and in the body ALL properties are always received as strings, so the type checker will let it pass, see? 
  const { usrName, email, birthDate, nationalId, password } = req.body;  
  //* creates the new user via createUser service
  try {
   
   const newUser: IUser = await userService.createUser({
     usrName,
     email,
     birthDate,
     nationalId,
   }, password);
   res.status(201).json(newUser);
 } catch (error) {
  if(error instanceof Error){
    res.status(400).json({message: error.message})
  }
 }
};

export const loginUser = async (req: Request, res: Response) => {
  const {usrName, password} = req.body;
  try {
    const loggedInUser:ILoginResponse = await userService.loginUser(usrName, password);
    console.log('from Controller',loggedInUser)
    res.status(200).json(loggedInUser);
  } catch (error) {
    if(error instanceof Error){
      res.status(400).json({message:error.message})
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await userService.getUsers();
  res.status(200).json(users);
};

export const getUserByID = async (req: Request, res: Response) => {
  const {id}= req.params;
  try {
    const user= await userService.getUserById(parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    reportError(error, 404, res);

    // if(error instanceof Error)
    // res.status(404).json({message: error.message})
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  await userService.deleteUser(id);
  res.status(200).json(`User Deleted Successfully`);
};
