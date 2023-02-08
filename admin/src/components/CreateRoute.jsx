import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField } from '@mui/material';

import { useDispatch } from 'react-redux';
import { createRoute } from "../features/routeCreator/routeCreateSlice";
import { useNavigate } from "react-router-dom";

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
        <div>
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

                <Button
                    type="submit"
                    disabled={!isValid && !isDirty}
                    sx={{
                        marginBottom: "5px"
                    }}
                    variant="contained"
                >Add route</Button>
            </form>
        </div>
    )
}

export default CreateRoute