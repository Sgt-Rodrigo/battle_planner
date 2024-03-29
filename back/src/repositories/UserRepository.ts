import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";



const UserRepository = AppDataSource.getRepository(User).extend({
    async findById(id:number):Promise<User> {
        const user = await this.findOneBy({id});
        if(user) return user
        else throw Error(`Id not Found`)
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