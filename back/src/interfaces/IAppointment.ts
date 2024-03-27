export default interface IAppointment {
    id: number
    date: string,
    time: string,
    userId: number,
    status: 'active' | 'cancelled'
}



// {
//         "id": 1,
//          "date": "2024-2-6",
//          "time": "10:00",
//          "userId": "1",
//          "status": "active"  
// }