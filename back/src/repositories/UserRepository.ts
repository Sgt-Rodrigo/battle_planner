import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";


//* declares a User Repo. UserRepository is an object representing the User Entity. Via this object we can then access the manager and hence CRUD methods and other options. 
//* Here we also chain extent() to modify the original user repo to add a custom function to use later. extend() returns the whole custom UserRepository. 
const UserRepository = AppDataSource.getRepository(User).extend({
    async findById(id:number):Promise<User> {
        //*? findOneBy() is typeOrm's.
        const user = await this.findOneBy({id});
        if(user) return user
        else throw Error(`User not Found`)
    },

    async checkById(id:number): Promise<boolean> {
        const user = await this.findById(id);
        return !!user
        //*? same as > 
        // if user return true
        // else return false
    }
})

export default UserRepository;