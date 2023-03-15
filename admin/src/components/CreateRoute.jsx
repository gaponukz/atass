import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField } from '@mui/material';

import { useDispatch } from 'react-redux';
import { createRoute } from "../features/routeCreator/routeCreateSlice";
import { useNavigate } from "react-router-dom";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";

const schema = yup.object({
    from: yup.string().required(),
    to: yup.string().required(),
    numberPlaces: yup.string().required(),
    timeStart: yup.string().required(),
    timeEnd: yup.string().required(),
});

const CreateRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isDirty, isValid }, resetField } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        console.log("here -> ", data);
        dispatch(createRoute(data.from, data.to, data.numberPlaces, data.timeStart, data.timeEnd))

        resetField("from");
        resetField("to");
        resetField("numberPlaces");
        resetField("timeStart");
        resetField("timeEnd");

        navigate("/");
    }

    return (
        <div className="bg-white p-8 ">
            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mt-4 min-h-[70px]">

                        <TextField
                            id="outlined-basic"
                            label="From*"
                            variant="outlined"
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.from?.message ? false : true}
                            color={!errors.from?.message ? "primary" : "error"}
                            {...register("from")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px]">
                        <TextField
                            id="outlined-basic"
                            label="To*"
                            variant="outlined"
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.to?.message ? false : true}
                            color={!errors.to?.message ? "primary" : "error"}
                            {...register("to")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px]">
                        <TextField
                            id="outlined-basic"
                            label="numberPlaces*"
                            variant="outlined"
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

                    <div className="mt-4 min-h-[70px]">
                        <TextField
                            id="outlined-basic"
                            label="timeStart*"
                            variant="outlined"
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.timeStart?.message ? false : true}
                            color={!errors.timeStart?.message ? "primary" : "error"}
                            {...register("timeStart")}
                        />
                    </div>

                    <div className="mt-4 min-h-[70px]">
                        <TextField
                            id="outlined-basic"
                            label="timeEnd*"
                            variant="outlined"
                            sx={{
                                width: {
                                    xs: "356px",
                                    md: "450px"
                                }
                            }}
                            error={!errors.timeEnd?.message ? false : true}
                            color={!errors.timeEnd?.message ? "primary" : "error"}
                            {...register("timeEnd")}
                        />
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

export default CreateRoute