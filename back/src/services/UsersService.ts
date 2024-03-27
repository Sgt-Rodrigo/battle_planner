import { AppDataSource, UserModel } from "../config/data-source";
import UserDTO from "../dto/UserDTO";
import { User } from "../entities/User";
import IUser from "../interfaces/IUser";
import CredentialsService from "./CredentialsService";

//*? mock database and id generator
let users:IUser[]= [
    {
        id: 1,
        usrName: 'Ricky',
        email: 'ricky@ricky.com',
        birthDate: '1980-6-13',
        nationalId: 456, 
        credentialsId: 15
    }
];

let id: number = 2;

const credentialsService = new CredentialsService();

//*? implements a class to encapsulate the mehtods
export default class UsersServices {

    //*? return all users
    async getUsers():Promise<User[]> {
        const users = await UserModel.find();
        return users
    };

    //*?returns 1 user by id.
    async getUserById(id: number): Promise<User | null> {
        const user = await UserModel.findOneBy({id});

        // const user = users.find(user => user.id === id);
        // //* ternary to verify if user actually exists
        // return user ? user : null;

        return user
    }

    //*? async functions are typed with Promise<T> return
    async createUser(userData:UserDTO, password: string):Promise<IUser> {
        const newCredentialId = await credentialsService.createCredential(userData.usrName, password);
       
        const newUser:IUser = {
            id,
            usrName: userData.usrName,
            email: userData.email,
            birthDate: userData.birthDate,
            nationalId: userData.nationalId, 
            credentialsId: newCredentialId
        }

        //*? for users table creates and save a newUser
        const users = await UserModel.create(newUser);
        const result = await UserModel.save(newUser);

       
        
        id++;
        return newUser
    };
    

    async deleteUser(id:number):Promise<void> {
        users = users.filter((user:IUser) => user.id !== id)
    };
}