import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';

import cross from "./static/images/cross.png";
import icon_eye from "./static/images/icons8-eye-96.png"

import { fetchPassword, fetchConfirmPassword, changeFinalFlagSuccess, changeFlagSuccess } from "../features/postPassword/postPassword";
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
  const [typePassword, setTypePassword] = useState("password");
  const [typeResetPassword, setTypeResetPassword] = useState("password");
  const [keyCode, setKeyCode] = useState("");

  useEffect(() => {
    if (finalFlagSuccess) {
      navigate("/sign-in");
      dispatch(changeFinalFlagSuccess(false))
      dispatch(changeFlagSuccess(false))
    }
  }, [finalFlagSuccess])
  

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
            className="form-control rrrr" 
            placeholder="Електронна адреса" 
            aria-label="Recipient's username" 
            aria-describedby="button-addon2"
            {...register("email")}
          />
          <button
            className="btn qqq"
            type="button"
            onClick={() => {
              resetField("email")
            }} 
          >
            <img src={cross} />
          </button>
        </div>
        <div className="input-group mb-3 nnn">
          <input
            type={typePassword}
            className="form-control rrrr"
            placeholder="Новий пароль"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            {...register("password")}

          />
          <button
            className="btn qqq"
            type="button"
            onClick={() => {
              (typePassword == "password") ? setTypePassword("test") : setTypePassword("password")
          }}
          >
            <img src={icon_eye} />
          </button>
        </div>

        <div className="input-group mb-3 nnn">
          <input
            type={typeResetPassword}
            className="form-control rrrr"
            placeholder="Підтвердити пароль"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            {...register("confPassword")}
          />

          <button
            className="btn qqq"
            type="button"
            onClick={() => {
              (typeResetPassword == "password") ? setTypeResetPassword("test") : setTypeResetPassword("password")
            }}
          >
            <img src={icon_eye} />
          </button>
        </div>

        {
          (flagSuccess) && (
        <div className="input-group mb-3 nnn" >
          <input 
            type="text" 
            className="form-control rrrr" 
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
                type="button"
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