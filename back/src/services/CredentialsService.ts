import { CredentialModel } from "../config/data-source";
import CredentialDTO from "../dto/CredentialDTO";
import { Credential } from "../entities/Credential";
import ICredential from "../interfaces/ICredential";

//*? mock database and id generator
// let credentials:ICredential[] = 
//     [
//         {
//             id: 1,
//             username: 'john_doe',
//             password: 'password123'
//         },
//         {
//             id: 2,
//             username: 'jane_smith',
//             password: 'secretPassword'
//         },
//         {
//             id: 3,
//             username: 'alice_wonderland',
//             password: 'qwerty'
//         }
//     ];

// let id:number = 4;


//*? implements a class to encapsulate the mehtods
export default class CredentialsService {

    async createCredential(username:string, password:string):Promise<Credential> {
            
        const newCredential: Credential = Credential.create({
            username:username,
            password:password
        })

        //*? here you can also use newCredential.save()
        await Credential.save(newCredential);

      console.log(newCredential)
        return newCredential;
    }

    //*? It returns null if the condition is not met


    //*! You should never have a path to the credentials mate... just use the database directly
    // async getAllCredentials(){
    //     return await CredentialModel.find();
    // }

    async verifyCredential(username: string, password: string) {
    //     const credential = credentials.find(cred => cred.username === username);
    
    //     if (credential && credential.password === password) {
    //         return credential.id;
    //     }
    
    //     return null;
    // }

}
}
