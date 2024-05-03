import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
            console.log('ACTION',action.payload)
            state.login = true;
            state.user= action.payload;
          },
        },
        extraReducers: (builder) => {
            builder
            .addCase(cancelDeployment.pending, ()=>{
                    console.log('cancelling deployment... please wait...')
                })
             .addCase(cancelDeployment.fulfilled,
                    (state, action) => {
                        //w finds the specific appointment to update
                        const index = state.user.appointments.findIndex(appointment => appointment.id === action.payload.id);

                        //w checks the deployment exists and replaces it
                        if(index !== -1) {
                            state.user.appointments[index] = action.payload
                        }
                        
                    }
                )
                .addCase(cancelDeployment.rejected, ()=>{
                    console.log('Cancelation Failed')
                })
        }
})

export const cancelDeployment = createAsyncThunk(
    'user/cancelDeployment',
    async (id:number) => {
        try {
            const uri = 'http://localhost:3001/appointments/cancel/';
    
            const res = await axios.put(uri + id);
            //w this data is taken by the action.payload
            return res.data

        } catch (error) {
           if(error instanceof Error) {
               console.log(error.message)
           }
        }
    }
)

export const  { loginUserSuccess } = userSlice.actions;
export default userSlice.reducer;