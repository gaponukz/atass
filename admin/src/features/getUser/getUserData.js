import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
axios.defaults.withCredentials = true

export const getUserId = createAsyncThunk("data/getUserId", async () => {
    const response = await axios.get(`${BASE_URL}/getUserInfo`)
    console.log(response.data);

    return response.data
})

const dataSlice = createSlice({
    name: 'data',
    initialState: {
      data: {},
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserId.pending, (state) => {
                console.log("?");
            })
            .addCase(getUserId.fulfilled, (state, action) => {
                console.log("+", action.payload);
                state.data = { ...action.payload };
                state.error = "";
            })
            .addCase(getUserId.rejected, (state, action) => {
                console.log("-", action.error.message);
                state.error = action.error.message;
            })
    }
})

export const {  } = dataSlice.actions;
export default dataSlice.reducer;