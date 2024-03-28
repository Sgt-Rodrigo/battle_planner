import { AppDataSource, UserModel } from "../config/data-source";

const user1 = {
    usrName: 'Emma',
    email: 'emma@mail.com',
    birthDate: "1975-07-13",
    nationalId: 1111,
    password: "secretQueent"
}

const user2 = {
    usrName: 'Ricky',
    email: 'ricky@mail.com',
    birthDate: "1975-07-13",
    nationalId: 22222,
    password: "secretKing"
}

const user3 = {
    usrName: 'George',
    email: 'george@mail.com',
    birthDate: "1975-07-13",
    nationalId: 333333,
    password: "georgeisn'tathomenow"
}

const user4 = {
    usrName: 'Cosmo',
    email: 'cosmo@mail.com',
    birthDate: "1975-07-13",
    nationalId: 4444444,
    password: "theass-man"
}

const user5 = {
    usrName: 'Elaine',
    email: 'elaine@mail.com',
    birthDate: "1975-07-13",
    nationalId: 555555,
    password: "sweetlaugh"
}

export const preLoadData = async ()=>{

     await   AppDataSource.manager.transaction(async(transactionalEntityManager)=>{

            const users = await UserModel.find(); //*?returns an array
            //*? if array is not empty > 
            if(users.length) return console.log(`Preload aborted: previous preload still exists in database`)

            const newUser1 = await UserModel.create(user1);
            const newUser2 = await UserModel.create(user2);
            const newUser3 = await UserModel.create(user3);
            const newUser4 = await UserModel.create(user4);
            const newUser5 = await UserModel.create(user5);
        
            await transactionalEntityManager.save(newUser1);
            await transactionalEntityManager.save(newUser2);
            await transactionalEntityManager.save(newUser3);
            await transactionalEntityManager.save(newUser4);
            await transactionalEntityManager.save(newUser5);
        
            console.log('Database Pre-load Done');
        
        })
}
