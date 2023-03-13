import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Checkbox, Modal, Button } from '@mui/material';
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useState } from 'react';
import ShowInfoDetail from './ShowInfoDetail';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// const route = [
//     {
//         "move_from": {
//             "place": {
//                 "country": "Ukraine",
//                 "city": "Kiyv",
//                 "street": "Shevchenko 21",
//                 "map_url": null,
//                 "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
//             },
//             "date": "2023-01-21 14:00:00",
//             "is_active": true,
//             "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
//         },
//         "move_to": {
//             "place": {
//                 "country": "Poland",
//                 "city": "Warsaw",
//                 "street": "Gabal 10",
//                 "map_url": null,
//                 "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
//             },
//             "date": "2023-01-23 10:30:00",
//             "is_active": true,
//             "id": "07937ada-9f05-4d17-a4c4-b16288354512"
//         },
//         "passengers_number": 3,
//         "sub_spots": [
//             {
//                 "place": {
//                     "country": "Ukraine",
//                     "city": "Lviv",
//                     "street": "Shevchenko 21",
//                     "map_url": null,
//                     "id": "c84c0840-4b62-4d45-bb67-085e08d68a0a"
//                 },
//                 "date": "2023-01-22 10:00:00",
//                 "is_active": true,
//                 "id": "8f67a4b1-97a2-4815-9d56-7904640d4f5d"
//             },
//             {
//                 "place": {
//                     "country": "Ukraine",
//                     "city": "Starychi",
//                     "street": "Sichovi stril'si 32",
//                     "map_url": null,
//                     "id": "62c7f133-aa7e-46ca-bdda-87b2ac00d0ed"
//                 },
//                 "date": "2023-01-22 13:00:00",
//                 "is_active": true,
//                 "id": "a1f45eac-b69c-45ff-943e-95677bfc259d"
//             }
//         ],
//         "is_active": true,
//         "prices": {
//             "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f": {
//                 "07937ada-9f05-4d17-a4c4-b16288354512": 1500,
//                 "8f67a4b1-97a2-4815-9d56-7904640d4f5d": 800
//             },
//             "8f67a4b1-97a2-4815-9d56-7904640d4f5d": {
//                 "07937ada-9f05-4d17-a4c4-b16288354512": 400
//             },
//             "a1f45eac-b69c-45ff-943e-95677bfc259d": {}
//         },
//         "passengers": [
//             {
//                 "first_name": "Adam",
//                 "last_name": "Nut",
//                 "phone_number": "+3243254",
//                 "email_address": null,
//                 "moving_from": {
//                     "place": {
//                         "country": "Ukraine",
//                         "city": "Kiyv",
//                         "street": "Shevchenko 21",
//                         "map_url": null,
//                         "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
//                     },
//                     "date": "2023-01-21 14:00:00",
//                     "is_active": true,
//                     "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
//                 },
//                 "moving_towards": {
//                     "place": {
//                         "country": "Poland",
//                         "city": "Warsaw",
//                         "street": "Gabal 10",
//                         "map_url": null,
//                         "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
//                     },
//                     "date": "2023-01-23 10:30:00",
//                     "is_active": true,
//                     "id": "07937ada-9f05-4d17-a4c4-b16288354512"
//                 },
//                 "id": "423a053e-d5b1-42a5-9d30-6dacaeb18831"
//             },
//             {
//                 "first_name": "Max",
//                 "last_name": "Caw",
//                 "phone_number": "+865329652",
//                 "email_address": null,
//                 "moving_from": {
//                     "place": {
//                         "country": "Ukraine",
//                         "city": "Kiyv",
//                         "street": "Shevchenko 21",
//                         "map_url": null,
//                         "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
//                     },
//                     "date": "2023-01-21 14:00:00",
//                     "is_active": true,
//                     "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
//                 },
//                 "moving_towards": {
//                     "place": {
//                         "country": "Poland",
//                         "city": "Warsaw",
//                         "street": "Gabal 10",
//                         "map_url": null,
//                         "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
//                     },
//                     "date": "2023-01-23 10:30:00",
//                     "is_active": true,
//                     "id": "07937ada-9f05-4d17-a4c4-b16288354512"
//                 },
//                 "id": "670ef186-4554-4d04-bc52-cc08a929d16b"
//             },
//             {
//                 "first_name": "John",
//                 "last_name": "Lwo",
//                 "phone_number": "+35643622",
//                 "email_address": null,
//                 "moving_from": {
//                     "place": {
//                         "country": "Ukraine",
//                         "city": "Kiyv",
//                         "street": "Shevchenko 21",
//                         "map_url": null,
//                         "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
//                     },
//                     "date": "2023-01-21 14:00:00",
//                     "is_active": true,
//                     "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
//                 },
//                 "moving_towards": {
//                     "place": {
//                         "country": "Poland",
//                         "city": "Warsaw",
//                         "street": "Gabal 10",
//                         "map_url": null,
//                         "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
//                     },
//                     "date": "2023-01-23 10:30:00",
//                     "is_active": true,
//                     "id": "07937ada-9f05-4d17-a4c4-b16288354512"
//                 },
//                 "id": "15956541-d676-45d3-9114-3fc87ceec9a4"
//             }
//         ],
//         "description": {
//             "en": {s: "test ENG"},
//             "pl": {},
//             "ua": {}
//         },
//         "rules": {
//             "en": {},
//             "pl": {},
//             "ua": {}
//         },
//         "transportation_rules": {
//             "en": {},
//             "pl": {},
//             "ua": {}
//         },
//         "id": "dd5cf8ad-afb1-4ce4-bae1-20dd90b4cc4f"
//     }
// ]
const route = [
    {
        "move_from": {
            "place": {
                "country": "Україна",
                "city": "Київ",
                "street": "Шевченко 21",
                "map_url": null,
                "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
            },
            "date": "2023-01-21 14:00:00",
            "is_active": true,
            "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
        },
        "move_to": {
            "place": {
                "country": "Польща",
                "city": "Варшава",
                "street": "Габал 10",
                "map_url": null,
                "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
            },
            "date": "2023-01-23 10:30:00",
            "is_active": true,
            "id": "07937ada-9f05-4d17-a4c4-b16288354512"
        },
        "passengers_number": 3,
        "sub_spots": [
            {
                "place": {
                    "country": "Україна",
                    "city": "Львів",
                    "street": "Шевченко 21",
                    "map_url": null,
                    "id": "c84c0840-4b62-4d45-bb67-085e08d68a0a"
                },
                "date": "2023-01-22 10:00:00",
                "is_active": true,
                "id": "8f67a4b1-97a2-4815-9d56-7904640d4f5d"
            },
            {
                "place": {
                    "country": "Україна",
                    "city": "Старичі",
                    "street": "Січові стрільці 32",
                    "map_url": null,
                    "id": "62c7f133-aa7e-46ca-bdda-87b2ac00d0ed"
                },
                "date": "2023-01-22 13:00:00",
                "is_active": true,
                "id": "a1f45eac-b69c-45ff-943e-95677bfc259d"
            }
        ],
        "is_active": true,
        "prices": {
            "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f": {
                "07937ada-9f05-4d17-a4c4-b16288354512": 1500,
                "8f67a4b1-97a2-4815-9d56-7904640d4f5d": 800
            },
            "8f67a4b1-97a2-4815-9d56-7904640d4f5d": {
                "07937ada-9f05-4d17-a4c4-b16288354512": 400
            },
            "a1f45eac-b69c-45ff-943e-95677bfc259d": {}
        },
        "passengers": [
            {
                "first_name": "Адам",
                "last_name": "Нат",
                "phone_number": "+3243254",
                "email_address": null,
                "moving_from": {
                    "place": {
                        "country": "Україна",
                        "city": "Київ",
                        "street": "Шевченко 21",
                        "map_url": null,
                        "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
                    },
                    "date": "2023-01-21 14:00:00",
                    "is_active": true,
                    "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
                },
                "moving_towards": {
                    "place": {
                        "country": "Польща",
                        "city": "Варшава",
                        "street": "Габал 10",
                        "map_url": null,
                        "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
                    },
                    "date": "2023-01-23 10:30:00",
                    "is_active": true,
                    "id": "07937ada-9f05-4d17-a4c4-b16288354512"
                },
                "id": "423a053e-d5b1-42a5-9d30-6dacaeb18831"
            },
            {
                "first_name": "Макс",
                "last_name": "Кав",
                "phone_number": "+865329652",
                "email_address": null,
                "moving_from": {
                    "place": {
                        "country": "Україна",
                        "city": "Київ",
                        "street": "Шевченко 21",
                        "map_url": null,
                        "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
                    },
                    "date": "2023-01-21 14:00:00",
                    "is_active": true,
                    "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
                },
                "moving_towards": {
                    "place": {
                        "country": "Польща",
                        "city": "Варшава",
                        "street": "Габал 10",
                        "map_url": null,
                        "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
                    },
                    "date": "2023-01-23 10:30:00",
                    "is_active": true,
                    "id": "07937ada-9f05-4d17-a4c4-b16288354512"
                },
                "id": "670ef186-4554-4d04-bc52-cc08a929d16b"
            },
            {
                "first_name": "Джон",
                "last_name": "Лов",
                "phone_number": "+35643622",
                "email_address": null,
                "moving_from": {
                    "place": {
                        "country": "Україна",
                        "city": "Київ",
                        "street": "Шевченко 21",
                        "map_url": null,
                        "id": "fa668d26-1118-4ed5-a02f-0a0b53ce9a79"
                    },
                    "date": "2023-01-21 14:00:00",
                    "is_active": true,
                    "id": "c0a1a444-4d8d-47d4-aa45-eb54fa7f154f"
                },
                "moving_towards": {
                    "place": {
                        "country": "Польща",
                        "city": "Варшава",
                        "street": "Габал 10",
                        "map_url": null,
                        "id": "b01d2b24-ca0a-438b-bd11-fe82f9d05c2a"
                    },
                    "date": "2023-01-23 10:30:00",
                    "is_active": true,
                    "id": "07937ada-9f05-4d17-a4c4-b16288354512"
                },
                "id": "15956541-d676-45d3-9114-3fc87ceec9a4"
            }
        ],
        "description": {
            "en": {s: "повідомлення"},
            "pl": {},
            "ua": {}
        },
        "rules": {
            "en": {},
            "pl": {},
            "ua": {}
        },
        "transportation_rules": {
            "en": {},
            "pl": {},
            "ua": {}
        },
        "id": "dd5cf8ad-afb1-4ce4-bae1-20dd90b4cc4f"
    }
]

const RouteUniqueDetail = () => {
    const routes = useSelector(state => state.createRoute.routes2)



    const [openShow, setOpenShow] = useState(false);
    const handleOpenShow = () => setOpenShow(true);
    const handleCloseShow = () => setOpenShow(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    return (
        <div className='p-8'>
            <div className='flex flex-col items-center justify-center'>
                <div className='border-2 border-gray-300 rounded-lg w-2/4 mt-[50px]'>
                    <div className='p-2 m-4 border-2 border-red-300 mr-[300px] w-[305px] rounded-md'>
                        <NavLink className="no-underline text-red-500 hover:text-red-500" to="/">Повернутися до головного маршруту</NavLink>
                    </div>

                    <Modal
                        open={openShow}
                        onClose={handleCloseShow}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className='flex flex-row justify-center items-center'
                    >
                        {/* <div className='w-[300px] h-[200px] bg-white text-black '>
                        Show
                        </div> */}
                        <ShowInfoDetail info={route[0]}/>
                    </Modal>

                    <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className='flex flex-row justify-center items-center'
                    >
                        <div className='w-[300px] h-[200px] bg-white text-black '>
                        Delete
                        </div>
                    </Modal>

                    {route.map((route, index) => (
                        <>
                            <div className='flex flex-row border-b-2 border-gray-300' key={route.move_from.id}>
                                <Checkbox {...label} defaultChecked />

                                <div key={index}>

                                    <div className=''>
                                        <div className='relative px-1'>
                                            <div className='flex flex-row gap-1 '>
                                                <div className='mt-3 flex flex-row gap-1'>
                                                    <p className=''>{route.move_from.place.city}</p>-<p className=' '>{route.move_to.place.city},</p>
                                                    <p>{route.move_from.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='ml-auto mr-4 gap-1 flex flex-row mt-2'>
                                    {/* <NavLink className='no-underline text-black ' to={`detail/${route.move_from.place.city.toLowerCase()}`}><CiEdit size={23} /></NavLink> */}
                                    {/* <NavLink className='no-underline text-black ' to={`detail/${route.move_from.place.city.toLowerCase()}`}></NavLink>
                                    <NavLink className='no-underline text-black ' to={`detail/${route.move_from.place.city.toLowerCase()}`}></NavLink> */}
                                    <div className=''>
                                        <Button onClick={""} classname=""><CiEdit className='no-underline text-black' size={23}/></Button>
                                    </div>
                                    <div className=''>
                                        <Button onClick={handleOpenDelete} classname=""><AiFillDelete className='no-underline text-black' size={23} /></Button>
                                    </div>
                                    <div className=''>
                                        <Button onClick={handleOpenShow} classname=""><BiShow className='no-underline text-black' size={23} /></Button>
                                    </div>
                                    
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RouteUniqueDetail