import { NavLink } from "react-router-dom";

//React icons
import { FaHeadset } from "react-icons/fa";
import SignInWithComponent from "./SignInWithComponent";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";


const SignInOptionsComponent = () => {

  const signInOptions = [
    { id: 1, name: "Google", icon: <FaGoogle /> },
    { id: 2, name: "Github", icon: <FaGithub /> },
    { id: 3, name: "Facebook", icon: <FaFacebook /> }
  ]

  return (

    <div className="Auth-Box w-[30vw] h-[60vh] flex flex-col gap-2">

      <div className="w-full h-full bg-white flex flex-col">

        <div className="flex flex-col gap-3 px-10 py-8 text-2xl">

          <div className="flex items-center gap-2 text-2xl">
            <div><FaHeadset /></div>
            <h1 className="font-semibold text-zinc-700">BaatCheet</h1>
          </div>

          <h1 className="font-semibold">Sign-in options</h1>
        </div>

        <div className="flex flex-col justify-center bg-zinc-100">
          {signInOptions.map((ico) => {

            return (
              <div key={ico.id}>
                <SignInWithComponent name={ico.name} icon={ico.icon} />
              </div>
            )

          })}
        </div>

        <div className="flex justify-end gap-1 text-sm mx-10 mt-10">
          <NavLink to="/login" className="text-white bg-blue-600 px-8 py-2 hover:rounded-tl-3xl hover:rounded-bl-3xl transition-all cursor-pointer">Back</NavLink>
        </div>

      </div>
    </div>
  )
}

export default SignInOptionsComponent