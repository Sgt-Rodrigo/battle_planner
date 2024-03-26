export default interface Appointment {
    date: Date,
    time: 'string',
    userId: number,
    status: 'active' | 'cancelled'
}