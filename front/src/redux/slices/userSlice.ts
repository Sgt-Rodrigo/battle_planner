import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { NewDeploymentInput } from "../../typings/types/NewDeployment";

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
                .addCase(scheduleDeployment.fulfilled,
                    (state, action) => {
                        // Add the new appointment to the user's appointments array
                        state.user.appointments.push(action.payload);
                    }
                )
        }
})

//w cancel reducer
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


//w new Deployment reducer
export const scheduleDeployment = createAsyncThunk(
    'user/scheduleDeployment',
    async (userInput:NewDeploymentInput, { getState }) => {
        try {
            const uri = 'http://localhost:3001/appointments/schedule';
            const { user } = (getState() as { user: InitialState }).user;
            
            // Complete the user input with userId and status
            const data = {
                ...userInput,
                userId: user.id              
            };

            console.log('DATA SENT FOR NEW DEPLOY',data);
    
            const res = await axios.post(uri, data);
            console.log('NEW DEPLOYMENT', res)
            //w this data is taken by the action.payload
            return res.data;

        } catch (error) {
           if(error instanceof Error) {
               console.log(error.message)
           }
        }
    }
)

export const  { loginUserSuccess } = userSlice.actions;
export default userSlice.reducer;