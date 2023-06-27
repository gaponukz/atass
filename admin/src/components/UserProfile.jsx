import { getInfo } from "../features/getUser/getUserInformation";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { TextField } from "@mui/material";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.get.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo());
  }, [])

  console.log(userInfo);

  return (
    <div
      className=""
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "30px",
        marginTop: "40px"
      }}
    >
      <TextField
        disabled
        id="outlined-disabled"
        label={userInfo.fullName}
        style={{
          width: "360px"          
        }}
        defaultValue={userInfo.fullName}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label={userInfo.gmail}
        style={{
          width: "360px"          
        }}
        defaultValue={userInfo.gmail}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label={userInfo.phone}
        style={{
          width: "360px"          
        }}
        defaultValue={userInfo.phone}
      />
    </div>
  )
}

export default UserProfile