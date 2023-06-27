import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const POSTS_URL = "http://localhost:8080";

const initialState = {
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: false,
    fetchDataFlag: false
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({url, gmail, password, rememberHim}) => {
    const response = await axios.post(`${POSTS_URL}/${url}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
        gmail: gmail, // "testuser@knu.ua"
        password: password, // "somepassword"
        rememberHim: rememberHim
    })
    console.log(response);
    

    return response.data

})

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPosts.pending, (state) => {
            console.log("?");
            state.status = "loading"
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            console.log("+");
            state.status = "succedded";
            state.fetchDataFlag = true;
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            console.log("-");
            state.status = "error";
          });
      },
})

export const { changeStatus } = postSlice.actions;

export default postSlice.reducer;