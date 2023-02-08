import React from 'react'
import { NavLink } from 'react-router-dom';

const HeadNav = () => {

  return (
    <div className='border-b-4 border-indigo-500 flex flex-row justify-between my-4'>
        <p>Admin panel</p>

        <NavLink to="/create-route">Create route</NavLink>
        
    </div>
  )
}

export default HeadNav