import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaHeadset } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownVisible(false);
  };

  return (
    <div className="w-full absolute top-0 h-[10vh] flex justify-between px-40 py-12">
      <NavLink
        to="/"
        className="w-fit text-slate-300 text-3xl flex items-center gap-2 cursor-pointer"
      >
        <div className="w-fit text-white">
          <FaHeadset />
        </div>
        <h1 className="text-lg text-white font-bold">BaatCheet</h1>
      </NavLink>

      <div className="flex items-center gap-8 text-lg relative">
        {user ? (
          <div className="relative">
            <div
              className="w-10 h-10 border rounded-full overflow-hidden cursor-pointer"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              {user.profilePic ? (
                <img
                  className="w-full h-full"
                  src={user.profilePic}
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-white" />
              )}
            </div>

            {dropdownVisible && (
              <div className="w-[10vw] absolute top-12 right-0 bg-zinc-200 text-black shadow-lg">
                <button
                  className="px-6 py-2 hover:bg-gray-300 w-full"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className="w-fit text-white flex items-center gap-2 cursor-pointer hover:underline"
            >
              Login
            </NavLink>
            <NavLink
              to="/create"
              className="w-fit text-white flex items-center gap-2 cursor-pointer hover:underline"
            >
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
