//*! for the creation of new user in database
//*! different form UserDTO (for incomping user input)

export default interface NewUserDTO {
    usrName: string, 
    email: string,
    birthDate: string,
    nationalId: number,
    credential: object
}