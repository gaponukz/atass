import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { GrFormNextLink } from "react-icons/gr";
import { NavLink } from "react-router-dom";

import { Modal, Button, TextField, Checkbox } from '@mui/material';
import { onChangeValue } from "../features/routeEditor/routeEditSlice";


const EditRouteSecond = () => {
  const currentEditRoute = useSelector(state => state.editRoute.currentEditRoute)
  //console.log(currentEditRoute);

  const dispatch = useDispatch();

  const [openShow, setOpenShow] = useState(false);
  const handleOpenShow = () => setOpenShow(true);
  const handleCloseShow = () => setOpenShow(false);

  const [currentId, setCurrentId] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentStreet, setCurrentStreet] = useState("");
  const [currentMap, setCurrentMap] = useState("");
  const [currentActive, setCurrentActive] = useState(false);

  return (
    <div className="mt-[40px] mb-[80px]">
      <Modal
        open={openShow}
        onClose={handleCloseShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='flex flex-row justify-center mt-5'
      >
        <div className="bg-white w-3/4 h-3/4 rounded-lg shadow-lg p-4 overflow-auto flex flex-col gap-2">
          
          <TextField
            className="mb-4"
            id="outlined-basic"
            label="Країна"
            variant="outlined"
            value={currentCountry}
            onChange={(e) => { setCurrentCountry(e.target.value) }}
            InputLabelProps={{
                shrink: true,
            }}
            sx={{
                width: {
                    xs: "356px",
                    md: "450px"
                }
            }}

          />

          <TextField
            className="mb-4"
            id="outlined-basic"
            label="Місто"
            variant="outlined"
            value={currentCity}
            onChange={(e) => { setCurrentCity(e.target.value) }}
            InputLabelProps={{
                shrink: true,
            }}
            sx={{
                width: {
                    xs: "356px",
                    md: "450px"
                }
            }}

          />

          <TextField
            className="mb-4"
            id="outlined-basic"
            label="Вулиця"
            variant="outlined"
            value={currentStreet}
            onChange={(e) => { setCurrentStreet(e.target.value) }}
            InputLabelProps={{
                shrink: true,
            }}
            sx={{
                width: {
                    xs: "356px",
                    md: "450px"
                }
            }}

          />

          <TextField
            className="mb-4"
            id="outlined-basic"
            label="Мапа"
            variant="outlined"
            value={currentMap}
            onChange={(e) => { setCurrentMap(e.target.value) }}
            InputLabelProps={{
                shrink: true,
            }}
            sx={{
                width: {
                    xs: "356px",
                    md: "450px"
                }
            }}

          />
          <div className="flex flex-row">
            <p className="mt-3">Данний маршрут є дійним</p>
            <Checkbox 
              checked={currentActive}
              onClick={() => {
                (currentActive) ? setCurrentActive(false) : setCurrentActive(true);
              }}
            />
          </div>

          


          <div className="flex flex-row gap-5 justify-center items-center mt-[40px]">
            <Button 
              onClick={() => {
                dispatch(onChangeValue([currentCountry, currentCity, currentStreet, currentMap, currentActive, currentId], "sub_spot")) 
                handleCloseShow()
              }} 
              variant="contained"
              color="error"
            >Закрити</Button>
          </div>
        </div>
      </Modal> 


      <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
        {currentEditRoute.sub_spots.map((route, index) => (
          <div
            onClick={() => {
              setCurrentId(index);
              setCurrentCountry(route.place.country);
              setCurrentCity(route.place.city);
              setCurrentStreet(route.place.street);
              setCurrentMap(route.place.map_url);
              setCurrentActive(route.is_active);
              handleOpenShow();
            }}
            className="border-2 border-gray-300 w-[500px] mx-auto flex flex-row justify-between gap-1 rounded-lg p-4 mb-4">
            <div className="flex flex-row">
              <p>{index+1}.</p>
              <p>{route.place.country}</p>-
              <p>{route.place.city}</p>-
              <p>{route.place.street}</p>
            </div>

            <div className="flex flex-row">
              <p>{route.date}</p>
            </div>
          </div>
        ))}


        <div className="flex flex-row mb-8 justify-center items-center">         
          <NavLink
          to="/edit-route-3"
            className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center no-underline text-black"
          >
            <p className=" text-redstone-900 mb-[5px]">Далі</p>
            <GrFormNextLink size={20} color="" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default EditRouteSecond;