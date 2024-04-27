import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"


@Entity({
    name: 'appointments'
})
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: string

    @Column()
    time: string

    @Column()
    location: string

    @Column()
    gameMode: string

    @Column()
    userId: number

    @Column()
    status:  'active' | 'cancelled'


    //*? Many to One
    @ManyToOne(()=> User, (user)=> user.appointments)
    user: User
    
}

