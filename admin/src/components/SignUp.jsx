import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchSignUp, fetchSignUpConfirm } from "../features/postSignUp/postSignUp";

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    name: yup.string().min(2).max(32).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(32).required(),
    confPassword: yup.string().min(4).max(32).required(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),

});


const SignUp = () => {
    const postStatus = useSelector((state) => state.signup.status);
    const flagSuccess = useSelector((state) => state.signup.flagSuccess)
    const finalFlagSuccess = useSelector((state) => state.signup.finalFlagSuccess)
    console.log(postStatus);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (finalFlagSuccess) {
        navigate("/user-profile");
    }

    // ui state
    // const [name, setName] = useState("");
    // const [gmail, setGmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState("");
    // const [confPassword, setConfPassword] = useState("");
    const [code, setCode] = useState("");
    const [allow, setAllow] = useState(false);

    const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data) => {
        console.log({ data });
        if (flagSuccess) {
            if (data.password !== data.confPassword)
                toast.error("Підтвердьте пароль!", { autoClose: 1500 })
            else
                dispatch(fetchSignUpConfirm({ url: "confirmRegistration", gmail: data.email, password: data.password, fullName: data.name, phone: data.phoneNumber, allowsAdvertisement: allow, key: code }))
        }
        else {
            if (data.password !== data.confPassword)
                toast.error("Підтвердьте пароль!", { autoClose: 1500 })
            else
                dispatch(fetchSignUp({ url: "signup", gmail: data.email }))

        }

        // reset()
    }


    // const handleButtonClickFirst = () => {
    //     dispatch(fetchSignUp({ url: "signup", gmail: gmail }))
    // }

    // const handleButtonClickSecond = () => {
    //     dispatch(fetchSignUpConfirm({ url: "confirmRegistration", gmail: gmail, password: password, fullName: name, phone: phone, allowsAdvertisement: allow, key: code }))
    // }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmitHandler)}>

            <div className="container pp">
                
                    <div className="input-group mb-3 rrr" >
                        <input
                            type="text"
                            className="form-control pop"
                            placeholder="Ім'я"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={name}
                            // onChange={(e) => {
                            //   setName(e.target.value)
                            // }}
                            {...register("name")}
                        />
                    </div>
                    <div className="input-group mb-3 rrr">
                        <input
                            type="text"
                            className="form-control pop"
                            placeholder="Пошта"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={gmail}
                            // onChange={(e) => {
                            //     setGmail(e.target.value)
                            // }}
                            {...register("email")}
                        />
                    </div>
                    <div className="input-group mb-3 rrr">
                        <input
                            type="text"
                            className="form-control pop"
                            placeholder="телефон"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={phone}
                            // onChange={(e) => {
                            //     setPhone(e.target.value)
                            // }}
                            {...register("phoneNumber")}
                        />
                    </div>
                    <div className="input-group mb-3 rrr">
                        <input
                            type="text"
                            className="form-control pop"
                            placeholder="Пароль"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={password}
                            // onChange={(e) => {
                            //     setPassword(e.target.value)
                            // }}
                            {...register("password")}
                        />
                    </div>
                    <div className="input-group mb-3 rrr">
                        <input
                            type="text"
                            className="form-control pop"
                            placeholder="Підтвердити пароль"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={confPassword}
                            // onChange={(e) => {
                            //     setConfPassword(e.target.value)
                            // }}
                            {...register("confPassword")}

                        />
                    </div>

                    {(flagSuccess) &&
                        (<div className="input-group mb-3 rrr">
                            <input
                                type="text"
                                className="form-control pop"
                                placeholder="Код з пошти"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value)
                                }}
                            />
                        </div>)
                    }

                    <div>
                        <p className="object">Дозволити надсилати рекламу на почту</p>
                        <input
                            type="checkbox"
                            id="myCheckbox"
                            className="object"
                            checked={allow}
                            onChange={() => {
                                (allow) ? setAllow(false) : setAllow(true);

                            }}
                        />
                    </div>
            </div>

            <div className="kn">
                {/* { (flagSuccess) ? (
                <button 
                    className="btn vbn" 
                    style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} 
                    id="knop"
                    onClick={handleButtonClickSecond}
                >
                    <span>Зареєструвати</span>
                </button>) : (
                    <button 
                        className="btn" 
                        style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} 
                        id="knop"
                        onClick={handleButtonClickFirst}
                    >
                        <span>Зареєструвати</span>
                    </button>
                    ) }
                 */}
                <button
                    className="btn"
                    style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
                    id="knop"
                    type="submit"
                >
                    <span>Зареєструвати</span>
                </button>

            </div>

        </form >
        </>
    )
}

export default SignUp