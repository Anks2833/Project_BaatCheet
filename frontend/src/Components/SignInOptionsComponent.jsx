import { NavLink } from "react-router-dom";
import "../Styles/SignInOptions.css";

//React icons
import { FaHeadset } from "react-icons/fa";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { IoArrowBackOutline, IoShieldCheckmark } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

// Enhanced sign-in option component
const SignInWithButton = ({ name, icon, onClick, delay }) => {
  const getProviderColor = (provider) => {
    switch (provider.toLowerCase()) {
      case "google":
        return "hover:border-red-500/30 hover:bg-red-500/10";
      case "github":
        return "hover:border-gray-400/30 hover:bg-gray-400/10";
      case "facebook":
        return "hover:border-blue-500/30 hover:bg-blue-500/10";
      default:
        return "hover:border-white/30 hover:bg-white/10";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`signin-option-button group relative w-full py-4 px-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl transition-all duration-300 overflow-hidden ${getProviderColor(
        name
      )} fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      <div className="relative flex items-center gap-4">
        <div
          className={`provider-icon-wrapper ${name.toLowerCase()} text-2xl transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
        <span className="provider-name font-medium text-white">
          Continue with {name}
        </span>
        <div className="ml-auto text-gray-400 transform translate-x-0 group-hover:translate-x-2 transition-transform">
          →
        </div>
      </div>
    </button>
  );
};

const SignInOptionsComponent = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/users/google";
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
    {
      id: 1,
      name: "Google",
      icon: <FaGoogle className="text-red-500" />,
      onClick: handleGoogleLogin,
    },
    {
      id: 2,
      name: "Github",
      icon: <FaGithub className="text-gray-300" />,
      onClick: handleGithubLogin,
    },
    {
      id: 3,
      name: "Facebook",
      icon: <FaFacebook className="text-blue-500" />,
      onClick: handleFacebookLogin,
    },
  ];

  return (
    <div className="signin-options-page min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob-shape-1"></div>
        <div className="blob-shape-2"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="signin-options-container glass-effect rounded-2xl overflow-hidden fade-in-up">
          <div className="card-header px-6 sm:px-8 py-8">
            <div className="flex items-center gap-3 mb-8 fade-in">
              <div className="logo-icon p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-lg">
                <FaHeadset />
              </div>
              <h1 className="font-bold text-white text-2xl">BaatCheet</h1>
            </div>

            <h1 className="font-bold text-3xl text-white mb-2 heading-animation">
              Sign-in options
            </h1>
            <p className="text-gray-300 text-sm fade-in">
              Choose your preferred method to continue
            </p>
          </div>

          <div className="providers-container px-6 sm:px-8 pb-6 space-y-3">
            {signInOptions.map((option, index) => (
              <SignInWithButton
                key={option.id}
                name={option.name}
                icon={option.icon}
                onClick={option.onClick}
                delay={index * 100 + 200}
              />
            ))}
          </div>

          {/* Security badge */}
          <div
            className="security-info mx-6 mb-6 p-4 bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-lg fade-in"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex items-center gap-3">
              <IoShieldCheckmark className="text-green-400 text-xl" />
              <div>
                <p className="text-green-400 text-sm font-medium">
                  Secure Authentication
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Your data is encrypted and secure
                </p>
              </div>
            </div>
          </div>

          <div className="divider-container px-6 mb-6">
            <div className="divider"></div>
            <span className="divider-text text-gray-400 text-sm px-4">OR</span>
            <div className="divider"></div>
          </div>

          <div className="card-footer px-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <BiSupport className="text-lg" />
                <span>Need help? </span>
                <NavLink
                  to="/contact-support"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Contact support
                </NavLink>
              </div>

              <NavLink
                to="/login"
                className="back-button group flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <IoArrowBackOutline className="transform group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Login</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Additional options */}
        <div
          className="mt-6 text-center fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/create"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign up for free
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInOptionsComponent;
