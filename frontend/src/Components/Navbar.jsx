import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../Styles/Navbar.css";

//Icons
import { FaUserCircle, FaHeadset } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSettings, MdOutlineHelp } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
        console.log("User Profile:", response.data);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownVisible(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar-container w-full absolute top-0 z-[100] flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 py-4 sm:py-6 lg:py-8">
      <NavLink
        to="/"
        className="logo-container w-fit text-slate-300 text-3xl flex items-center gap-2 cursor-pointer"
      >
        <div className="logo-icon w-fit text-white text-2xl sm:text-3xl">
          <FaHeadset />
        </div>
        <h1 className="logo-text text-lg sm:text-xl text-white font-bold">BaatCheet</h1>
      </NavLink>

      {/* Mobile Menu Toggle */}
      <div className="block md:hidden">
        <button 
          className="mobile-menu-toggle text-white text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-lg relative">
        {user ? (
          <div className="profile-dropdown relative" ref={dropdownRef}>
            <div
              className="profile-icon w-10 h-10 border border-gray-400 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={toggleDropdown}
            >
              {user.profilePic ? (
                <img
                  className="w-full h-full object-cover"
                  src={user.profilePic}
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-white" />
              )}
            </div>

            {dropdownVisible && (
              <div className="dropdown-menu w-64 absolute top-12 right-0 bg-white text-black shadow-lg rounded-lg overflow-hidden transition-all">
                <div className="user-info flex items-center gap-3 px-6 py-4 border-b bg-gray-50">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                    {user.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-600" />
                    )}
                  </div>
                  <div className="user-details">
                    <h1 className="font-medium">{user.firstName} {user.lastName}</h1>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="dropdown-items">
                  <button className="dropdown-item px-6 py-3 hover:bg-gray-100 w-full flex items-center gap-3 transition-colors">
                    <div className="text-xl text-gray-700"><MdOutlineSettings /></div>
                    <span>Settings</span>
                  </button>

                  <button className="dropdown-item px-6 py-3 hover:bg-gray-100 w-full flex items-center gap-3 transition-colors">
                    <div className="text-xl text-gray-700"><MdOutlineHelp /></div>
                    <span>Help</span>
                  </button>

                  <button
                    className="dropdown-item px-6 py-3 hover:bg-gray-100 w-full flex items-center gap-3 text-red-600 transition-colors"
                    onClick={handleLogout}
                  >
                    <div className="text-xl"><IoIosLogOut /></div>
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons flex items-center gap-4">
            <NavLink
              to="/login"
              className="auth-button login-button px-4 py-2 text-white rounded-md hover:bg-white/10 transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/create"
              className="auth-button signup-button px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign up
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Menu (Slide-in) */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-xs bg-zinc-900 z-50 shadow-xl flex flex-col transition-transform"
          ref={mobileMenuRef}
        >
          <div className="mobile-menu-header flex justify-between items-center px-6 py-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <FaHeadset className="text-xl text-white" />
              <h2 className="text-white font-bold">BaatCheet</h2>
            </div>
            <button 
              className="text-white text-2xl"
              onClick={toggleMobileMenu}
            >
              <HiX />
            </button>
          </div>
          
          <div className="mobile-menu-content flex-1 flex flex-col">
            {user ? (
              <>
                <div className="user-profile px-6 py-4 border-b border-gray-700 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600">
                    {user.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUserCircle className="w-full h-full text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user.firstName} {user.lastName}</h3>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="menu-items flex flex-col">
                  <button className="mobile-menu-item px-6 py-4 hover:bg-zinc-800 text-white flex items-center gap-3 transition-colors text-left">
                    <div className="text-xl"><MdOutlineSettings /></div>
                    <span>Settings</span>
                  </button>
                  
                  <button className="mobile-menu-item px-6 py-4 hover:bg-zinc-800 text-white flex items-center gap-3 transition-colors text-left">
                    <div className="text-xl"><MdOutlineHelp /></div>
                    <span>Help</span>
                  </button>
                  
                  <button
                    className="mobile-menu-item px-6 py-4 hover:bg-zinc-800 text-white flex items-center gap-3 transition-colors text-left"
                    onClick={handleLogout}
                  >
                    <div className="text-xl"><IoIosLogOut /></div>
                    <span>Log out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-mobile-buttons flex flex-col gap-3 px-6 py-6">
                <NavLink
                  to="/login"
                  className="w-full py-3 text-center bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/create"
                  className="w-full py-3 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;