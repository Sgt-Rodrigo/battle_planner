export default interface FormValues {
    usrName: string,
    email: string;
    birthDate: string,
    nationalId: string,
    password: string;
  }

export type LoginValues = Pick<FormValues, "usrName" | "password">