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
    name: yup.string().min(2, "Заповніть поле: Ім'я Прізвище").max(32, "Нажаль надто довгий запис, спробуйте скоротити").required(),
    email: yup.string().email("Електронна адреса некоректна").required("Заповніть поле: пошта"),
    password: yup.string().min(4, "Щонайменше 4 символи").max(32, "Надто великий пароль").required("Заповніть поле: пароль"),
    confPassword: yup.string().min(4, "Щонайменше 4 символи").max(32, "Надто великий пароль").required("Заповніть поле: підтвердити пароль"),
    phoneNumber: yup.string().matches(phoneRegExp, 'Заповніть поле: телефон'),

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
    const [gmail, setGmail] = useState("");
    const [code, setCode] = useState("");
    const [allow, setAllow] = useState(false);
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data) => {
        
        if (flagSuccess) {
            if (data.password !== data.confPassword)
                toast.error("Підтвердьте пароль!", { autoClose: 1500 })
            else
                dispatch(fetchSignUpConfirm({ url: "confirmRegistration", gmail: data.email, password: data.password, fullName: data.name, phone: data.phoneNumber, allowsAdvertisement: allow, key: code }))
        }
        else {

            if (data.password !== data.confPassword)
                toast.error("Підтвердьте пароль!", { autoClose: 1500 })
            else if ((data.name.split(" ").length !== 2) || data.name.split(" ")[1] === "") {
                toast.info("Введіть повне ім'я прізвище!", { autoClose: 1500 })
            }
            else if (data.phoneNumber.includes(" ")) {
                toast.error("Неправильно введено номер\nПриклад: 09912312323", { autoClose: 1500 })
            }
            else if (!data.password.match(lowerCaseLetters) || 
                     !data.password.match(upperCaseLetters) ||
                     !data.password.match(numbers)) {
                toast.error("Ненадійний пароль", { autoClose: 1500 })
            }
            else {
                console.log({ data });
            }
            // else {
            //     dispatch(fetchSignUp({ url: "signup", gmail: data.email }))
            //     setGmail(data.email)
            // }
            
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
                            placeholder="Ім'я Прізвище"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={name}
                            // onChange={(e) => {
                            //   setName(e.target.value)
                            // }}
                            {...register("name")}
                        />
                    </div>
                    {errors.name?.message}
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
                    {errors.email?.message}
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
                    {errors.phoneNumber?.message}
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
                    {errors.password?.message}
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
                    {errors.confPassword?.message}
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
                    
                    type="submit"
                >
                    <span>Зареєструвати</span>
                </button>

            </div>

        </form >
                 {/* EDIT */}
        {(flagSuccess) && ( 
                <div className="kn">
                <button 
                    className="btn"
                    style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
                    id="knop"
                    onClick={() => {
                        dispatch(fetchSignUp({ url: "signup", gmail: gmail }))
                    }}
                >
                    <span>Відправити код ще раз</span>
                </button>
                </div>
            )}
        </>
    )
}

export default SignUp