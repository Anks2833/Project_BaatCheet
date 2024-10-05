import { NavLink } from "react-router-dom"

//React icons
import { FaHeadset } from "react-icons/fa";

const Navbar = () => {
    return (

        <div className="w-full absolute top-0 h-[10vh] flex justify-between px-40 py-12">

            <NavLink to="/" className="w-fit text-slate-300 text-3xl flex items-center gap-2 cursor-pointer">
                <div className="w-fit text-white"><FaHeadset /></div>
                <h1 className="text-lg text-white font-bold">BaatCheet</h1>
            </NavLink>

            <div className="flex items-center gap-8 text-lg">
                <NavLink to="/login" className="w-fit text-white flex items-center gap-2 cursor-pointer hover:underline">Login</NavLink>
                <NavLink to="/create" className="w-fit text-white flex items-center gap-2 cursor-pointer hover:underline">Sign up</NavLink>

                {/* The profile pic */}
                {/* <div className="w-10 h-10 border rounded-full">

                </div> */}
            </div>

        </div>
    )
}

export default Navbar