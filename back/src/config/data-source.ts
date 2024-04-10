import {DataSource} from 'typeorm';
import { User } from '../entities/User';
import { DATABASE_PASSWORD } from './envs';
import { Appointment } from '../entities/Appointment';
import { Credential } from '../entities/Credential';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: DATABASE_PASSWORD,
    database: "demo_typeorm",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})


//*? this is later done in a separate dir as Repositories

export const UserModel = AppDataSource.getRepository(User);
export const AppointmentModel = AppDataSource.getRepository(Appointment);
export const CredentialModel = AppDataSource.getRepository(Credential);
