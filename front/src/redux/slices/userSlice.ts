import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//w appointments interface
interface SingleAppointment {
    id: number,
    date: string,
    time: string,
    location: string,
    gameMode: string,
    userId: number,
    status: 'active' | 'cancelled'
}


//w type for the initialState
interface InitialState {
    login:boolean,
    user: {
        id: number,
        name: string,
        email: string,
        birthDate: string,
        nDni: number,
        appointments: SingleAppointment[]
    }
}

//? type for payload
interface UserPayload {   
        id: number,
        name: string,
        email: string,
        birthDate: string,
        nDni: number,
        appointments: SingleAppointment[]
    
  }





//w initial state
const initialState:InitialState = {
        login:false,
        user:{
            id:0,
            name:'',
            email: '',
            birthDate: '',
            nDni: 0,
            appointments:[]
        }
    }


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginUserSuccess(state, action: PayloadAction<UserPayload>) {
            state.login = true;
            state.user= action.payload;
          },
    }
})

export const { loginUserSuccess } = userSlice.actions;
export default userSlice.reducer;