import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth/authSlice";
import doctorReducer from "../redux/slices/doctors/doctorSlice";

export const store = configureStore({
  reducer: {  
    auth:authReducer,
    doctors:doctorReducer,
  },
});