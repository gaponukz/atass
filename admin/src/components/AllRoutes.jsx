import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUniqueRoutes } from '../api';


const AllRoutes = () => {
    const routes = useSelector(state => state.createRoute.routes)
    getUniqueRoutes();
    return (
        <div className='p-8'>
            <div className='flex flex-row items-center justify-center'>
                <div className='border-2 border-gray-300 rounded-lg w-2/4 mt-[50px]'>
                    {routes.map((route, index) => (
                        <NavLink className='no-underline text-black' to={`route/${route.move_from.city.toLowerCase()}`} key={route.move_from.id}>
                        <div className='border-b-2 border-gray-300'>
                            <div className='relative p-4'>
                                <div className='flex flex-row gap-1'> 
                                    <p className='font-bold'>{route.move_from.city}</p>-<p className='font-bold'>{route.move_to.city}</p>
                                </div>
                                <div>
                                    <p className=''>{route.move_from.country}, {route.move_from.city}, {route.move_from.street}</p>
                                    <p className=''>{route.move_to.country}, {route.move_to.city}, {route.move_to.street}</p>
                                </div>
                                <div className='absolute ml-[500px] mt-[-130px] bg-blue-600 w-auto px-2 rounded-full text-white font-bold'>{route.count}</div>
                            </div>
                        </div>
                        </NavLink>
                    ))}
                </div>

                <NavLink className='border-2 border-gray-300 mt-[-350px] px-[16px] py-[4px] rounded-lg text-xl no-underline text-black' to="/create-route-1">
                    Додати маршрут
                </NavLink>
            </div>
        </div>
    )
}

export default AllRoutes;