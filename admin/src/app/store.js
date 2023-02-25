import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"
import createRouteReducer from "../features/routeCreator/routeCreateSlice"
import usersReducer from "../features/userFeatures/usersSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        createRoute: createRouteReducer,
        usersFeatures: usersReducer,
    }
})