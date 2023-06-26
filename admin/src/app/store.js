import { configureStore } from "@reduxjs/toolkit"; 
import postReducer from "../features/post/PostSlice";
import getUserInformation from "../features/getUser/getUserInformation";
 
export const store = configureStore({
    reducer: {
        post: postReducer,
        get: getUserInformation,
    }
})