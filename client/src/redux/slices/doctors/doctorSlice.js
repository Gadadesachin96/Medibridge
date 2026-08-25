import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../../services/api";


// GET all doctors
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",

  async (_, thunkAPI) => {
    try {

      const response = await api.get("/doctors");

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch doctors"
      );

    }
  }
);


const initialState = {
  doctors: [],
  loading: false,
  error: null,
};


const doctorSlice = createSlice({
  name: "doctors",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // Request started
      .addCase(fetchDoctors.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      // Request successful
      .addCase(fetchDoctors.fulfilled, (state, action) => {

        state.loading = false;
        state.doctors = action.payload;

      })

      // Request failed
      .addCase(fetchDoctors.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload;

      });

  },
});


export default doctorSlice.reducer;