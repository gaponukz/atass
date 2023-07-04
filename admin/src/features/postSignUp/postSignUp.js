import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const POSTS_URL = "http://localhost:8080";

const initialState = {

}

export const fetchSignUp = createAsyncThunk("signup/fetchSignUp", async ({ url, gmail }) => {
  
})

export const signUpSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchSignUp.pending, (state) => {
            console.log("?");
          })
          .addCase(fetchSignUp.fulfilled, (state, action) => {
            console.log("+");
          })
          .addCase(fetchSignUp.rejected, (state, action) => {
            console.log("-");
          });
      },
})

export const { } = signUpSlice.actions;

export default signUpSlice.reducer;