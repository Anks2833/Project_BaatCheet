import { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";

// Icons
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const LandingPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Function to handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false); // Close the dropdown
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Clean up the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="Landing-Page w-[100vw] h-screen flex overflow-hidden">
            <div className="w-1/2 h-screen flex flex-col items-start px-20 justify-center">
                <h1 className="text-5xl font-extrabold text-white">Connect and Collaborate Effortlessly with BaatCheet</h1>
                <p className="pt-6 text-xl text-white font-light">
                    BaatCheet is your all-in-one video chat platform designed to bring seamless communication to teams and individuals. BaatCheet empowers you to connect, collaborate, and share ideas with ease.
                </p>
            </div>

            <div className="w-1/2 h-screen flex flex-col gap-6 items-start pt-72">
                <div>
                    <h1 className="text-3xl px-32 text-white">Video calls and meetings for everyone</h1>
                    <p className="text-lg px-32 text-zinc-300">Connect, collaborate, and celebrate from anywhere with BaatCheet</p>
                </div>

                <div className="w-full flex items-center justify-around px-32">
                    {/* New Meeting Button with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={toggleDropdown}
                            className="w-fit flex items-center gap-1 bg-zinc-900 hover:bg-zinc-950 text-white px-6 py-2 rounded-md cursor-pointer"
                        >
                            <div className="text-xl"><MdOutlineOndemandVideo /></div>
                            <h1 className="text-lg">New Baatcheet</h1>
                        </div>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white text-zinc-900 shadow-lg">
                                <NavLink
                                    to="/video"
                                    className="px-4 py-2 flex items-center text-sm gap-3 hover:bg-zinc-100 cursor-pointer"
                                >
                                    <div><FaPlus /></div>
                                    <h1>Instant Baatcheet</h1>
                                </NavLink>
                                <div
                                    className="px-4 py-2 flex items-center text-sm gap-3 hover:bg-zinc-100 cursor-pointer"
                                    onClick={() => alert('Scheduling Meeting')}
                                >
                                    <div><SlCalender /></div>
                                    <h1>Scheduled Baatcheet</h1>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-fit relative">
                        <input
                            className="w-[15vw] h-[6vh] px-10 outline-none border border-black rounded-lg"
                            type="text"
                            placeholder="Enter code"
                            value={inputValue}
                            onChange={handleInputChange} // Update input value on change
                        />
                        <div className="absolute top-[0.65vw] left-2 text-zinc-600 text-2xl">
                            <FaKeyboard />
                        </div>
                    </div>

                    {/* Join Button */}
                    <button
                        className={`text-xl px-6 py-1 rounded-lg transition-all ${
                            inputValue
                                ? 'hover:bg-gray-950 text-white cursor-pointer'
                                : 'bg-transparent text-slate-500 cursor-not-allowed'
                        }`}
                        disabled={!inputValue}
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;