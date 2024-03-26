import ICredential from "../interfaces/ICredential";

//*? mock database and id generator
let credentials:ICredential[] = 
    [
        {
            id: 1,
            username: 'john_doe',
            password: 'password123'
        },
        {
            id: 2,
            username: 'jane_smith',
            password: 'secretPassword'
        },
        {
            id: 3,
            username: 'alice_wonderland',
            password: 'qwerty'
        }
    ];

let id:number = 4;


//*? implements a class to encapsulate the mehtods
export default class CredentialsService {

    async createCredential(username: string, password: string): Promise<number> {
        const newCredential: ICredential = {
            id: id,
            username: username,
            password: password
        };
        credentials.push(newCredential);
        id++;
        return newCredential.id;
    }

    //*? It returns null if the condition is not met
    async verifyCredential(username: string, password: string): Promise<number | null> {
        const credential = credentials.find(cred => cred.username === username);
    
        if (credential && credential.password === password) {
            return credential.id;
        }
    
        return null;
    }
}

