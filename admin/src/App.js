import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./components/EditProfile";
import HeaderNavBar from "./components/HeaderNavBar";
import MainSitePage from "./components/MainSitePage";
import PageNotFound from "./components/PageNotFound";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";

import {  Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { refreshUser } from "./features/getUser/getUserData";

function App() {
  const flag = useSelector((state) => state.getUser.flag);

  const dispatch = useDispatch();

  useEffect(() => {
    let interval = setInterval(() => {
      if (!flag) {
        // dispatch(refreshUser())
        console.log("SEND REFRESH");
      }
    }, 2000);
    
    return () => {
      clearInterval(interval);
    };

  }, [flag])
  
  
  return (
    <div className="">
      <HeaderNavBar />
      <Routes>
        {/* site */}
        <Route path="/" element={<MainSitePage />}/>
        <Route path="/about-us" element={<>About Us</>}/>
        
        {/* user features */}
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/user-profile" element={<UserProfile />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/edit-profile" element={<EditProfile />}/>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
