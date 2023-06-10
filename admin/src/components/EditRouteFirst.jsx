import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { onChangeValue } from "../features/routeEditor/routeEditSlice";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";

import { TextField, TextareaAutosize } from '@mui/material';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/bootstrap-react';
import { NavLink } from "react-router-dom";

const defultClassTextArea = "border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none mt-1 min-h-[90px]"

const EditRouteFirst = () => {
  const currentEditRoute = useSelector(state => state.editRoute.currentEditRoute)
  console.log(currentEditRoute);

  const dispatch = useDispatch();

  const [activeKey1, setActiveKey1] = useState(1)
  const [activeKey2, setActiveKey2] = useState(1)
  const [activeKey3, setActiveKey3] = useState(1)


  return (
    <div className="mt-[40px] mb-[80px]">
      <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Країна відпр.*"
            variant="outlined"
            value={currentEditRoute.move_from.place.country}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "from_country")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Населений пункт(місто, селище) відпр.*"
            variant="outlined"
            value={currentEditRoute.move_from.place.city}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "from_city")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Вулиця відпр.*"
            variant="outlined"
            value={currentEditRoute.move_from.place.street}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "from_street")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Мапа"
            variant="outlined"
            value={currentEditRoute.move_from.place.map_url}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "from_map_url")) }}
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
        </div>


        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Країна приб.*"
            variant="outlined"
            value={currentEditRoute.move_to.place.country}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "to_country")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Населений пункт(місто, селище) приб.*"
            variant="outlined"
            value={currentEditRoute.move_to.place.city}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "to_city")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Вулиця приб.*"
            variant="outlined"
            value={currentEditRoute.move_to.place.street}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "to_street")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center">
          <TextField
            id="outlined-basic"
            label="Мапа"
            variant="outlined"
            value={currentEditRoute.move_to.place.map_url}
            onChange={(e) => { dispatch(onChangeValue(e.target.value, "to_map_url")) }}
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
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center flex-col items-center">
          <p className="font-bold text-xl">Загальний опис</p>
          <CNav variant="tabs" role="tablist" className="w-[450px]">
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey1 === 1}
                onClick={() => setActiveKey1(1)}
              >
                UA
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey1 === 2}
                onClick={() => setActiveKey1(2)}
              >
                ENG
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey1 === 3}
                onClick={() => setActiveKey1(3)}
              >
                PL
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            className="w-[450px]"
          >
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey1 === 1}>
              <TextareaAutosize
                label="ds"
                className={defultClassTextArea}
                value={currentEditRoute.description.ua}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "descip_ua")) }}
              />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey1 === 2}>
              <TextareaAutosize
                className={defultClassTextArea}
                value={currentEditRoute.description.en}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "descip_en")) }}
              />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey1 === 3}>
              <TextareaAutosize
                className={defultClassTextArea}
                value={currentEditRoute.description.pl}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "descip_pl")) }}
              />
            </CTabPane>
          </CTabContent>
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center flex-col items-center">
          <p className="font-bold text-xl">Правила</p>
          <CNav variant="tabs" role="tablist" className="w-[450px]">
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey2 === 1}
                onClick={() => setActiveKey2(1)}
              >
                UA
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey2 === 2}
                onClick={() => setActiveKey2(2)}
              >
                ENG
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey2 === 3}
                onClick={() => setActiveKey2(3)}
              >
                PL
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            className="w-[450px]"
          >
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey2 === 1}>
              <TextareaAutosize
                label="ds"
                className={defultClassTextArea}
                value={currentEditRoute.rules.ua}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "rules_ua")) }}
              />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey2 === 2}>
              <TextareaAutosize
                className={defultClassTextArea}
                value={currentEditRoute.rules.en}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "rules_en")) }}
              />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey2 === 3}>
              <TextareaAutosize
                className={defultClassTextArea}
                value={currentEditRoute.rules.pl}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "rules_pl")) }}
              />
            </CTabPane>
          </CTabContent>
        </div>

        <div className="mt-4 min-h-[70px] flex justify-center flex-col items-center">
          <p className="font-bold text-xl">Парвила транспортування</p>
          <CNav variant="tabs" role="tablist" className="w-[450px]">
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey3 === 1}
                onClick={() => setActiveKey3(1)}
              >
                UA
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey3 === 2}
                onClick={() => setActiveKey3(2)}
              >
                ENG
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                //href="javascript:void(0);"
                active={activeKey3 === 3}
                onClick={() => setActiveKey3(3)}
              >
                PL
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            className="w-[450px]"
          >
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey3 === 1}>
              <TextareaAutosize
                label="ds"
                className={defultClassTextArea}
                value={currentEditRoute.transportation_rules.ua}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "trans_ua")) }}
              />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey3 === 2}>
              <TextareaAutosize
                className={defultClassTextArea}
                value={currentEditRoute.transportation_rules.en}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "trans_en")) }}
              />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey3 === 3}>
              <TextareaAutosize
                className={defultClassTextArea}
                value={currentEditRoute.transportation_rules.pl}
                onChange={(e) => { dispatch(onChangeValue(e.target.value, "trans_pl")) }}
              />
            </CTabPane>
          </CTabContent>
        </div>

        <div className="flex flex-row mb-8 justify-center items-center">         
          <NavLink
          to="/edit-route-2"
            className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center no-underline text-black"
          >
            <p className=" text-redstone-900 mb-[5px]">Далі</p>
            <GrFormNextLink size={20} color="" />
          </NavLink>
        </div>

      </div>
      <div className="h-[50px]" />
    </div>
  )
}

export default EditRouteFirst