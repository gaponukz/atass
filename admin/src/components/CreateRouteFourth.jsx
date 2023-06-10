import { useForm } from "react-hook-form";

import { useDispatch } from 'react-redux';
import CheckSteps from "./CheckSteps";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";
import TableInput from "./TableInput";


const CreateRouteFourth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentRoute = useSelector(state => state.createRoute.familly_route)
    const subSpots = useSelector(state => state.createRoute.subSpots)
    const check = useSelector(state => state.createRoute.steps)
    //console.log("Start4", currentRoute);
    //console.log("Start41", subSpots);\
    

    const { handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log("Finall", currentRoute);

        navigate("/")
    }

    let horizon = [{city: currentRoute.route_prototype.move_from.place.city, id:currentRoute.route_prototype.move_from.id}]
    for (let i = 0; i < subSpots.length; i++) {
        horizon.push({city: subSpots[i].place.city,
                    id: subSpots[i].id});
    }
    

    let vertical = []
    for (let i = 0; i < subSpots.length; i++) {
        vertical.push({city: subSpots[i].place.city,
                    id: subSpots[i].id});
    }
    vertical.push({city: currentRoute.route_prototype.move_to.place.city, id:currentRoute.route_prototype.move_to.id});
    
    return (
        <div className="bg-white p-8 ">
            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
            <div className="flex flex-row gap-1">
                <CheckSteps check={check}/>
            </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="relative border-2 border-600-gray p-4 rounded-md">
                            <div className="flex flex-row gap-6 ml-[90px] font-bold text-xl">
                                {horizon.map(obg => (<div className="w-[120px]" key={obg.id}>{obg.city}</div>))} 
                            </div>
                            <hr></hr>
                            <div className="flex flex-col gap-3 font-bold text-xl mt-[20px]">
                                {vertical.map(obg => (<div className="mb-[15px]" key={obg.id}>{obg.city}</div>))} 
                                
                            </div>

                            <div className="ml-[80px] mb-[10px]">
                                <TableInput horizon={horizon} vertical={vertical}/>
                            </div>
                    </div>

                    <div className="flex flex-row mb-8 justify-center items-center">
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                            <ImCancelCircle size={20} />
                        </button>
                        <button
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

export default CreateRouteFourth