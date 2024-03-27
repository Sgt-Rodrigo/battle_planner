import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


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
    status: 'active' | 'cancelled'

    
}

