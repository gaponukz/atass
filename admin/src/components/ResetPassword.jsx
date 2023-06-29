import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";

import cross from "./static/images/cross.png";

import { fetchPassword } from "../features/postPassword/postPassword";

const ResetPassword = () => {
  const postStatus = useSelector((state) => state.reset.status);
  const flagSuccess = useSelector((state) => state.reset.flagSuccess)
  console.log(postStatus);

  const dispatch = useDispatch();

  // ui state
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  
  const handleButtonClickFirst = () => {
    dispatch(fetchPassword({ url: "resetPassword", gmail: gmail }));
  }

  const handleButtonClickSecond = () => {
    console.log("here");
  }

  return (
    <>
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
          <input type="text" className="form-control er" placeholder="Код" aria-label="Recipient's username" aria-describedby="button-addon2" />

          <button type="submit" className="btn" >
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