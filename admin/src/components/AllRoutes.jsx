import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';




const AllRoutes = () => {
    const routes = useSelector(state => state.createRoute.routes)

    return (
        <div className='p-8'>
            All routes
            
        </div>
    )
}

export default AllRoutes;