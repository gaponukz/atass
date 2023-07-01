import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

import cross from "./static/images/cross.png";

import { fetchPassword, fetchConfirmPassword } from "../features/postPassword/postPassword";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const postStatus = useSelector((state) => state.reset.status);
  const flagSuccess = useSelector((state) => state.reset.flagSuccess)
  const finalFlagSuccess = useSelector((state) => state.reset.finalFlagSuccess)
  console.log(postStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ui state
  const [gmail, setGmail] = useState("testuser@knu.ua");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [keyCode, setKeyCode] = useState("12345");

  if (finalFlagSuccess) {
    navigate("/sign-in")
  }

  
  const handleButtonClickFirst = () => {
    if (password === resetPassword) {
      dispatch(fetchPassword({ url: "resetPassword", gmail: gmail }));
    }
    else {
      toast.error("Підтвердьте новий пароль", { autoClose: 1500 })
    }
  }

  const handleButtonClickSecond = () => {
    if (password === resetPassword) {
      dispatch(fetchConfirmPassword({ url: "confirmResetPassword", gmail: gmail, newPassword: password, key: keyCode }))
    }
    else {
      toast.error("Підтвердьте новий пароль", { autoClose: 1500 })
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="centered-text">
        <h1>Укажіть свою ел. адресу. Ми надішлемо вам посилання, за яким можна створити новий пароль.</h1>
      </div>
      
      <div className="container">
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Електронна адреса" 
            aria-label="Recipient's username" 
            aria-describedby="button-addon2"
            value={gmail}
            onChange={(e) => {
              setGmail(e.target.value)
            }} 
          />
          <button 
            className="btn"
            onClick={() => {
              setGmail("")
            }} 
          >
            <img src={cross} />
          </button>
        </div>

        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Новий пароль" 
            aria-label="Recipient's username" 
            aria-describedby="button-addon2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }} 
          />
          <button 
            className="btn"
            onClick={() => {
              setPassword("")
            }} 
          >
            <img src={cross} />
          </button>
        </div>

        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Підтвердити пароль" 
            aria-label="Recipient's username" 
            aria-describedby="button-addon2" 
            value={resetPassword}
            onChange={(e) => {
              setResetPassword(e.target.value)
            }}
          />

          <button 
            className="btn" 
            onClick={() => {
              setResetPassword("")
            }}
          >
            <img src={cross} />
          </button>
        </div>

        {
          (flagSuccess) && (
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control er" 
            placeholder="Код" 
            aria-label="Recipient's username" 
            aria-describedby="button-addon2" 
            value={keyCode}
            onChange={(e) => {
              setKeyCode(e.target.value)
            }}
          />

          <button 
            className="btn" 
            onClick={() => {
              setKeyCode("")
            }}
          >
            <img src={cross} />
          </button>
        </div>
        )} 

      </div>

      <div className="kn">
        {(flagSuccess) ? (
          <button 
          type="submit" 
          className="btn" 
          style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} 
          id="knop"
          onClick={handleButtonClickSecond}
        >
          <span>Надіслати</span>
        </button>
        ) : (
          <button 
          type="submit" 
          className="btn" 
          style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} 
          id="knop"
          onClick={handleButtonClickFirst}
        >
          <span>Надіслати</span>
        </button>
        )}
        
      </div>
    </>
  )
}

export default ResetPassword