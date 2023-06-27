import { configureStore } from "@reduxjs/toolkit"; 
import postReducer from "../features/post/PostSlice";
import getUserInformation from "../features/getUser/getUserInformation";
import postPassword from "../features/postPassword/postPassword";
 
export const store = configureStore({
    reducer: {
        post: postReducer,
        get: getUserInformation,
        reset: postPassword,
    }
})