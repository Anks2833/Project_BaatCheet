import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//React icons
import { FaHeadset, FaKey } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email: data.email,
        password: data.password,
      });

      // Assuming the response contains the token
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to homepage or some protected route
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[30vw] h-[55vh] flex flex-col gap-2">
      <div className="Auth-Box w-full h-[45vh] bg-white flex flex-col shadow-sm shadow-black">
        <div className="flex flex-col gap-3 px-10 py-8 text-2xl">
          <div className="flex items-center gap-2 text-2xl">
            <div>
              <FaHeadset />
            </div>
            <h1 className="font-semibold text-zinc-700">BaatCheet</h1>
          </div>

          <h1 className="font-semibold">Sign in</h1>
        </div>

        <div className="relative flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email", { required: true })}
              className="w-[25vw] pt-2 pb-1 mb-2 bg-transparent outline-none border-b border-b-blue-600 mx-10"
              type="text"
              placeholder="Enter your email"
            />

            <input
              {...register("password", { required: true })}
              className="w-[25vw] pt-2 pb-1 mb-2 bg-transparent outline-none border-b border-b-blue-600 mx-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <div
              className="absolute right-12 top-[3.5vw] text-lg cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </div>

            <input
              className="bg-blue-600 text-white px-8 py-1 mx-10 my-2 hover:rounded-3xl cursor-pointer transition-all"
              type="submit"
              value="Login"
            />
          </form>
        </div>

        <div className="flex items-center gap-1 text-sm mx-10 my-5">
          <h1>No account?</h1>
          <NavLink to="/create" className="text-blue-600 cursor-pointer">
            Create one!
          </NavLink>
        </div>
      </div>

      <NavLink
        to="/options"
        className="Auth-Box w-full h-[8vh] bg-white hover:bg-zinc-200 cursor-pointer flex pl-12 items-center gap-4"
      >
        <div className="text-xl">
          <FaKey />
        </div>
        <h1 to="/options" className="text-xl">
          Sign-in options
        </h1>
      </NavLink>
    </div>
  );
};

export default Login;
