import { getUserId } from "../features/getUser/getUserData";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import avatar from "./static/images/icons8-avatar-96.png"

import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.getUser.data);
  const err = useSelector((state) => state.getUser.error)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserId())
  }, [])
  
  useEffect(() => {
    if (err === "Request failed with status code 401") {
      console.log("here");
      navigate("/sign-in");
    }
  }, [err])
  
  return (
  <>
    <div className="container">
         </div>
         <div className="nadpis">
             <p>{userInfo.fullName}</p>
             <img src={avatar}/>
         </div>
         <div className="test">
         <NavLink className="xxxxx" to="/edit-profile">Редагувати</NavLink>
             </div>
          <div className="red">
             <h5 className="sss">{userInfo.gmail}</h5>
             <h5 className="sss">+{userInfo.phone}</h5>
          </div>
  </>
  )
}

export default UserProfile