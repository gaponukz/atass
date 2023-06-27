import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {Circles} from "react-loader-spinner"

//import './reg.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cross from "./static/images/cross.png";
import icon_eye from "./static/images/icons8-eye-96.png"

import { fetchPosts, changeStatus } from "../features/post/PostSlice";

const SignIn = () => {
    const postStatus = useSelector((state) => state.post.status);
    const flag = useSelector((state) => state.post.fetchDataFlag);
    // useEffect(() => {
    //     const baseUrl = "http://localhost:8080"

    //     fetch(`${baseUrl}/signin`, {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             gmail: "testuser@knu.ua",
    //             password: "somepassword"
    //         })
    //     }).then(function (response) {
    //         if (response.status == 200) {
                
    //             fetch(`${baseUrl}/getUserInfo`, {credentials: "include"}).then(response => response.json()).then(data => {
    //                 console.log("data",data)
    //             })

                
    //         }
    //     })
    // }, [])

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // ui state
    const [userGmail, setGmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [rememberHim, setRememberHim] = useState(false);
    const [typePassword, setTypePassword] = useState("password");

    const handleButtonClick = () => {
        dispatch(fetchPosts({url: "signin", gmail: userGmail, password: userPassword, rememberHim: rememberHim}))
    };

    console.log(postStatus);
    if (postStatus == "error") {
        toast.error("Неправильні данні!", { autoClose: 1500 })
    }
    
    if (flag) {
        console.log("test");
        navigate("/user-profile");
    }

    return (
        <>
        <ToastContainer />
            <div className="centered-text">
                <h1>Яка ваша електронна адреса та пароль?</h1>
            </div>
            <div className="container te">
                <div className="input-group mb-3 rol">
                    <input 
                        type="text" 
                        className="form-control ert" 
                        placeholder="Електронна адреса" 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2"
                        value={userGmail}
                        onChange={(e) => {
                            setGmail(e.target.value)
                            dispatch(changeStatus())
                        }} 
                    />
                    <button 
                        type="button" 
                        className="btn ss" 
                        onClick={() => {
                            setGmail("")
                        }}
                    >
                        <img src={cross} />
                    </button>
                </div>
                <div className="input-group mb-3 rol">
                    <input 
                        type={typePassword} 
                        className="form-control ert" 
                        placeholder="Пароль" 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2" 
                        value={userPassword}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            dispatch(changeStatus())
                        }}
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
                    <a href="#" >Не пам'ятаю пароль</a>
                </div>
            </div>
            <div className="kn">
                <button 
                    type="submit" 
                    className="btn ss" 
                    style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} 
                    id="knop"
                    onClick={handleButtonClick}
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
        </>
    )
}

export default SignIn