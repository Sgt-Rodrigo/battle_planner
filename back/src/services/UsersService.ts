import UserDTO from "../dto/UserDTO";
import IUser from "../interfaces/IUser";
import CredentialsService from "./CredentialsService";

//*? mock database and id generator
let users:IUser[]= [
    {
        id: 1,
        usrName: 'Ricky',
        email: 'ricky@ricky.com',
        birthDate: new Date(1980, 6, 13),
        nationalId: 456, 
        credentialsId: 15
    }
];

let id: number = 2;

const credentialsService = new CredentialsService();

//*? implements a class to encapsulate the mehtods
export default class UsersServices {

    //*? return all users
    async getUsers():Promise<IUser[]> {
        return users
    };

    //*?returns 1 user by id.
    async getUserById(id: number): Promise<IUser | null> {
        const user = users.find(user => user.id === id);
        //* ternary to verify if user actually exists
        return user ? user : null;
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
            credentialsId: userData.credentialsId
        }
        users.push(newUser);
        
        id++;
        return newUser
    };
    

    async deleteUser(id:number):Promise<void> {
        users = users.filter((user:IUser) => user.id !== id)

    };
}