export default interface UserDTO {
    usrName: string, 
    email: string,
    birthDate: string,
    nationalId: number
}


//*? json to use in postman for testing
/*

{
    "usrName": "Elaine",
    "email": "elaine@bennes.com",
    "birthDate": "new Date(1980, 6, 13)",
    "nationalId": 64
  }



  ***more

  [
  {
    "id": 1,
    "usrName": "Ricky",
    "email": "ricky@ricky.com",
    "birthDate": "1980-07-13T03:00:00.000Z",
    "nationalId": 456,
    "credentialsId": 15
  },
  {
    "id": 2,
    "usrName": "Elaine",
    "email": "elaine@bennes.com",
    "birthDate": "new Date(1980, 6, 13)",
    "nationalId": 64,
    "credentialsId": 4
  },
  {
    "id": 3,
    "usrName": "George",
    "email": "george@constanza.com",
    "birthDate": "new Date(1980, 6, 13)",
    "nationalId": 54,
    "credentialsId": 5
  },
  {
    "id": 4,
    "usrName": "Cosmo",
    "email": "cosmo@kramer.com",
    "birthDate": "new Date(1980, 6, 13)",
    "nationalId": 4,
    "credentialsId": 6
  },
  {
    "id": 5,
    "usrName": "Jerry",
    "email": "jerry@seinfeld.com",
    "birthDate": "new Date(1980, 6, 13)",
    "nationalId": 4,
    "credentialsId": 7
  }
]

  */

