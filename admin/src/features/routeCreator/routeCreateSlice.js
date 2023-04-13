import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    routes: [
        {
            "move_from": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21",
                "id": 123213
            },
            "move_to": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габаль 10",
                "id": 345345345
            },
            "count": 9
        },
        {
            "move_from": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габаль 10",
                "id": 3453453455657567
            },
            "move_to": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21",
                "id": 34534534578978978
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
    ],
    currentRoute: {
        "move_from": "",
        "move_to": "",
        "passengers_number": "",
        "sub_spots": [],
        "is_active": true,
        "prices": {},
        "passengers": [],
        "description": {},
        "rules": {},
        "transportation_rules": {},
        id: String(nanoid())
    },
    familly_route: {
        "route_prototype": {
            "move_to": {
                "place": {
                    "country": "",
                    "city": "",
                    "street": "",
                    "map_url": ""
                },
                "id": ""
            },
            "move_from": {
                "place": {
                    "country": "",
                    "city": "",
                    "street": "",
                    "map_url": ""
                },
                "id": ""
            },
            "passengers_number": 0,
            "sub_spots": [],
            "prices": {},
            "description": {
                "en": "",
                "pl": "",
                "ua": ""
            },
            "rules": {
                "en": "",
                "pl": "",
                "ua": ""
            },
            "transportation_rules": {
                "en": "",
                "pl": "",
                "ua": ""
            },
            "id": String(nanoid())
        },
        "datatimes": []
    },
    dates: [],
    addRoute: [],
    steps: {
        firstStep: true,
        secondStep: true,
        thirdStep: true,
        fourthStep: true,
    },
    subSpots: [{
        "place": {
            "country": "Україна",
            "city": "Хмельницький",
            "street": "Вулиця 1",
            "map_url": "map1"
        },
        "from_start": "2 8 30",
        "id": String(nanoid())
    }],

}

export const routeCreateSlice = createSlice({
    name: "routeCreateSlice",
    initialState,
    reducers: {
        createRoute1: {
            reducer(state, action) {
                console.log("here2 -> ", action.payload);
                //state.currentRoute.move_from = action.payload.from;
                //state.currentRoute.move_to = action.payload.to;
                //state.currentRoute.passengers_number = action.payload.numberPlaces;
                state.familly_route["route_prototype"]["move_from"] = {
                    "place": {
                        "country": action.payload.fromCountry,
                        "city": action.payload.fromCity,
                        "street": action.payload.fromStreet,
                        "map_url": action.payload.map1,
                    },
                    "id": nanoid()
                }

                state.familly_route["route_prototype"]["move_to"] = {
                    "place": {
                        "country": action.payload.toCountry,
                        "city": action.payload.toCity,
                        "street": action.payload.toStreet,
                        "map_url": action.payload.map2,
                    },
                    "id": nanoid()
                }

                state.familly_route["route_prototype"]["passengers_number"] = action.payload.numberPlaces


                console.log("test" ,state.familly_route);

            },
            prepare(fromCountry, fromCity, fromStreet,
                toCountry, toCity, toStreet, numberPlaces, map1, map2, fromTime,) {
                return {
                    payload: {
                        fromCountry, fromCity, fromStreet,
                toCountry, toCity, toStreet, numberPlaces, map1, map2, fromTime
                    }

                }
            }
        },
        change2: (state) => {
            state.steps.secondStep = true;
        },
        change3: (state) => {
            state.steps.thirdStep = true;
        },
        change4: (state) => {
            state.steps.fourthStep = true;
        },
        addSubSpot: {
            reducer(state, action) {
                state.subSpots.push(action.payload)
            },  
            prepare(country, city, street, map, time) {

                if (time[0] === " ") {
                    time = time.trimStart();
                }
                return {
                    payload: {
                        "place": {
                            "country": country,
                            "city": city,
                            "street": street,
                            "map_url": map
                        },
                        "from_start": time,
                        "id": String(nanoid())
                    }
                }
            }     
        },
        createRoute2: {
            reducer(state, action) {
                console.log("here2 !", action.payload);
                state.familly_route["route_prototype"]["description"] = {
                    "en": action.payload.cmt12,
                    "pl": action.payload.cmt13,
                    "ua": action.payload.cmt11
                }
                state.familly_route["route_prototype"]["rules"] = {
                    "en": action.payload.cmt22,
                    "pl": action.payload.cmt23,
                    "ua": action.payload.cmt21
                }
                state.familly_route["route_prototype"]["transportation_rules"] = {
                    "en": action.payload.cmt32,
                    "pl": action.payload.cmt33,
                    "ua": action.payload.cmt31
                }
               
            },
            prepare(cmt11, cmt12, cmt13, cmt21, cmt22, cmt23, cmt31, cmt32, cmt33) {
                return {
                    payload: {cmt11, cmt12, cmt13, cmt21, cmt22, cmt23, cmt31, cmt32, cmt33}
                }
            }
        },
        addRoute: {
            reducer(state, action) {
                //console.log("here2 -> ", action.payload[0]);
                state.addRoute.push(action.payload[0])
                
            },
            prepare(date1, date2) {
                return {
                    payload: [
                        date1,
                        date2
                    ]

                }
            }
        }
    }
})

export const { createRoute1, createRoute2, addRoute, change2, change3, change4, addSubSpot } = routeCreateSlice.actions;

export default routeCreateSlice.reducer;