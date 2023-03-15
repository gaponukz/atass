import Table from "./Table";

const ShowInfoDetail = (props) => {

    const arr = []
    arr.push(props.info.move_from)
    for (let i = 0; i < props.info.sub_spots.length; i++) {
        arr.push(props.info.sub_spots[i]);
    }

    const arr1 = []
    for (let i = 0; i < props.info.sub_spots.length; i++) {
        arr1.push(props.info.sub_spots[i]);
    }
    arr1.push(props.info.move_to);

    return (
        <div className="w-4/6 overflow-auto flex flex-col bg-white relative rounded-lg p-1">
            <div className="h-[450px] rounded-t-lg shadow-y-md flex flex-row justify-between p-2">
                <div className="ml-5 mt-3">
                    <h3>Загальний опис</h3>
                    <p>{props.info.description.en.s}</p>

                    <h3>Правила</h3>
                    <p>{props.info.description.en.s}</p>

                    <h3>Правила перевезення</h3>
                    <p>{props.info.description.en.s}</p>

                </div>

                <div className="">
                    <div className="w-[286px] h-auto border-2 border-grey-600 rounded-lg mr-[50px] mt-2">
                        <div className="p-2">
                            <p className="text-2xl font-bold ">{props.info.move_from.place.city}</p>
                            <div className="flex flex-row gap-1">
                                <p>{props.info.move_from.place.country},</p>
                                <p>{props.info.move_from.place.city},</p>
                                <p>{props.info.move_from.place.street}</p>
                            </div>
                            <a href="#">Побачити на карті</a>
                            <p>Час: {props.info.move_from.date}</p>
                        </div>
                        {props.info.passengers.map((passenger) => {
                            if (passenger.moving_from.place.country === props.info.move_from.place.country &&
                                passenger.moving_from.place.city === props.info.move_from.place.city &&
                                passenger.moving_from.place.street === props.info.move_from.place.street)
                                return (
                                    <div key={passenger.moving_from.id} className="border-t-2 border-grey-600 flex flex-row justify-start pt-1 gap-x-2">
                                        <div className="w-auto h-[25px] bg-blue-600 px-[5px] rounded-lg font-bold text-white ml-[20px]">Заходить</div>
                                        <p>{passenger.first_name} {passenger.last_name}</p>
                                    </div>
                                )
                        })}
                    </div>

                    {props.info.sub_spots.map((road, index) => (
                        <div key={index} className="w-[286px] h-auto border-2 border-grey-600 rounded-lg mr-[50px] mt-2" >
                            <div className="p-2">
                                <p className="text-2xl font-bold ">{road.place.city}</p>
                                <div className="flex flex-row gap-1">
                                    <p>{road.place.country},</p>
                                    <p>{road.place.city},</p>
                                    <p>{road.place.street}</p>
                                </div>
                                <a href="#">Побачити на карті</a>
                                <p>Час: {road.date}</p>  
                            </div>
                        </div>
                    ))}

                    <div className="w-[286px] h-auto border-2 border-grey-600 rounded-lg mr-[50px] mt-2">
                        <div className="p-2">
                            <p className="text-2xl font-bold ">{props.info.move_to.place.city}</p>
                            <div className="flex flex-row gap-1">
                                <p>{props.info.move_to.place.country},</p>
                                <p>{props.info.move_to.place.city},</p>
                                <p>{props.info.move_to.place.street}</p>
                            </div>
                            <a href="#">Побачити на карті</a>
                            <p>Час: {props.info.move_to.date}</p>
                            {props.info.passengers.map((passenger) => {
                            if (passenger.moving_towards.place.country === props.info.move_to.place.country &&
                                passenger.moving_towards.place.city === props.info.move_to.place.city &&
                                passenger.moving_towards.place.street === props.info.move_to.place.street)
                                return (
                                    <div className="border-t-2 border-grey-600 flex flex-row justify-start pt-1 gap-x-2">
                                        <div className="w-auto h-[25px] bg-blue-600 px-[5px] rounded-lg font-bold text-white ml-[20px]">Виходить</div>
                                        <p>{passenger.first_name} {passenger.last_name}</p>
                                    </div>
                                )
                        })}
                        </div>
                    </div>
                    <div className="absolute ml-[-450px] ">
                        <div className="relative border-2 border-600-gray p-4 rounded-md">
                            <div className="flex flex-row gap-6 ml-[90px] font-bold text-xl">
                                {arr.map(obg => (<div>{obg.place.city}</div>))} 
                            </div>
                            <hr></hr>
                            <div className="flex flex-col gap-3 font-bold text-xl absolute">
                                {arr1.map(obg => (<div>{obg.place.city}</div>))} 
                                
                            </div>
                            
                            <div className="ml-[80px] mb-[10px]">
                            <Table arr={arr} arr1={arr1} clear={props.info}/>
                            </div>
                        </div>
                        
                    </div>

                    <div className="h-[300px]"></div>
                </div>
            </div>
        </div>
    )
}

export default ShowInfoDetail