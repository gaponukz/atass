import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CheckSteps from "./CheckSteps";

import { useDispatch } from 'react-redux';
import { change3, createRoute2 } from "../features/routeCreator/routeCreateSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";

// second
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/bootstrap-react';
import { TextareaAutosize } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
    commentText11: yup.string().required(),
    commentText12: yup.string().required(),
    commentText13: yup.string().required(),

    commentText21: yup.string().required(),
    commentText22: yup.string().required(),
    commentText23: yup.string().required(),

    commentText31: yup.string().required(),
    commentText32: yup.string().required(),
    commentText33: yup.string().required(),
   
});

const defultClassTextArea = "border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none mt-1 min-h-[90px]"

const CreateRouteSecond = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const familly_route = useSelector(state => state.createRoute.familly_route)
    const check = useSelector(state => state.createRoute.steps)
    //console.log("Start2", familly_route);

    const { register, handleSubmit, formState: { errors }, resetField } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        
        console.log("herererer");
        console.log(data);
        dispatch(createRoute2(
            data.commentText11,
            data.commentText12,
            data.commentText13,
            data.commentText21,
            data.commentText22,
            data.commentText23,
            data.commentText31,
            data.commentText32,
            data.commentText33,));
        dispatch(change3())
        navigate("/create-route-3");
    }

    

    const [activeKey1, setActiveKey1] = useState(1)
    const [activeKey2, setActiveKey2] = useState(1)
    const [activeKey3, setActiveKey3] = useState(1)
    return (
        <div className="bg-white p-8 ">
            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">

                <div className="flex flex-row gap-1">
                    <CheckSteps check={check}/>
                </div>
                

                <form onSubmit={handleSubmit(onSubmit)}>
                
                
                    <div className="p-4">
                        <p className="font-bold text-xl">Загальний опис</p>
                        <CNav variant="tabs" role="tablist">
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
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey1 === 1}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText11")}
                                />
                                
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey1 === 2}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText12")}
                                />
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey1 === 3}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText13")}
                                />
                            </CTabPane>
                        </CTabContent>

                        {/* <ToastContainer autoClose={1500} theme="colored" newestOnTop={true} /> */}
                    </div>

                    <div className="p-4">
                        <p className="font-bold text-xl">Загальні правила</p>
                        <CNav variant="tabs" role="tablist">
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
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey2 === 1}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText21")}
                                />
                                
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey2 === 2}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText22")}
                                />
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey2 === 3}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText23")}
                                />
                            </CTabPane>
                        </CTabContent>

                        {/* <ToastContainer autoClose={1500} theme="colored" newestOnTop={true} /> */}
                    </div>

                    <div className="p-4">
                        <p className="font-bold text-xl">Правила поїздки</p>
                        <CNav variant="tabs" role="tablist">
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
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey3 === 1}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText31")}
                                />
                                
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey3 === 2}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText32")}
                                />
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey3 === 3}>
                                <TextareaAutosize 
                                    className={defultClassTextArea}
                                    {...register("commentText33")}
                                />
                            </CTabPane>
                        </CTabContent>

                        {/* <ToastContainer autoClose={1500} theme="colored" newestOnTop={true} /> */}
                    </div>

                    <div className="flex flex-row mb-8 justify-center items-center">
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                            <ImCancelCircle size={20} />
                        </button>
                        <button
                            type="submit"
                            className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center ml-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px]">Далі</p>
                            <GrFormNextLink size={20} color="" />
                        </button>

                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateRouteSecond