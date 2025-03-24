import { NavLink } from "react-router-dom";
import "../Styles/SignInOptions.css";

//React icons
import { FaHeadset } from "react-icons/fa";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

// Enhanced sign-in option component
const SignInWithButton = ({ name, icon, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="signin-option-button flex items-center gap-4 w-full py-4 px-6 hover:bg-gray-50 transition-all"
    >
      <div className={`provider-icon-wrapper ${name.toLowerCase()}`}>
        {icon}
      </div>
      <span className="provider-name font-medium">Continue with {name}</span>
    </button>
  );
};

const SignInOptionsComponent = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/users/google';
  };

  const handleGithubLogin = () => {
    // Implement GitHub login logic here
    console.log("GitHub login not implemented yet");
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
    console.log("Facebook login not implemented yet");
  };

  const signInOptions = [
    { id: 1, name: "Google", icon: <FaGoogle />, onClick: handleGoogleLogin },
    { id: 2, name: "Github", icon: <FaGithub />, onClick: handleGithubLogin },
    { id: 3, name: "Facebook", icon: <FaFacebook />, onClick: handleFacebookLogin }
  ];

  return (
    <div className="signin-options-container w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-xl">
      <div className="card-header bg-white px-6 sm:px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="logo-icon text-blue-600 text-2xl">
            <FaHeadset />
          </div>
          <h1 className="font-semibold text-gray-800 text-xl">BaatCheet</h1>
        </div>
        <h1 className="font-bold text-2xl text-gray-800">Sign-in options</h1>
        <p className="text-gray-500 mt-1 text-sm">Choose how you want to continue</p>
      </div>

      <div className="providers-container divide-y">
        {signInOptions.map((option) => (
          <SignInWithButton 
            key={option.id} 
            name={option.name} 
            icon={option.icon} 
            onClick={option.onClick}
          />
        ))}
      </div>

      <div className="card-footer px-6 py-4 bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>Need help? </span>
          <NavLink to="/contact-support" className="text-blue-600 hover:text-blue-800">Contact support</NavLink>
        </div>
        <NavLink 
          to="/login" 
          className="back-button flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          <IoArrowBackOutline />
          <span>Back to Login</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SignInOptionsComponent;