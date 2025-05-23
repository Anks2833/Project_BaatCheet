import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Icons
import { FaHeadset, FaCamera, FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isNext, setIsNext] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Watch password for validation
  const password = watch("password");

  // Function to handle "Next" button click
  const handleNext = () => {
    // Validate first form before proceeding
    const firstName = watch("firstName");
    const lastName = watch("lastName");
    const email = watch("email");
    const confirmPassword = watch("confirmPassword");

    if (firstName && lastName && email && password && confirmPassword) {
      setIsNext(true);
    }
  };

  const handleBack = () => {
    setIsNext(false);
  };

  // Function to handle file input change and preview the image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create image preview URL
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullname", `${data.firstName} ${data.lastName}`);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.profileImage && data.profileImage[0]) {
      formData.append("profilePic", data.profileImage[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Store token and redirect
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: isNext ? "translateX(-100%)" : "translateX(0)",
            }}
          >
            {/* First Part - Account Details */}
            <div className="w-full flex-shrink-0">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <FaHeadset className="text-white text-2xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">BaatCheet</h1>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-gray-300 mb-8">
                  Join us and start chatting!
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    {/* Name inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          {...register("firstName", {
                            required: "First name is required",
                            minLength: { value: 2, message: "Too short" },
                          })}
                          className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          type="text"
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <span className="text-red-400 text-xs mt-1 block">
                            {errors.firstName.message}
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          {...register("lastName", {
                            required: "Last name is required",
                            minLength: { value: 2, message: "Too short" },
                          })}
                          className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          type="text"
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <span className="text-red-400 text-xs mt-1 block">
                            {errors.lastName.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type="email"
                        placeholder="someone@example.com"
                      />
                      {errors.email && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Password input */}
                    <div className="relative">
                      <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                      </button>
                      {errors.password && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.password.message}
                        </span>
                      )}
                    </div>

                    {/* Confirm Password input */}
                    <div className="relative">
                      <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords don't match",
                        })}
                        className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                      </button>
                      {errors.confirmPassword && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <NavLink
                      to="/login"
                      className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <IoArrowBack />
                      Back to Login
                    </NavLink>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Next
                      <IoArrowForward />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Second Part - Profile Picture */}
            <div className="w-full flex-shrink-0">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <FaHeadset className="text-white text-2xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">BaatCheet</h1>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                  Profile Picture
                </h2>
                <p className="text-gray-300 mb-8">
                  Add a photo to personalize your account
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center">
                    {/* Image preview */}
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 overflow-hidden transition-all group-hover:border-blue-500">
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                            <FaUser className="text-3xl mb-1" />
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Camera overlay */}
                      <div
                        className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() =>
                          document.getElementById("imageUpload").click()
                        }
                      >
                        <FaCamera className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Custom Upload Button */}
                    <input
                      type="file"
                      id="imageUpload"
                      {...register("profileImage")}
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <button
                      type="button"
                      className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                    >
                      Choose Photo
                    </button>

                    <p className="text-gray-400 text-sm mt-3">
                      Or skip for now
                    </p>
                  </div>

                  <div className="flex gap-3 mt-12">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <IoArrowBack />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Account
                          <IoArrowForward />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Sign in link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;
