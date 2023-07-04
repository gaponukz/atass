import HeaderNavBar from "./components/HeaderNavBar";
import MainSitePage from "./components/MainSitePage";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";

import {  Routes, Route } from "react-router-dom";

function App() {
  
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
      </Routes>
    </div>
  );
}

export default App;
