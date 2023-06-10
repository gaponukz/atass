import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { onChangeValue } from "../features/routeEditor/routeEditSlice";

import { GrStatusGood } from "react-icons/gr";

const EditRouteThird = () => {
    const dispatch = useDispatch()
    const currentEditRoute = useSelector(state => state.editRoute.currentEditRoute)
    console.log(currentEditRoute);

    const sub_spots = useSelector(state => state.editRoute.currentEditRoute.sub_spots)
    console.log(sub_spots);

    let horizon = [{city: currentEditRoute.move_from.place.city, id:currentEditRoute.move_from.id}]
    for (let i = 0; i < sub_spots.length; i++) {
        if (sub_spots[i].is_active) {
            horizon.push({city: sub_spots[i].place.city,
                        id: sub_spots[i].id});
        }
    }
    //console.log(horizon);

    let vertical = []
    for (let i = 0; i < sub_spots.length; i++) {
        if (sub_spots[i].is_active) {
            vertical.push({city: sub_spots[i].place.city,
                        id: sub_spots[i].id});
        }
    }
    vertical.push({city: currentEditRoute.move_to.place.city, id:currentEditRoute.move_to.id});
    //console.log(vertical);

    let check = [];
    let check_rvs = [];

    let prices = currentEditRoute.prices
    //for (let j = 0; j < horizon.length; j++) {
    //    prices[horizon[j].id] = {}
    //    for (let i = j; i < vertical.length; i++) {
    //        prices[horizon[j].id][vertical[i].id] = 0;
    //    }
    //}
    console.log(prices);

    
    return (
        <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4 mt-8 relative">
            <div className="flex flex-row gap-6 ml-[90px] font-bold text-xl">
                {horizon.map(obg => (<div className="w-[120px]" key={obg.id}>{obg.city}</div>))} 
            </div>
            <hr></hr>
            <div className="flex flex-col gap-3 font-bold text-xl mt-[20px]">
                                {vertical.map(obg => (<div className="mb-[15px]" key={obg.id}>{obg.city}</div>))} 
                                
                            </div>
            <div className="mt-[35px]">
            <div className="absolute mt-[-200px] ml-[100px]">
                <div className='flex flex-row gap-4'>
                    {horizon.map(obj1 => {
                        return (<div key={obj1.id} className='flex flex-col gap-3 mt-1 ml-3'>
                            {vertical.map(obj2 => {
                                check.push(String(`${obj1.id}-${obj2.id}`))
                                check_rvs.push(String(`${obj2.id}-${obj1.id}`))

                                if (obj1.id !== obj2.id) {
                                    if (check_rvs.includes(String(`${obj1.id}-${obj2.id}`))) {
                                        return (
                                            <div key={`${obj2.id}-${obj1.id}`} className=' h-[40px] w-[90px] bg-gray-300 rounded-lg'>

                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className='flex flex-row' key={`${obj1.id}-${obj2.id}`}>
                                                {<input
                                                    onChange={(e) => {
                                                        //prices[obj1.id][obj2.id] = e.target.value;
                                                        dispatch(onChangeValue([obj1.id, obj2.id, e.target.value], "change_price"))
                                                    }}
                                                    placeholder=""
                                                    value={prices[obj1.id][obj2.id]}
                                                    className="shadow appearance-none border rounded w-[90px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />}
                                            </div>
                                        )
                                    }
                                }
                                else {
                                    return (
                                        <div key={obj1.id} className='h-[40px] w-[90px] bg-gray-300 rounded-lg'>
                                            <div
                                                className=""
                                            />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        )
                    })}
                </div>
            </div>

        </div>
        <div className="flex flex-row justify-center items-center">
            <button
                className="flex flex-row mt-8 rounded-lg border-2 border-green-400 w-[130px] h-[40px] justify-center items-center"
            >
                <p className=" text-redstone-900 mb-[5px] mr-[5px]">Підтвердити</p>
                <GrStatusGood size={20}  />
            </button>
        </div>
        </div>
    )
}

export default EditRouteThird