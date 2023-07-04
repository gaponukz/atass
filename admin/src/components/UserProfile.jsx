import { getInfo } from "../features/getUser/getUserInformation";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import avatar from "./static/images/icons8-avatar-96.png"

import { TextField } from "@mui/material";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.get.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo());
  }, [])

  console.log(userInfo);

  return (
  <>
    <div class="container">
         </div>
         <div class="nadpis">
             <p>{userInfo.fullName}</p>
             <img src={avatar}/>
         </div>
         <div class="test">
         <a class="xxxxx" href="#">Редагувати</a>
             </div>
          <div class="red">
             <h5 class="sss">{userInfo.gmail}</h5>
             <h5 class="sss">+{userInfo.phone}</h5>

          </div>
  </>
  )
}

export default UserProfile