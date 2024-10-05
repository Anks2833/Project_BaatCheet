import { NavLink } from "react-router-dom";

//React icons
import { FaHeadset } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

const Login = () => {
  return (

    <div className="w-[30vw] h-[55vh] flex flex-col gap-2">

      <div className="Auth-Box w-full h-[45vh] bg-white flex flex-col shadow-sm shadow-black">

        <div className="flex flex-col gap-3 px-10 py-8 text-2xl">

          <div className="flex items-center gap-2 text-2xl">
            <div><FaHeadset /></div>
            <h1 className="font-semibold text-zinc-700">BaatCheet</h1>
          </div>

          <h1 className="font-semibold">Sign in</h1>
        </div>

        <div className="flex justify-center">
          <form action="">
            <input className="w-[25vw] pt-2 pb-1 bg-transparent outline-none border-b border-b-blue-600 mx-10" type="text" placeholder="Email or phone" />
            <input className="bg-blue-600 text-white px-8 py-1 mx-10 my-2 hover:rounded-xl cursor-pointer transition-all" type="submit" value="Login" />
          </form>
        </div>

        <div className="flex items-center gap-1 text-sm mx-10 my-10">
            <h1>No account?</h1>
            <NavLink to="/create" className="text-blue-600 cursor-pointer">Create one!</NavLink>
        </div>

      </div>

      <NavLink to="/options" className="Auth-Box w-full h-[8vh] bg-white hover:bg-zinc-200 cursor-pointer flex pl-12 items-center gap-4">

        <div className="text-xl"><FaKey /></div>
        <h1 to="/options" className="text-xl">Sign-in options</h1>

      </NavLink>

    </div>
  )
}

export default Login