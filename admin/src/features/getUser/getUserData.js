import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from 'react-toastify';


const BASE_URL = "http://localhost:8080";
axios.defaults.withCredentials = true

export const getUserId = createAsyncThunk("data/getUserId", async () => {
    const response = await axios.get(`${BASE_URL}/getUserInfo`)
    // console.log(response.data);

    return response.data
})

export const logUserOut = createAsyncThunk("data/logUserOut", async () => {
    const response = await axios.get(`${BASE_URL}/logout`)
    console.log(response.data);

    return response.data
})

export const editUserData = createAsyncThunk("data/editUserData", async ({fullName, phone, allowsAdvertisement}) => {
    console.log("here", fullName, phone, allowsAdvertisement);
    const response = axios.post(`${BASE_URL}/updateUserInfo`, {
    fullName: fullName,
    phone: phone, // "somepass"
    allowsAdvertisement: allowsAdvertisement
    })
    console.log(response.data);
    return response.data

})

export const refreshUser = createAsyncThunk("data/refreshUser", async () => {
    const response = await axios.get(`${BASE_URL}/refresh`)
    console.log(response.data);

    return response.data
})

const dataSlice = createSlice({
    name: 'data',
    initialState: {
      data: {},
      loading: false,
      error: null,
      logout: false,
      authorized: false,
      flag: false,
    },
    reducers: {
        changeLogout: (state, action) => {
            state.logout = false;
        },
        changeAuthorized: (state, action) => {
            state.authorized = action.payload;
        },
        changeStatusError: (state, action) => {
            state.error = action.payload;
        },
        changeCheck: (state, action) => {
            state.check = action.payload
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
            .addCase(editUserData.pending, (state) => {
                console.log("?");
            })
            .addCase(editUserData.fulfilled, (state, action) => {
                console.log("+", action.payload);
                toast.success("Данні оновлено", {autoClose: 1500})
            })
            .addCase(editUserData.rejected, (state, action) => {
                console.log("-", action.error.message);
            })
            .addCase(refreshUser.pending, (state) => {
                console.log("?");
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                console.log("+", action.payload);
                toast.success("Данні оновлено", {autoClose: 1500})
            })
            .addCase(refreshUser.rejected, (state, action) => {
                console.log("-", action.error.message);
                if (action.error.message === "Request failed with status code 401") {
                    state.flag = true;
                }
            })
    }
})

export const { changeLogout, changeAuthorized, changeStatusError } = dataSlice.actions;
export default dataSlice.reducer;