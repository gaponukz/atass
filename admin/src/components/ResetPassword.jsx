import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';

import cross from "./static/images/cross.png";

import { fetchPassword, fetchConfirmPassword } from "../features/postPassword/postPassword";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(32).required(),
  confPassword: yup.string().min(4).max(32).required(),
});

const ResetPassword = () => {
  const postStatus = useSelector((state) => state.reset.status);
  const flagSuccess = useSelector((state) => state.reset.flagSuccess)
  const finalFlagSuccess = useSelector((state) => state.reset.finalFlagSuccess)
  console.log(postStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ui state
  const [gmail, setGmail] = useState(""); // skrynyk.vlad@gmail.com
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [keyCode, setKeyCode] = useState("");

  if (finalFlagSuccess) {
    navigate("/sign-in")
  }

  const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    if (flagSuccess) {
        if (data.password !== data.confPassword) 
            toast.error("Підтвердьте пароль!", { autoClose: 1500 })
        else 
          dispatch(fetchConfirmPassword({ url: "confirmResetPassword", gmail: data.email, newPassword: data.password, key: keyCode }))
    }
    else {
        if (data.password !== data.confPassword) 
            toast.error("Підтвердьте пароль!", { autoClose: 1500 })
        else 
          dispatch(fetchPassword({ url: "resetPassword", gmail: data.email }));
        
    }
    // reset()
  }


  // const handleButtonClickFirst = () => {

  //   if (password === resetPassword) {
  //     dispatch(fetchPassword({ url: "resetPassword", gmail: gmail }));
  //   }
  //   else {
  //     toast.error("Підтвердьте новий пароль", { autoClose: 1500 })
  //   }
  // }

  // const handleButtonClickSecond = () => {
  //   if (password === resetPassword) {
  //     dispatch(fetchConfirmPassword({ url: "confirmResetPassword", gmail: gmail, newPassword: password, key: keyCode }))
  //   }
  //   else {
  //     toast.error("Підтвердьте новий пароль", { autoClose: 1500 })
  //   }
  // }

  return (
    <>
      <ToastContainer />
      <div className="centered-text">
        <h1>Укажіть свою ел. адресу. Ми надішлемо вам посилання, за яким можна створити новий пароль.</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="container uu">
        <div className="input-group mb-3 nnn">
          <input
            type="text"
            className="form-control rrr"
            placeholder="Електронна адреса"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            // value={gmail}
            // onChange={(e) => {
            //   setGmail(e.target.value)
            // }}
            {...register("email")}
          />
          <button
            className="btn qqq"
            onClick={() => {
              resetField("email");
            }}
          >
            <img src={cross} />
          </button>
        </div>

        <div className="input-group mb-3 nnn">
          <input
            type="text"
            className="form-control rrr"
            placeholder="Новий пароль"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            // value={password}
            // onChange={(e) => {
            //   setPassword(e.target.value)
            // }}
            {...register("password")}

          />
          <button
            className="btn qqq"
            onClick={() => {
              resetField("password")
            }}
          >
            <img src={cross} />
          </button>
        </div>

        <div className="input-group mb-3 nnn">
          <input
            type="text"
            className="form-control rrr"
            placeholder="Підтвердити пароль"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            // value={resetPassword}
            // onChange={(e) => {
            //   setResetPassword(e.target.value)
            // }}
            {...register("confPassword")}
          />

          <button
            className="btn qqq"
            onClick={() => {
              resetField("confPassword")
            }}
          >
            <img src={cross} />
          </button>
        </div>

        {
          (flagSuccess) && (
            <div className="input-group mb-3 nnn" >
              <input
                type="text"
                className="form-control rrr"
                placeholder="Код"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={keyCode}
                onChange={(e) => {
                  setKeyCode(e.target.value)
                }}
              />

              <button
                className="btn qqq"
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
        {/* {(flagSuccess) ? (
          <button
            type="submit"
            className="btn qqq"
            style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
            id="knop"
            onClick={handleButtonClickSecond}
          >
            <span>Надіслати</span>
          </button>
        ) : (
          <button
            type="submit"
            className="btn qqq"
            style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
            id="knop"
            onClick={handleButtonClickFirst}
          >
            <span>Надіслати</span>
          </button>
        )} */}
        <button
            type="submit"
            className="btn qqq"
            style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
            id="knop"
          >
            <span>Надіслати</span>
          </button>
      </div>
      </form>
    </>
  )
}

export default ResetPassword