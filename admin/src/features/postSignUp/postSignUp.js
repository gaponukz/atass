import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from 'react-toastify';


const POSTS_URL = "http://localhost:8080";
//axios.defaults.withCredentials = true


const initialState = {
  status: "idle-t", // "idle" | "loading" | "succeeded" | "failed"
  flagSuccess: false,
  finalFlagSuccess: false,
}

export const fetchSignUp = createAsyncThunk("signup/fetchSignUp", async ({ url, gmail }) => {
  const response = await axios.post(`${POSTS_URL}/${url}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    gmail: gmail // "test@knu.ua"
  })
  console.log(response);
  return response.data
})

export const fetchSignUpConfirm = createAsyncThunk("signup/fetchSignUpConfirm", async ({ url, gmail, password, fullName, phone, allowsAdvertisement, key }) => {
  const response = await axios.post(`${POSTS_URL}/${url}`, {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },    
    gmail: gmail,
    password: password,
    fullName: fullName,
    phone: phone,
    allowsAdvertisement: allowsAdvertisement,
    key: key
  })
  console.log(response);
  return response.data
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
        state.flagSuccess = true;
        toast.info("Введіть код", { autoClose: 1500 })
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        console.log("-");
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 409") {
          toast.error("Вже є такий користувач", {autoClose: 2500})
        }
        
      })
      .addCase(fetchSignUpConfirm.pending, (state) => {
        console.log("?");
      })
      .addCase(fetchSignUpConfirm.fulfilled, (state, action) => {
        console.log("+");
        state.finalFlagSuccess = true;
      })
      .addCase(fetchSignUpConfirm.rejected, (state, action) => {
        toast.error("Код невірний", { autoClose: 2000 })
        console.log("-");
      })
  },
})

export const { } = signUpSlice.actions;

export default signUpSlice.reducer;