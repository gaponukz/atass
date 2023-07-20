import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from 'react-toastify';

const POSTS_URL = "http://localhost:8080";

const initialState = {
    status: "idle-test", // "idle" | "loading" | "succeeded" | "failed"
    flagSuccess: false,
    finalFlagSuccess: false,
    
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

export const fetchConfirmPassword = createAsyncThunk("reset/fetchConfirmPassword", async ({url, gmail, newPassword, key}) => {
  const response = await axios.post(`${POSTS_URL}/${url}`, {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },    
    gmail: gmail, // "testuser@knu.ua"
    password: newPassword,
    key: key
  })
  console.log(response);
  return response.data
})

export const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {
        changeFlagSuccess: (state, action) => {
          state.flagSuccess = action.payload
        },
        changeFinalFlagSuccess: (state, action) => {
          state.finalFlagSuccess = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPassword.pending, (state) => {
            console.log("?");
          })
          .addCase(fetchPassword.fulfilled, (state, action) => {
            console.log("+");
            state.flagSuccess = true;
            toast.info("Введіть код", { autoClose: 1500 })
          })
          .addCase(fetchPassword.rejected, (state, action) => {
            console.log("-");
            if (action.error.message === "Request failed with status code 404") {
              toast.error("Такого користувача не існує", { autoClose: 1500 })
            }
          })
          .addCase(fetchConfirmPassword.pending, (state) => {
            console.log("??");
          })
          .addCase(fetchConfirmPassword.fulfilled, (state, action) => {
            console.log("++");
            state.finalFlagSuccess = true
          })
          .addCase(fetchConfirmPassword.rejected, (state, action) => {
            if (action.error.message === "Request failed with status code 400") {
              toast.error("Неправильний код", { autoClose: 1500 })
            }
            console.log("--");
          });
      },
})

export const { changeFlagSuccess, changeFinalFlagSuccess } = resetSlice.actions;

export default resetSlice.reducer;