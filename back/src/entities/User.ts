import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity({
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

    @Column('integer')
    credentialsId: number

    @OneToOne(()=> Appointment)
    @JoinColumn()
    appointment: Appointment
}
