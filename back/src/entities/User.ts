import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Credential } from "./Credential"

//*? this class creates the table and interacts with postgre. (create, find, etc)

@Entity({
    //*? sets the name of the postgre table. You DON'T USE IT HERE.
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    usrName: string

    @Column()
    email: string

    @Column()
    birthDate: string

    @Column('integer')
    nationalId: number 

    // @Column('integer')
    // credentialsId: number

    //*? One to One
    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential;

    //*? One to Many
    @OneToMany(()=> Appointment, (appointment) => appointment.user)
    appointments: Appointment[]


}
