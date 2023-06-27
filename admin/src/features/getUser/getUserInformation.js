import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
axios.defaults.withCredentials = true

const initialState = {
    userInfo: {}
}

export const getInfo = createAsyncThunk('gets/getsSlice', async () => {
    const response = await axios.get(`${BASE_URL}/getUserInfo`, {
        withCredentials: true,
    })
    
    console.log(response);
    return response.data
})

export const getsSlice = createSlice({
    name: "gets",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
          .addCase(getInfo.pending, (state) => {
            console.log("?");
          })
          .addCase(getInfo.fulfilled, (state, action) => {
            console.log("+");
            console.log(action.payload);
            state.userInfo = {...action.payload}
          })
          .addCase(getInfo.rejected, (state, action) => {
            console.log("-");
          });
      },
})

export const {  } = getsSlice.actions;

export default getsSlice.reducer;