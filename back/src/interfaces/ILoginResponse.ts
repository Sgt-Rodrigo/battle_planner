export default interface ILoginResponse {
    login: boolean;
    user: {
      id: number;
      name: string;
      email: string;
      birthdate: string;
      nDni: number;
    };
  }