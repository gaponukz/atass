import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { changeAuthorized, changeLogout } from "../features/getUser/getUserData";

import { Circles } from "react-loader-spinner"

import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cross from "./static/images/cross.png";
import icon_eye from "./static/images/icons8-eye-96.png"

import { fetchPosts, changeStatus } from "../features/post/PostSlice";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(32).required(),
});

const SignIn = () => {
    const postStatus = useSelector((state) => state.post.status);
    const flag = useSelector((state) => state.post.fetchDataFlag);
    // const finalFlagSuccess = useSelector((state) => state.reset.finalFlagSuccess)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // ui state
    const [rememberHim, setRememberHim] = useState(false);
    const [typePassword, setTypePassword] = useState("password");

    const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = (data) => {
        console.log({ data });
        dispatch(fetchPosts({ url: "signin", gmail: data.email, password: data.password, rememberHim: rememberHim }))
        reset()
    }

    useEffect(() => {
        if (flag) {
            console.log("test");
            dispatch(changeLogout())
            dispatch(changeAuthorized(true))
            navigate("/user-profile");
        }
    }, [flag])

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="centered-text">
                <h1>Яка ваша електронна адреса та пароль?</h1>
            </div>
            <div className="container te">
                <div className="input-group mb-3 rol">
                    <input
                        type="email"
                        className="form-control ert"
                        placeholder="Електронна адреса"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        {...register("email")}
                    />
                    <button
                        type="button"
                        className="btn ss"
                        onClick={() => {
                            resetField("email");
                        }}
                    >
                        <img src={cross} />
                    </button>
                </div>
                <p>{errors.email?.message}</p>
                <p>{}</p>
                <div className="input-group mb-3 rol">
                    <input
                        type={typePassword}
                        className="form-control ert"
                        placeholder="Пароль"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        {...register("password")}
                    />
                    
                    <button
                        type="button"
                        className="btn ss"
                        onClick={() => {
                            (typePassword == "password") ? setTypePassword("test") : setTypePassword("password")
                        }}
                    >
                        <img src={icon_eye} />
                    </button>
                </div>
                <p>{errors.password?.message}</p>
                <p className="object">Запам'ятати мене</p>
                <input
                    type="checkbox"
                    id="myCheckbox"
                    className="object"
                    checked={rememberHim}
                    onChange={() => {
                        (rememberHim) ? setRememberHim(false) : setRememberHim(true);

                    }}
                />
                
                <div className="sil">
                    <NavLink to="/reset-password" style={{ display: 'block' }} >Не пам'ятаю пароль</NavLink>
                    <NavLink to="/sign-up " style={{ display: 'block', marginTop: '2%'}}>Зареєструватись</NavLink>
                </div>
            
            </div>

            <div className="kn">
                <button
                    type="submit"
                    className="btn ss"
                    style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
                    
                    disabled={(postStatus === "loading") ? true : false}
                >
                    {(postStatus === "loading") ? (
                        <Circles
                            color="#00FFFF"
                            height={25}
                            width={60}
                            className="m-5"
                        />
                    ) : (
                        <span

                        >Увійти</span>
                    )}
                </button>
            </div>
            </form>
        </>
    )
}

export default SignIn