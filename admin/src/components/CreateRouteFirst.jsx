import { useForm } from "react-hook-form";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField, Modal } from '@mui/material';

import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import { useDispatch } from 'react-redux';
import { createRoute1, addRoute, change2 } from "../features/routeCreator/routeCreateSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";
import { nanoid } from "@reduxjs/toolkit";

const sub = (date) => {

    date[2](addRoute([`${date[0][0].day}-${date[0][0].month.number}-${date[0][0].year} ${date[0][0].hour}:${date[0][0].minute}:${date[0][0].second}`,
    `${date[1][0].day}-${date[1][0].month.number}-${date[1][0].year} ${date[1][0].hour}:${date[1][0].minute}:${date[1][0].second}`]))
}

const schema = yup.object({
    fromCountry: yup.string().required(),
    fromCity: yup.string().required(),
    fromStreet: yup.string().required(),
    toCountry: yup.string().required(),
    toCity: yup.string().required(),
    toStreet: yup.string().required(),
    numberPlaces: yup.number().required(),
    map1: yup.string(),
    map2: yup.string(),
});


const CreateRouteFirst = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentRoute = useSelector(state => state.createRoute.currentRoute)
    const v = useSelector(state => state.createRoute.addRoute)
    const test = useSelector(state => state.createRoute.familly_route)
    const check = useSelector(state => state.createRoute.steps)
    //console.log(test);


    const [dates1, setDates1] = useState(
        [].map((number) =>
            new DateObject().set({
                day: number,
                hour: number,
                minute: number,
                second: number,
            })
        )
    );
    const [dates2, setDates2] = useState(
        [].map((number) =>
            new DateObject().set({
                day: number,
                hour: number,
                minute: number,
                second: number,
            })
        )
    );
    //console.log(dates);
    //if (dates[0]) {
    //    console.log(`${dates[0].day}-${dates[0].month.number}-${dates[0].year} ${dates[0].hour}:${dates[0].minute}:${dates[0].second}`);
    //}

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let index1 = 0;

    const [openShow, setOpenShow] = useState(false);
    const handleOpenShow = () => setOpenShow(true);
    const handleCloseShow = () => setOpenShow(false);


    const { register, handleSubmit, formState: { errors, isDirty, isValid }, resetField } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        console.log("here -> ", data);
        console.log(v.at(-1), v.at(-2));
        dispatch(createRoute1(data.fromCountry, data.fromCity, data.fromStreet,
           data.toCountry, data.toCity, data.toStreet, data.numberPlaces, data.map1, data.map2, v.at(-1)))
        
        dispatch(change2())
        navigate("/create-route-2");
    }

    return (
        <div className="bg-white p-8 ">
            <Modal
                open={openShow}
                onClose={handleCloseShow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex flex-row justify-center mt-5'
            >
                <div className='w-3/4 h-3/4 bg-white text-black rounded-lg shadow-lg'>
                    <p className="font-semibold text-xl p-2 mb-[0px]">Встановіть Дати</p>
                    <hr className="my-[1px]" />

                    <div className="flex flex-row p-6">
                        <p>Час прибуття: </p>
                        <DatePicker
                            style={{ height: "30px", width: "400px", marginLeft: '45px' }}
                            value={dates1}
                            className=""
                            onChange={setDates1}
                            format="MM/DD/YYYY HH:mm:ss"
                            multiple
                            plugins={[
                                <TimePicker position="bottom" />,
                                <DatePanel markFocused />
                            ]}
                        />
                    </div>

                    <div className="flex flex-row p-6">
                        <p>Час відправлення: </p>
                        <DatePicker
                            style={{ height: "30px", width: "400px", marginLeft: "10px" }}
                            value={dates2}
                            onChange={setDates2}
                            format="MM/DD/YYYY HH:mm:ss"
                            multiple
                            plugins={[
                                <TimePicker position="bottom" />,
                                <DatePanel markFocused />
                            ]}
                        />
                    </div>

                    <div className="flex flex-row gap-5 justify-center items-center mt-[100px]">
                        <Button 
                            onClick={handleCloseShow} 
                            variant="contained"
                            color="error"
                        >Закрити</Button>

                        <Button 
                            onClick={() => sub([dates1, dates2, dispatch])} 
                            variant="contained"
                        >Підтвердити</Button>
                    </div>
                    
                </div>
            </Modal>

            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
                <div className="flex flex-row gap-1">
                    { check.firstStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-1">Місця та дати</NavLink>}
                    { check.secondStep && <p>/</p> }
                    { check.secondStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-2">Опис</NavLink>}
                    { check.thirdStep && <p>/</p> } 
                    { check.thirdStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-3">Проміжні точки</NavLink> }
                    { check.fourthStep && <p>/</p> }
                    { check.fourthStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-4">Ціни</NavLink> }
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mt-4 min-h-[70px] flex justify-center">

                        <TextField
                            id="outlined-basic"
                            label="Країна відпр.*"
                            variant="outlined"
                            
                            
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.fromCountry?.message ? false : true}
                            color={!errors.fromCountry?.message ? "primary" : "error"}
                            {...register("fromCountry")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">

                        <TextField
                            id="outlined-basic"
                            label="Населений пункт(місто, селище) відпр.*"
                            variant="outlined"
                            //value={test.move_from.place.city}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.fromCity?.message ? false : true}
                            color={!errors.fromCity?.message ? "primary" : "error"}
                            {...register("fromCity")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">

                        <TextField
                            id="outlined-basic"
                            label="Вулиця відпр.*"
                            variant="outlined"
                            //value={test.move_from.place.street}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.fromStreet?.message ? false : true}
                            color={!errors.fromStreet?.message ? "primary" : "error"}
                            {...register("fromStreet")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">
                        <TextField
                            id="outlined-basic"
                            label="Мапа"
                            variant="outlined"
                            //value={test.move_from.place.map_url}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.map1?.message ? false : true}
                            color={!errors.map1?.message ? "primary" : "error"}
                            {...register("map1")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">
                        <TextField
                            id="outlined-basic"
                            label="Країна приб.*"
                            variant="outlined"
                            //value={test.move_to.place.country}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.toCountry?.message ? false : true}
                            color={!errors.toCountry?.message ? "primary" : "error"}
                            {...register("toCountry")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">
                        <TextField
                            id="outlined-basic"
                            label="Населений пункт(місто, селище) приб.*"
                            variant="outlined"
                            //value={test.move_to.place.city}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.toCity?.message ? false : true}
                            color={!errors.toCity?.message ? "primary" : "error"}
                            {...register("toCity")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">
                        <TextField
                            id="outlined-basic"
                            label="Вулиця приб.*"
                            variant="outlined"
                            //value={test.move_to.place.street}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.toStreet?.message ? false : true}
                            color={!errors.toStreet?.message ? "primary" : "error"}
                            {...register("toStreet")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">
                        <TextField
                            id="outlined-basic"
                            label="Мапа"
                            variant="outlined"
                            //value={test.move_to.place.map_url}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.map2?.message ? false : true}
                            color={!errors.map2?.message ? "primary" : "error"}
                            {...register("map2")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px] flex justify-center">
                        <TextField
                            id="outlined-basic"
                            label="Число пасажирів*"
                            variant="outlined"
                            //value={test.passengers_number}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.numberPlaces?.message ? false : true}
                            color={!errors.numberPlaces?.message ? "primary" : "error"}
                            {...register("numberPlaces")}
                        />
                    </div>




                    <div
                        onClick={handleOpenShow}
                        className="border-2 border-gray-800 h-[40px] w-[88px] rounded-lg ml-auto flex justify-center items-center"
                    >
                        <p className="mt-3 mx-auto font-semibold text-xl">Додати</p>
                    </div>

                    <div className="flex flex-col mt-5 mb-10 mx-[20px] h-auto border-t-2 border-gray-300">
                        <div className="flex flex-row justify-between" key={index1}>
                            <p className="font-bold text-xl">Відправлення</p>
                            <p className="font-bold text-xl">Прибуття</p>
                        </div>

                        {v.map(date => (
                            <div className="flex flex-row justify-between" key={nanoid()}>
                                <p className="">{date[0]}</p>
                                <p>{date[1]}</p>
                                {/* <p>{months.indexOf(date[0].slice(4, 7))} {date[0].slice(8, 16)}</p>  */}

                            </div>))}
                    </div>


                    <div className="flex flex-row mb-8 justify-center items-center">
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                            <ImCancelCircle size={20} />
                        </button>
                        <button
                            type="submit"
                            className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center ml-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px]">Далі</p>
                            <GrFormNextLink size={20} color="" />
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRouteFirst