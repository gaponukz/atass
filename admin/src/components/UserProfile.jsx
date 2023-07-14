import { getUserId, logUserOut } from "../features/getUser/getUserData";
import { chageFlagStatusFalse } from "../features/post/PostSlice";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import avatar from "./static/images/icons8-avatar-96.png"

import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.getUser.data);
  const err = useSelector((state) => state.getUser.error)
  const logout = useSelector((state) => state.getUser.logout)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserId())
  }, [])

  const handleButtonCLick = () => {
    dispatch(logUserOut())
  }

  useEffect(() => {
    if (err === "Request failed with status code 401") {
      console.log("here");
      navigate("/sign-in");
    }
  }, [err])

  useEffect(() => {
    if (logout) {
      console.log("here1");
      dispatch(chageFlagStatusFalse())
      navigate("/sign-in");
    }
  }, [logout])

  return (
    <>
      <div className="container">
      </div>
      <div className="nadpis">
        <p>Женя</p>
        <img src={avatar} />
      </div>
      <div className="test">
        <NavLink className="xxxxx" to="/edit-profile">Редагувати</NavLink>
      </div>
      <div className="red">
        <h5 className="sss">dsadasdas@gmailcom</h5>
        <h5 className="sss">+0951594543</h5>
      </div>
      <div className="butttt">
      <button
        className="btn ty"
        style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }}
        type="submit">
        <span>Log out</span>
                </button></div>
    </>
  )
}

export default UserProfile