import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { editUserData } from "../features/getUser/getUserData";
import { ToastContainer } from 'react-toastify';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  name: yup.string().required(),
});

const EditProfile = () => {
  const userInfo = useSelector((state) => state.getUser.data);
  const logout = useSelector((state) => state.getUser.logout)
  console.log(logout);
  console.log(userInfo);

  const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userInfo.fullName,
      phoneNumber: userInfo.phone
    }
  });

  // helper
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ui state
  const [check, setCheck] = useState(userInfo.allowsAdvertisement);

  useEffect(() => {
    navigate("/sign-in")
  }, [logout])
  
  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(editUserData({fullName: data.name, phone: data.phoneNumber, allowsAdvertisement: check}))
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
                defaultChecked={check}
                onClick={() => { (check) ? setCheck(false) : setCheck(true) }}
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