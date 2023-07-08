import { configureStore } from "@reduxjs/toolkit"; 
import postReducer from "../features/post/PostSlice";
import getDataReducer from "../features/getUser/getUserData";
import postPassword from "../features/postPassword/postPassword";
import signUpReucer from "../features/postSignUp/postSignUp";
 
export const store = configureStore({
    reducer: {
        post: postReducer,
        getUser: getDataReducer,
        reset: postPassword,
        signup: signUpReucer,
    }
})