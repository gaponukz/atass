import { HeadNav, AllRoutes, CreateRoute } from "./components";
import {  Routes, Route } from "react-router-dom";
import Counter from "./features/counter/Counter";

function App() {
  return (
    <div className="">
      <HeadNav />
      <Routes>
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/create-route" element={<CreateRoute />}/>
      </Routes>
      {/* <Counter /> */}
    </div>
  );
}

export default App;
