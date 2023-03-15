import React from 'react'

const Table = (props) => {

    const check = []

    // const arr = []
    // arr.push(props.clear.move_from)
    // for (let i = 0; i < props.clear.sub_spots.length; i++) {
    //     arr.push(props.clear.sub_spots[i]);
    // }

    // const arr1 = []
    // for (let i = 0; i < props.clear.sub_spots.length; i++) {
    //     arr1.push(props.clear.sub_spots[i]);
    // }
    // arr1.push(props.clear.move_to);

    return (
        <div>
            <div className='flex flex-row gap-1'>
                {props.arr.map(obj1 => {
                    return (<div className='flex flex-col gap-3 mt-1 ml-3'>
                        {props.arr1.map(obj2 => {
                            if (obj1.id !== obj2.id) {
                                check.push(String(`${obj1.place.city}-${obj2.place.city}`))
                                if (Object.keys(props.clear.prices[obj1.id]).length !== 0) {
                                    return (
                                        <div className='flex flex-row' key={obj1.id}>
                                            {props.clear.prices[obj1.id][obj2.id] ? <div className='text-xl '>{props.clear.prices[obj1.id][obj2.id]}</div> : <div className='text-xl h-[28px] w-[30px]'></div>}
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className='flex flex-row gap-1' key={obj1.id}>
                                            {(check.some(element => {
                                                if (element === `${obj2.place.city}-${obj1.place.city}`) {
                                                    return true;
                                                }

                                                return false;
                                            })) ? <div className='h-[28px] w-[50px] bg-gray-300 rounded-lg mb-1'></div> : <div className='h-[28px] w-[50px]'></div>}
                                        </div>
                                    )
                                }
                            }
                            else {
                                return (
                                    <div key={obj1.id} className='h-[28px] w-[50px] bg-gray-300 rounded-lg'></div>
                                )
                            }
                        })}
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Table