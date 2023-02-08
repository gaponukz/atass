import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    routes: [
        { id: nanoid(), from: "Kyiv", to: "Warszawa", numberPlaces: 24, timeStart: "1/10/2019", timeEnd: "2/12/2019" },
        { id: nanoid(), from: "Lviv", to: "Rivne", numberPlaces: 35, timeStart: "23/11/2020", timeEnd: "17/12/2020" },
        { id: nanoid(), from: "Ternopil", to: "Krakov", numberPlaces: 55, timeStart: "15/8/2023", timeEnd: "23/8/2023" },
    ],

}

export const routeCreateSlice = createSlice({
    name: "routeCreateSlice",
    initialState,
    reducers: {
        createRoute: {
            reducer(state, action) {
                state.routes.push(action.payload);
            },
            prepare(from, to, numberPlaces, timeStart, timeEnd) {
                return {
                    payload: {
                        id: nanoid(),
                        from,
                        to,
                        numberPlaces,
                        timeStart,
                        timeEnd
                    }

                }
            }
        }
    }
})

export const { createRoute } = routeCreateSlice.actions;

export default routeCreateSlice.reducer;