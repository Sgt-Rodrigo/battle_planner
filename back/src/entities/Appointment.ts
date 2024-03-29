import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"


@Entity({
    name: 'appointments'
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: string

    @Column()
    time: string

    @Column()
    userId: number

    @Column()
    status:  'active' | 'cancelled'


    //*? Many to One
    @ManyToOne(()=> User, (user)=> user.appointments)
    user: User
    
}

