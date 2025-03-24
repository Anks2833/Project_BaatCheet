import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./ForgotPassword.css";

// Icons
import { FaHeadset, FaArrowLeft } from "react-icons/fa";
import { MdEmail, MdOutlineError } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setResetError("");

    try {
      // Replace with your actual API endpoint
      await axios.post("http://localhost:3000/api/users/forgot-password", {
        email: data.email
      });
      
      setResetSuccess(true);
      setEmailSent(data.email);
    } catch (error) {
      console.error("Reset error:", error.response?.data || error.message);
      setResetError(error.response?.data?.message || "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="flex items-center gap-2 mb-6">
              <div className="logo-icon text-blue-600 text-2xl">
                <FaHeadset />
              </div>
              <h1 className="font-semibold text-gray-800 text-xl">BaatCheet</h1>
            </div>

            <h1 className="font-bold text-2xl text-gray-800 headline">Reset your password</h1>
            {!resetSuccess ? (
              <p className="text-gray-500 mt-1 text-sm subtitle">
                Enter your email address and we'll send you a link to reset your password
              </p>
            ) : (
              <p className="text-gray-500 mt-1 text-sm subtitle">
                Check your inbox for the reset link
              </p>
            )}
          </div>

          <div className="auth-form">
            {resetError && (
              <div className="error-message bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm flex items-start">
                <MdOutlineError className="error-icon mr-2 text-lg flex-shrink-0 mt-0.5" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess ? (
              <div className="success-container">
                <div className="success-icon">
                  <IoCheckmarkCircle />
                </div>
                <h2>Email Sent</h2>
                <p>We've sent a password reset link to:<br /><strong>{emailSent}</strong></p>
                <p className="check-spam">If you don't see it in your inbox, please check your spam folder.</p>
                
                <button 
                  onClick={() => {
                    setResetSuccess(false);
                    setEmailSent("");
                  }}
                  className="try-again-button"
                >
                  Try with a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-6">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                    Email Address
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
                          message: "Invalid email address"
                        }
                      })}
                      className={`input-field w-full py-2 px-10 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all`}
                      type="text"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="error-text text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || Object.keys(errors).length > 0}
                  className={`reset-button w-full ${
                    isLoading || Object.keys(errors).length > 0 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-medium py-2.5 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center`}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner mr-2"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center justify-center">
              <NavLink to="/login" className="back-to-login flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                <FaArrowLeft className="text-xs" />
                <span>Back to login</span>
              </NavLink>
            </div>
          </div>
        </div>
        
        <div className="help-text">
          <p>Still having trouble? <NavLink to="/contact-support" className="text-blue-600 hover:underline">Contact Support</NavLink></p>
        </div>
      </div>
      
      <div className="background-elements">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;