import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';


//w creates store (global state)
export const store = configureStore({
    reducer:{
        user: userReducer
    }
});

//w creates types for getState > useSelector()
export type RootState = ReturnType<typeof store.getState>;
//w for async operations
export type AppDispatch = typeof store.dispatch;