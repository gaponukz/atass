import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
axios.defaults.withCredentials = true

export const getUserId = createAsyncThunk("data/getUserId", async () => {
    const response = await axios.get(`${BASE_URL}/getUserInfo`)
    console.log(response.data);

    return response.data
})

export const logUserOut = createAsyncThunk("data/logUserOut", async () => {
    const response = await axios.get(`${BASE_URL}/logout`)
    console.log(response.data);

    return response.data
})

const dataSlice = createSlice({
    name: 'data',
    initialState: {
      data: {},
      loading: false,
      error: null,
      logout: false
    },
    reducers: {
        changeLogout: (state, action) => {
            state.logout = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserId.pending, (state) => {
                console.log("?");
            })
            .addCase(getUserId.fulfilled, (state, action) => {
                console.log("+", action.payload);
                state.data = { ...action.payload };
                state.error = "";
                state.logout = false;
            })
            .addCase(getUserId.rejected, (state, action) => {
                console.log("-", action.error.message);
                state.error = action.error.message;
            })
            .addCase(logUserOut.pending, (state) => {
                console.log("?");
            })
            .addCase(logUserOut.fulfilled, (state, action) => {
                console.log("+", action.payload);
                state.data = {};
                state.logout = true;
            })
            .addCase(logUserOut.rejected, (state, action) => {
                console.log("-", action.error.message);
            })
    }
})

export const { changeLogout } = dataSlice.actions;
export default dataSlice.reducer;