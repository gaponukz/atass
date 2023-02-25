import { HeadNav, AllRoutes, CreateRoute, AllBuses, AllUsers } from "./components";
import {  Routes, Route } from "react-router-dom";
import Counter from "./features/counter/Counter";

function App() {
  return (
    <div className="h-screen" id='QW'>
      <HeadNav />
      <Routes>
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/create-route" element={<CreateRoute />}/>
        <Route path="/buses" element={<AllBuses />}/>
        <Route path="/users" element={<AllUsers />}/>
      </Routes>
      {/* <Counter /> */}
    </div>
  );
}

export default App;
