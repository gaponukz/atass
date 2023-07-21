import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { changeStatusError, editUserData, getUserId } from "../features/getUser/getUserData";
import { ToastContainer } from 'react-toastify';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  name: yup.string().required(),
  check: yup.boolean().oneOf([true, false], 'You must agree to the terms')
});

const EditProfile = () => {
  const err = useSelector((state) => state.getUser.error)

  const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phoneNumber: ""
    }
  });

  // helper
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetAsyncForm = useCallback(async () => {
    try {
      const result = await axios.get('http://localhost:8080/getUserInfo');
      console.log(result.data);
      reset({
        name: result.data.fullName,
        phoneNumber: result.data.phone,
        check: result.data.allowsAdvertisement
      });

    }
    catch (err) {
      dispatch(changeStatusError("Request failed with status code 401"))
    }
  }, [reset]);
  

  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

  useEffect(() => {
    if (err === "Request failed with status code 401") {
      console.log("here");
      navigate("/sign-in");
    }
  }, [err])
  
  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(editUserData({fullName: data.name, phone: data.phoneNumber, allowsAdvertisement: data.check}))
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="container rety">
          <div className="form-group xpo">
            <label htmlFor="name" className="nad">Настройки</label>
            <label htmlFor="name">First name:</label>
            <div className="input-group rey mb-3 ">
              <input
                type="text"
                className="form-control zxc"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                {...register("name")}
              />
            </div>
          </div>
          <div className="form-group xpo">
            <label htmlFor="email">Phone:</label>
            <div className="input-group rey mb-3 ">
              <input
                type="text"
                className="form-control zxc"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                {...register("phoneNumber")}
              />
            </div>
          </div>
          <div className="form-group xpo rek">
            <label htmlFor="email" className="sui">Разрешить рассылку:</label>
            <div className="input-group rey mb-3 ni ">
              <input
                className="apple-switch"
                type="checkbox"
                {...register("check")}
              />
            </div>
          </div>
          <div className="btn-container">
            <div className="but1">
              <button
                className="btn oi"
                type="submit"
              >Отправить</button>
            </div>
            <div className="but2">
              <button
                className="btn oi"
                onClick={() => {navigate("/user-profile")}}
              >Назад</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditProfile