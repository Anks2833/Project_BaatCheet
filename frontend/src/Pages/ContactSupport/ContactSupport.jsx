import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./ContactSupport.css";

// Icons
import { FaHeadset, FaArrowLeft, FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineError, MdSubject, MdMessage } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";

const ContactSupport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange"
  });

  const supportTopics = [
    "Account Issues",
    "Technical Problems",
    "Payment Questions",
    "Feature Request",
    "Bug Report",
    "Other"
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // This would be your actual API endpoint
      // For demo purposes, I'm using a timeout to simulate API call
      // await axios.post("http://localhost:3000/api/support/contact", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Clear form
      reset();
    } catch (error) {
      console.error("Support request error:", error.response?.data || error.message);
      setSubmitError(error.response?.data?.message || "Failed to send support request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-support-container">
      <div className="contact-support-wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="flex items-center gap-2 mb-6">
              <div className="logo-icon text-blue-600 text-2xl">
                <FaHeadset />
              </div>
              <h1 className="font-semibold text-gray-800 text-xl">BaatCheet</h1>
            </div>

            <h1 className="font-bold text-2xl text-gray-800 headline">Contact Support</h1>
            {!submitSuccess ? (
              <p className="text-gray-500 mt-1 text-sm subtitle">
                Fill out the form below and our team will get back to you shortly
              </p>
            ) : (
              <p className="text-gray-500 mt-1 text-sm subtitle">
                Thank you for contacting us
              </p>
            )}
          </div>

          <div className="auth-form">
            {submitError && (
              <div className="error-message bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm flex items-start">
                <MdOutlineError className="error-icon mr-2 text-lg flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess ? (
              <div className="success-container">
                <div className="success-icon">
                  <IoCheckmarkCircle />
                </div>
                <h2>Request Submitted</h2>
                <p>Thank you for contacting BaatCheet support!</p>
                <p className="response-time">
                  We've received your request and will respond within <strong>24 hours</strong>.
                </p>
                
                <div className="support-contact-info">
                  <div className="support-contact-item">
                    <RiCustomerService2Fill className="support-contact-icon" />
                    <div>
                      <h3>Need immediate help?</h3>
                      <p>Call us at <strong>+1 (555) 123-4567</strong></p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="new-request-button"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="input-icon-wrapper">
                        <FaUser className="input-icon text-gray-400" />
                      </div>
                      <input
                        id="name"
                        {...register("name", { 
                          required: "Name is required"
                        })}
                        className={`input-field w-full py-2 px-10 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all`}
                        type="text"
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && (
                      <p className="error-text text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
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
                        placeholder="Your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="error-text text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 block mb-1">
                    What do you need help with?
                  </label>
                  <div className="relative">
                    <div className="input-icon-wrapper">
                      <MdSubject className="input-icon text-gray-400" />
                    </div>
                    <select
                      id="subject"
                      {...register("subject", { 
                        required: "Please select a topic"
                      })}
                      className={`input-field w-full py-2 px-10 border ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all appearance-none`}
                    >
                      <option value="">Select a topic</option>
                      {supportTopics.map((topic, index) => (
                        <option key={index} value={topic}>{topic}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                  {errors.subject && (
                    <p className="error-text text-red-500 text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div className="form-group mb-6">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 block mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <div className="textarea-icon-wrapper">
                      <MdMessage className="input-icon text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      {...register("message", { 
                        required: "Please provide details about your issue",
                        minLength: {
                          value: 20,
                          message: "Please provide more details (at least 20 characters)"
                        }
                      })}
                      className={`textarea-field w-full py-2 pl-10 pr-3 border ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all`}
                      rows="5"
                      placeholder="Please describe your issue in detail..."
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="error-text text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="form-actions flex justify-between items-center">
                  <NavLink
                    to="/"
                    className="back-button flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-all text-gray-600"
                  >
                    <FaArrowLeft className="text-xs" />
                    <span>Back</span>
                  </NavLink>
                  
                  <button
                    type="submit"
                    disabled={isLoading || Object.keys(errors).length > 0}
                    className={`submit-button ${
                      isLoading || Object.keys(errors).length > 0 
                        ? "bg-blue-400 cursor-not-allowed" 
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white font-medium py-2.5 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center`}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner mr-2"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div className="help-text">
          <p>For urgent matters, please call our support line at <strong>+1 (555) 123-4567</strong></p>
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

export default ContactSupport;