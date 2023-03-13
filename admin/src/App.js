import { HeadNav, AllRoutes, CreateRoute, AllUsers, RouteUniqueDetail, ShowInfoDetail } from "./components";
import {  Routes, Route } from "react-router-dom";
import Counter from "./features/counter/Counter";

function App() {
  return (
    <div className="h-screen" id='QW'>
      <HeadNav />
      <Routes>
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/create-route" element={<CreateRoute />}/>
        <Route path="/users" element={<AllUsers />}/>
        <Route path="/route/:id" element={<RouteUniqueDetail />}/>
        {/* <Route path="/route/:id/detail/:detail" element={<ShowInfoDetail />}/> */}
        
      </Routes>
      {/* <Counter /> */}
    </div>
  );
}

export default App;
