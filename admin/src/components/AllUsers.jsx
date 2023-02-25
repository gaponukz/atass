
import { useSelector } from "react-redux"

const AllUsers = () => {
    const routes = useSelector(state => state.usersFeatures.users)

    return (
        <div className='mx-[150px]'>
            <div className="border-2 border-gray-300 min-h-[32px] rounded-lg mt-16">
                <div className="p-4">
                    <div className="grid grid-cols-5 gap-4 justify-center items-center mx-4">
                        <p className="font-extrabold mr-[0px]">#</p>
                        <p className="font-bold mr-[0px]">Ім'я</p>
                        <p className="font-bold mr-[0px]">Фамілія</p>
                        <p className="font-bold mr-[0px]">Телефон</p>
                        <p className="font-bold mr-[0px]">Авторизований</p>
                    </div>
                    {routes.map((user, index) => (
                    <div className=" justify-center items-center mx-4 grid grid-cols-5 gap-4 border-b-2 border-gray-200 mt-2 mb-1" key={user.id}>
                        <p className="">{index + 1}</p>
                        <p className="">{user.first_name}</p>
                        <p className="">{user.last_name}</p>
                        <p className="">{user.phone_number}</p>
                        {user.is_authenticated ? <p className="">Так</p> : <p className="">Ні</p>}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default AllUsers