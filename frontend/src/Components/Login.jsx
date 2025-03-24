import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

//React icons
import { FaHeadset, FaKey } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      // Assuming the response contains the token
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to homepage or some protected route
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setLoginError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="login-content-wrapper w-full max-w-md">
        <div className="auth-box bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="auth-header px-6 sm:px-8 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="logo-icon-1 text-blue-600 text-2xl">
                <FaHeadset />
              </div>
              <h1 className="font-semibold text-gray-800 text-xl">BaatCheet</h1>
            </div>

            <h1 className="font-bold text-2xl text-gray-800">Sign in</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Welcome back! Please enter your details
            </p>
          </div>

          <div className="auth-form px-6 sm:px-8 py-6">
            {loginError && (
              <div className="error-message bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="input-icon-wrapper">
                    <MdEmail className="input-icon text-gray-400" />
                  </div>
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`input-field w-full py-2 px-10 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all`}
                    type="text"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="error-text text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-group mb-4">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="input-icon-wrapper">
                    <RiLockPasswordLine className="input-icon text-gray-400" />
                  </div>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`input-field w-full py-2 px-10 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <div
                    className="password-toggle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </div>
                </div>
                {errors.password && (
                  <p className="error-text text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="login-button w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="loading-spinner mr-2"></span>
                ) : null}
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No account?</span>
              <NavLink
                to="/create"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2"
              >
                Create one!
              </NavLink>
            </div>
          </div>
        </div>

        <NavLink
          to="/options"
          className="sign-in-options mt-4 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center px-6 py-4 gap-3 transition-all"
        >
          <div className="text-blue-600 text-lg">
            <FaKey />
          </div>
          <h1 className="text-gray-800 font-medium">Sign-in options</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
