import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "http://localhost:8080";

const initialState = {
    status: "idle-test", // "idle" | "loading" | "succeeded" | "failed"
    flagSuccess: false
    
}

export const fetchPassword = createAsyncThunk("reset/fetchPassword", async ({ url, gmail }) => {
    const response = await axios.post(`${POSTS_URL}/${url}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },    
        gmail: gmail // "testuser@knu.ua"
    })
    console.log(response);
    return response.data
})

export const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPassword.pending, (state) => {
            console.log("?");
          })
          .addCase(fetchPassword.fulfilled, (state, action) => {
            console.log("+");
            state.flagSuccess = true;
          })
          .addCase(fetchPassword.rejected, (state, action) => {
            console.log("-");
          });
      },
})

export const { } = resetSlice.actions;

export default resetSlice.reducer;