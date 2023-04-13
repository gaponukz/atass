import { useForm } from "react-hook-form";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField, Modal, TextareaAutosize } from '@mui/material'
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

import { useDispatch } from 'react-redux';
import { change4, createRoute, addSubSpot } from "../features/routeCreator/routeCreateSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";

const schema = yup.object({

});

const defultClassTextArea = "border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none mt-1 min-h-[90px]"


const CreateRouteThird = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const currentRoute = useSelector(state => state.createRoute.currentRoute)
    //console.log("Start2", currentRoute);
    const test = useSelector(state => state.createRoute.familly_route)
    const check = useSelector(state => state.createRoute.steps)
    const subSpots = useSelector(state => state.createRoute.subSpots)
    //console.log(test);

    const [openShow, setOpenShow] = useState(false);
    const handleOpenShow = () => setOpenShow(true);
    const handleCloseShow = () => setOpenShow(false);

    const { register, handleSubmit, formState: { errors, isDirty, isValid }, resetField } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        dispatch(change4())
        navigate("/create-route-4")
    }

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [map, setMap] = useState("");

    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    return (
        <div className="bg-white p-8 ">
            <Modal
                open={openShow}
                onClose={handleCloseShow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex flex-row justify-center mt-5 '
            >
                <div className='w-3/4 h-5/6 bg-white text-black rounded-lg shadow-lg overflow-auto p-4 '>
                    <p className="font-semibold text-xl p-2 mb-[0px]">Додавання проміжної точки</p>
                    <hr className="my-[1px]" />

                    <div className="p-4 flex flex-col">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Країна"
                            multiline
                            className="mt-4 w-3/6"
                            onChange={(e) => setCountry(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Місто"
                            multiline
                            className="mt-4 w-3/6"
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Вулиця"
                            multiline
                            className="mt-4 w-3/6"
                            onChange={(e) => setStreet(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Мапа"
                            multiline
                            className="mt-4 w-3/6 mb-4"
                            onChange={(e) => setMap(e.target.value)}
                        />

                        <div
                            className="flex flex-row items-center justify-start gap-2"
                        >
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Дні"
                                multiline
                                className=""
                                onChange={(e) => setDays(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Години"
                                multiline
                                className=""
                                onChange={(e) => setHours(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Хвилини"
                                multiline
                                className=""
                                onChange={(e) => setMinutes(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="flex flex-row gap-5 justify-center items-center mt-4 mb-4">
                        <Button
                            onClick={handleCloseShow}
                            variant="contained"
                            color="error"
                        >Закрити</Button>

                        <Button
                            onClick={() => {
                                // console.log({
                                //     "place": {
                                //         "country": country,
                                //         "city": city,
                                //         "street": street,
                                //         "map_url": map
                                //     },
                                //     "from_start": "?",
                                //     "id": "test"
                                // });
                                let time = days + " " + hours + " " + minutes;
                                console.log(time);
                                dispatch(addSubSpot(country, city, street, map, time))
                                setCountry("");
                                setCity("");
                                setStreet("");
                                setMap("");
                                setDays("");
                                setHours("");
                                setMinutes("");

                                handleCloseShow();

                            }}
                            variant="contained"
                        >Підтвердити</Button>
                    </div>

                </div>
            </Modal>

            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
                <div className="flex flex-row gap-1">
                    {check.firstStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-1">Місця та дати</NavLink>}
                    {check.secondStep && <p>/</p>}
                    {check.secondStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-2">Опис</NavLink>}
                    {check.thirdStep && <p>/</p>}
                    {check.thirdStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-3">Проміжні точки</NavLink>}
                    {check.fourthStep && <p>/</p>}
                    {check.fourthStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-4">Ціни</NavLink>}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="min-h-[200px]">

                    {subSpots.map((obj) => (
                        <div key={obj.id} className="rounded-lg">
                            <div className="flex flex-row justify-between gap-1">
                                <div className="flex flex-row justify-start gap-1">
                                    <p className="text-xl font-bold">{obj.place.country},</p>
                                    <p className="text-xl font-bold">{obj.place.city},</p>
                                    <p className="text-xl font-bold">{obj.place.street}</p>
                                </div>
                                <div className="flex flex-row justify-center gap-3">
                                    <AiFillDelete size={23} />
                                    <BiShow size={23} />
                                    <CiEdit size={23} />
                                </div>
                            </div>
                            {obj.from_start.split(" ").length === 3 ? <p>Прибуде через: Днів: {obj.from_start.split(" ")[0]}, Годин: {obj.from_start.split(" ")[1]}, Хвилин: {obj.from_start.split(" ")[2]} minutes</p> :
                                <p>Прибуде через : Годин: {obj.from_start.split(" ")[0]}, Хвилин: {obj.from_start.split(" ")[1]}</p>}
                            {/* <p className="mt-[-15px]">Прибуде через: {obj.from_start.split(" ")[0]}</p> */}
                            <hr />


                        </div>))}

                    <div
                        onClick={handleOpenShow}
                        className="border-2 border-gray-800 h-[40px] w-[88px] rounded-lg flex justify-center items-center"
                    >
                        <p className="mt-3 mx-auto font-semibold text-xl">Додати</p>
                    </div>

                    <div className="flex flex-row mb-8 justify-center items-center">
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                            <ImCancelCircle size={20} />
                        </button>
                        <button
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

export default CreateRouteThird