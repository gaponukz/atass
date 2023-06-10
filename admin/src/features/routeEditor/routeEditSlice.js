import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentEditRoute: {},
}

export const routeEditorSlice = createSlice({
    name: "routeEditorSlice",
    initialState,
    reducers: {
        editRoute1: {
            reducer(state, action) {
                console.log("works well!");
            },
            prepare() {
                return {
                    payload: {
                        
                    }

                }
            }
        },
        changeEditRoute: {
            reducer(state, action) {
                console.log("here", action.payload);
                state.currentEditRoute = action.payload
            },
            prepare(route) {
                return {
                    payload: route
                }
            }
        },
        onChangeValue: {
            reducer(state, action) {
                switch (action.payload[1]) {
                    case "from_country":
                        state.currentEditRoute.move_from.place.country = action.payload[0];
                        break

                    case "from_city":
                        state.currentEditRoute.move_from.place.city = action.payload[0];
                        break
                    
                    case "from_street":
                        state.currentEditRoute.move_from.place.street = action.payload[0];
                        break
                    
                    case "from_map_url":
                        state.currentEditRoute.move_from.place.map_url = action.payload[0];
                        break

                    case "to_country":
                        state.currentEditRoute.move_to.place.country = action.payload[0];
                        break

                    case "to_city":
                        state.currentEditRoute.move_to.place.city = action.payload[0];
                        break
                    
                    case "to_street":
                        state.currentEditRoute.move_to.place.street = action.payload[0];
                        break
                    
                    case "to_map_url":
                        state.currentEditRoute.move_to.place.map_url = action.payload[0];
                        break
                    
                    case "descip_ua":
                        state.currentEditRoute.description.ua = action.payload[0];
                        break
                    
                    case "descip_en":
                        state.currentEditRoute.description.en = action.payload[0];
                        break

                    case "descip_pl":
                        state.currentEditRoute.description.pl = action.payload[0];
                        break

                    case "rules_ua":
                        state.currentEditRoute.rules.ua = action.payload[0];
                        break
                    
                    case "rules_en":
                        state.currentEditRoute.rules.en = action.payload[0];
                        break

                    case "rules_pl":
                        state.currentEditRoute.rules.pl = action.payload[0];
                        break

                    case "trans_ua":
                        state.currentEditRoute.transportation_rules.ua = action.payload[0];
                        break
                    
                    case "trans_en":
                        state.currentEditRoute.transportation_rules.en = action.payload[0];
                        break

                    case "trans_pl":
                        state.currentEditRoute.transportation_rules.pl = action.payload[0];
                        
                        break

                    case "sub_spot":
                        //console.log("tyt", action.payload[0], action.payload[1])
                        //console.log(action.payload[0].at(-1));
                        //console.log("here");

                        state.currentEditRoute.sub_spots[action.payload[0].at(-1)].place.country = action.payload[0].at(0);
                        state.currentEditRoute.sub_spots[action.payload[0].at(-1)].place.city = action.payload[0].at(1);
                        state.currentEditRoute.sub_spots[action.payload[0].at(-1)].place.street = action.payload[0].at(2);
                        state.currentEditRoute.sub_spots[action.payload[0].at(-1)].place.map_url = action.payload[0].at(3);
                        state.currentEditRoute.sub_spots[action.payload[0].at(-1)].is_active = action.payload[0].at(4);
                        break

                    case "change_price":
                        console.log("here", action.payload[0]);
                        let id1 = action.payload[0].at(0);
                        let id2 = action.payload[0].at(1);
                        let price = action.payload[0].at(2);
                        state.currentEditRoute.prices[id1][id2] = Number(price);
                        break
                }
                
            },
            prepare(new_value, option) {
                return {
                    payload: [
                        new_value,
                        option
                    ]
                }
            }
        }
    }
})

export const { editRoute1, changeEditRoute, onChangeValue } = routeEditorSlice.actions;

export default routeEditorSlice.reducer;