import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { fetchSignUp, fetchSignUpConfirm } from "../features/postSignUp/postSignUp";

import { ToastContainer } from 'react-toastify';


const SignUp = () => {
    const postStatus = useSelector((state) => state.signup.status);
    const flagSuccess = useSelector((state) => state.signup.flagSuccess)
    const finalFlagSuccess = useSelector((state) => state.signup.finalFlagSuccess)
    console.log(postStatus);

    const dispatch = useDispatch();


    // ui state
    const [name, setName] = useState("");
    const [gmail, setGmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState();
    const [code, setCode] = useState("");
    const [allow, setAllow] = useState("");


    const handleButtonClickFirst = () => {
        dispatch(fetchSignUp({ url: "signup", gmail: gmail }))
    }

    const handleButtonClickSecond = () => {
        dispatch(fetchSignUpConfirm({ url: "confirmRegistration", gmail: gmail, password: password, fullName: name, phone: phone, allowsAdvertisement: allow, key: code }))
    }

    return (
        <>
            <ToastContainer />
            <div className="container">
                <div className="input-group mb-3 " >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ім'я"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className="input-group mb-3 ">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Пошта"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={gmail}
                        onChange={(e) => {
                            setGmail(e.target.value)
                        }}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="телефон"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Пароль"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Підтвердити пароль"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={confPassword}
                        onChange={(e) => {
                            setConfPassword(e.target.value)
                        }}
                    />
                </div>

                { (flagSuccess) &&
                    (<div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
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
                { (flagSuccess) ? (
                <button 
                    className="btn" 
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
                
            </div>
        </>
    )
}

export default SignUp