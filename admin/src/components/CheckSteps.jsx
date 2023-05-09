import { NavLink } from "react-router-dom";

const CheckSteps = ({ check }) => {
    return (
        <>
            {check.firstStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-1">Місця та дати</NavLink>}
            {check.secondStep && <p>/</p>}
            {check.secondStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-2">Опис</NavLink>}
            {check.thirdStep && <p>/</p>}
            {check.thirdStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-3">Проміжні точки</NavLink>}
            {check.fourthStep && <p>/</p>}
            {check.fourthStep && <NavLink className={({ isActive }) => (isActive ? 'no-underline text-black' : '')} to="/create-route-4">Ціни</NavLink>}

        </>
    )
}

export default CheckSteps;