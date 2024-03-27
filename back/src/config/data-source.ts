import {DataSource} from 'typeorm';
import { User } from '../entities/User';
import { DATABASE_PASSWORD } from './envs';
import { Appointment } from '../entities/Appointment';


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
    entities: [User, Appointment],
    subscribers: [],
    migrations: [],
})


export const UserModel = AppDataSource.getRepository(User);
export const AppointmentModel = AppDataSource.getRepository(Appointment);