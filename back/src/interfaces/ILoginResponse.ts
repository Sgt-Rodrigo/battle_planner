
export interface SingleAppointment {
  id: number,
    date: string,
    time: string,
    location: string,
    gameMode: string,
    userId: number,
    status: string
}


export default interface ILoginResponse {
    login: boolean;
    user: {
      id: number;
      name: string;
      email: string;
      birthdate: string;
      nDni: number;
      appointments:SingleAppointment[]
    };
  }