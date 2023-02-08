import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';




const AllRoutes = () => {
    const routes = useSelector(state => state.createRoute.routes)


    return (
        <div className='p-8'>
            <div className='flex flex-row justify-between'>
                <div>
                    From
                </div>

                <div>
                    To
                </div>

                <div>
                    Number of Places
                </div>

                <div>
                    Departure time
                </div>

                <div>
                    Arrival time
                </div>
            </div>
            {routes.map(route => (
                <div key={route.id} className="flex flex-row justify-between border-4 border-indigo-500 mb-4">
                    <p>{route.from}</p>
                    <p>{route.to}</p>
                    <p>{route.numberPlaces}</p>
                    <p>{route.timeStart}</p>
                    <p>{route.timeEnd}</p>
                </div>
            ))}
        </div>
    )
}

export default AllRoutes;