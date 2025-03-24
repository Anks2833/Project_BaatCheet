import { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import "../Styles/LandingPage.css";

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
        <div className="landing-page w-[100vw] h-screen flex flex-col md:flex-row overflow-hidden">
            <div className="left-section w-full md:w-1/2 h-auto md:h-screen flex flex-col items-center md:items-start px-6 sm:px-10 md:px-20 justify-center py-10 md:py-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center md:text-left heading-animation">
                    Connect and Collaborate Effortlessly with <span className="gradient-text">BaatCheet</span>
                </h1>
                <p className="pt-4 md:pt-6 text-base sm:text-lg md:text-xl text-white font-light text-center md:text-left fade-in-animation">
                    BaatCheet is your all-in-one video chat platform designed to bring seamless communication to teams and individuals. BaatCheet empowers you to connect, collaborate, and share ideas with ease.
                </p>
                
                <div className="hidden md:block absolute left-0 top-0 blob-shape"></div>
            </div>

            <div className="right-section w-full md:w-1/2 h-auto md:h-screen flex flex-col gap-4 md:gap-6 items-center md:items-start pt-8 md:pt-72">
                <div className="slide-in-animation">
                    <h1 className="text-2xl sm:text-3xl px-6 sm:px-12 md:px-32 text-white text-center md:text-left">Video calls and meetings for everyone</h1>
                    <p className="text-base sm:text-lg px-6 sm:px-12 md:px-32 text-zinc-300 text-center md:text-left">Connect, collaborate, and celebrate from anywhere with BaatCheet</p>
                </div>

                <div className="controls-container w-full flex flex-col sm:flex-row items-center justify-center sm:justify-around px-6 sm:px-12 md:px-32 gap-4 sm:gap-2 fade-in-animation">
                    {/* New Meeting Button with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={toggleDropdown}
                            className="new-meeting-btn w-fit flex items-center gap-1 bg-zinc-900 hover:bg-zinc-950 text-white px-4 sm:px-6 py-3 rounded-lg cursor-pointer transition-all"
                        >
                            <div className="text-xl"><MdOutlineOndemandVideo /></div>
                            <h1 className="text-base sm:text-md">New Baatcheet</h1>
                        </div>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="dropdown-menu absolute top-full left-0 mt-2 bg-white text-zinc-900 shadow-xl z-10 rounded-lg overflow-hidden">
                                <NavLink
                                    to="/video"
                                    className="dropdown-item px-4 py-3 flex items-center text-sm gap-3 hover:bg-zinc-100 cursor-pointer transition-all"
                                >
                                    <div className="icon-container"><FaPlus /></div>
                                    <h1 className='text-base sm:text-md'>Instant Baatcheet</h1>
                                </NavLink>
                                <div
                                    className="dropdown-item px-4 py-3 flex items-center text-sm gap-3 hover:bg-zinc-100 cursor-pointer transition-all"
                                    onClick={() => alert('Scheduling Meeting')}
                                >
                                    <div className="icon-container"><SlCalender /></div>
                                    <h1 className='text-base sm:text-md'>Scheduled Baatcheet</h1>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="input-container w-fit relative">
                        <input
                            className="code-input w-[80vw] sm:w-[30vw] md:w-[15vw] h-[6vh] px-10 outline-none border border-zinc-700 focus:border-blue-500 rounded-lg bg-zinc-900/50 text-white transition-all"
                            type="text"
                            placeholder="Enter code"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <div className="input-icon absolute top-1/2 transform -translate-y-1/2 left-3 text-zinc-400 text-lg">
                            <FaKeyboard />
                        </div>
                    </div>

                    {/* Join Button */}
                    <button
                        className={`join-button text-lg px-6 py-2 rounded-lg transition-all ${
                            inputValue
                                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transform hover:scale-105'
                                : 'bg-zinc-800 text-slate-500 cursor-not-allowed'
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