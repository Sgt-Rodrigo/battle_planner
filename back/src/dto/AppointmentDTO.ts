export default interface AppointmentDTO {
    date: string,
    time: string,
    location: string,
    gameMode: string,
    userId: number,
    status: 'active' | 'cancelled'
}