import { HeadNav, AllRoutes, CreateRouteFirst, CreateRouteSecond, CreateRouteThird, CreateRouteFourth, AllUsers, RouteUniqueDetail, ShowInfoDetail } from "./components";
import {  Routes, Route } from "react-router-dom";
import Counter from "./features/counter/Counter";

function App() {
  return (
    <div className="h-screen" id='QW'>
      <HeadNav />
      <Routes>
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/create-route-1" element={<CreateRouteFirst />}/>
        <Route path="/create-route-2" element={<CreateRouteSecond />}/>
        <Route path="/create-route-3" element={<CreateRouteThird />}/>
        <Route path="/create-route-4" element={<CreateRouteFourth />}/>
        <Route path="/users" element={<AllUsers />}/>
        <Route path="/route/:id" element={<RouteUniqueDetail />}/>
        {/* <Route path="/route/:id/detail/:detail" element={<ShowInfoDetail />}/> */}
        
      </Routes>
      {/* <Counter /> */}
    </div>
  );
}

export default App;
