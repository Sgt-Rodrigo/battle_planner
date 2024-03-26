export default interface UserDTO {
    usrName: string, 
    email: string,
    birthDate: Date,
    nationalId: number, 
    // credentialsId: number
}


//*? json to use in postman for post reqs
/*

{
    "usrName": "Elaine",
    "email": "elaine@bennes.com",
    "birthDate": "new Date(1980, 6, 13)",
    "nationalId": 64
  }

  */

