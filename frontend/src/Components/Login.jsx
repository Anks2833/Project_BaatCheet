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
    <div className="login-page min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob-shape-1"></div>
        <div className="blob-shape-2"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="login-content-wrapper w-full max-w-md relative z-10">
        <div className="auth-box glass-effect rounded-2xl overflow-hidden fade-in-up">
          <div className="auth-header px-6 sm:px-8 py-8">
            <div className="flex items-center gap-3 mb-8 fade-in">
              <div className="logo-icon p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-lg">
                <FaHeadset />
              </div>
              <h1 className="font-bold text-white text-2xl">BaatCheet</h1>
            </div>

            <h1 className="font-bold text-3xl text-white mb-2 heading-animation">
              Welcome back
            </h1>
            <p className="text-gray-300 text-sm fade-in">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="auth-form px-6 sm:px-8 py-6">
            {loginError && (
              <div className="error-message glass-error p-4 rounded-lg mb-6 text-sm slide-in">
                <div className="flex items-center gap-2">
                  <div className="error-icon">⚠️</div>
                  <span>{loginError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="form-group fade-in" style={{ animationDelay: '0.1s' }}>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="input-icon-wrapper absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    <MdEmail className="text-lg" />
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
                    className={`input-field glass-input w-full py-3 px-12 text-white placeholder-gray-400 ${
                      errors.email ? "border-red-400" : ""
                    }`}
                    type="text"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="error-text text-red-400 text-xs mt-2 flex items-center gap-1">
                    <span>•</span> {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-group fade-in" style={{ animationDelay: '0.2s' }}>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="input-icon-wrapper absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    <RiLockPasswordLine className="text-lg" />
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
                    className={`input-field glass-input w-full py-3 px-12 text-white placeholder-gray-400 ${
                      errors.password ? "border-red-400" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEyeOff className="text-lg" /> : <IoEye className="text-lg" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="error-text text-red-400 text-xs mt-2 flex items-center gap-1">
                    <span>•</span> {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="checkbox-custom h-4 w-4 rounded border-gray-600 bg-transparent text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-300 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="login-button gradient-button w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                {isLoading && (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                )}
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="divider-container my-6 fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="divider"></div>
              <span className="divider-text text-gray-400 text-sm px-4">OR</span>
              <div className="divider"></div>
            </div>

            <div className="text-center fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <NavLink
                  to="/create"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign up for free
                </NavLink>
              </p>
            </div>
          </div>
        </div>

        <NavLink
          to="/options"
          className="sign-in-options glass-effect mt-6 rounded-xl flex items-center px-6 py-4 gap-3 transition-all hover:scale-[1.02] fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="icon-gradient p-2 rounded-lg">
            <FaKey className="text-white" />
          </div>
          <h1 className="text-white font-medium">More sign-in options</h1>
          <div className="ml-auto text-gray-400">→</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;