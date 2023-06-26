import HeaderNavBar from "./components/HeaderNavBar";
import MainSitePage from "./components/MainSitePage";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";

import {  Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="">
      <HeaderNavBar />
      <Routes>
        <Route path="/" element={<MainSitePage />}/>
        <Route path="/about-us" element={<>About Us</>}/>
        <Route path="/sigin" element={<SignIn />}/>
        <Route path="/user-profile" element={<UserProfile />}/>
      </Routes>
    </div>
  );
}

export default App;
