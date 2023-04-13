import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField } from '@mui/material';

import { useDispatch } from 'react-redux';
import { change4, createRoute } from "../features/routeCreator/routeCreateSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";

const schema = yup.object({

});

const CreateRouteFourth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentRoute = useSelector(state => state.createRoute.currentRoute)
    const check = useSelector(state => state.createRoute.steps)
    console.log("Start2", currentRoute);

    const { register, handleSubmit, formState: { errors, isDirty, isValid }, resetField } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        
        navigate("/")
    }
    return (
        <div className="bg-white p-8 ">
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

                    Fourth Step

                    {/* <div className="flex flex-row mb-8 justify-center items-center">
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

                    </div> */}
                    
                </form>


            </div>
        </div>
    )
}

export default CreateRouteFourth