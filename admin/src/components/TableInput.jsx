import { useDispatch, useSelector } from 'react-redux';
import { submitPrices } from "../features/routeCreator/routeCreateSlice";

const TableInput = ({ horizon, vertical }) => {
    const dispatch = useDispatch();
    const state_prices = useSelector(state => state.createRoute.prices)
    const currentRoute = useSelector(state => state.createRoute.familly_route)
    const subSpots = useSelector(state => state.createRoute.subSpots)
    //console.log("here");
    //console.log("vert", vertical);
    //console.log("hori", horizon);

    let check = [];
    let check_rvs = [];

    let prices = {}
    for (let j = 0; j < horizon.length; j++) {
        prices[horizon[j].id] = {}
        for (let i = j; i < vertical.length; i++) {
            prices[horizon[j].id][vertical[i].id] = 0;
        }
    }
    console.log(prices);

    return (
        <div className="mt-[-165px]">
            <div>
                <div className='flex flex-row gap-1'>
                    {horizon.map(obj1 => {
                        return (<div key={obj1.id} className='flex flex-col gap-3 mt-1 ml-3'>
                            {vertical.map(obj2 => {
                                check.push(String(`${obj1.id}-${obj2.id}`))
                                check_rvs.push(String(`${obj2.id}-${obj1.id}`))

                                if (obj1.id !== obj2.id) {
                                    if (check_rvs.includes(String(`${obj1.id}-${obj2.id}`))) {
                                        return (
                                            <div key={`${obj2.id}-${obj1.id}`} className=' h-[40px] w-[120px] bg-gray-300 rounded-lg'>

                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className='flex flex-row' key={`${obj1.id}-${obj2.id}`}>
                                                {<input
                                                    onChange={(e) => {
                                                        prices[obj1.id][obj2.id] = e.target.value;
                                                    }}
                                                    placeholder="test"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />}
                                            </div>
                                        )
                                    }
                                }
                                else {
                                    return (
                                        <div key={obj1.id} className='h-[40px] w-[120px] bg-gray-300 rounded-lg'>
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

            <button
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(submitPrices(prices, subSpots))
                    //console.log("Final");
                    //console.log(currentRoute);
                    //console.log(subSpots);
                    //console.log(state_prices);

                }}
            >Test</button>
        </div>
    )
}

export default TableInput