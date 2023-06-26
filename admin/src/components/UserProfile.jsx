import { getInfo } from "../features/getUser/getUserInformation";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

const UserProfile = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("test");
    dispatch(getInfo());
  }, [])

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile