import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    routes: [
        {
            "move_from": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21"
            },
            "move_to": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габаль 10"
            },
            "count": 9
        },
        {
            "move_from": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габаль 10"
            },
            "move_to": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21"
            },
            "count": 9
        }
    ],
    routes2: [
        {
            "move_from": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21"
            },
            "move_to": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габаль 10"
            },
            "count": 9
        },
        {
            "move_from": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габаль 10"
            },
            "move_to": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21"
            },
            "count": 8
        }
    ]
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