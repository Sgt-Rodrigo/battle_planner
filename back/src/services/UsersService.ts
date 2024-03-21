import UserDTO from "../dto/UserDTO";
import IUser from "../interfaces/IUser";

//*? mock database and id generator
let users:IUser[]= [
    {
        id: 1,
        usrName: 'Ricky',
        email: 'ricky@ricky.com',
        active: true
    }
];

let id: number = 2;

//*? implements a class to encapsulate the mehtods
export default class UsersServices {

    //*? async functions are typed with Promise<T> return
    async createUser(userData:UserDTO):Promise<IUser> {
        const newUser:IUser = {
            id,
            usrName: userData.usrName,
            email: userData.email,
            active: userData.active
        }
        users.push(newUser);
        
        id++;
        return newUser
    };

    async getUsers():Promise<IUser[]> {
        return users
    };

    async deleteUser(id:number):Promise<void> {
        users = users.filter((user:IUser) => user.id !== id)

    };
}