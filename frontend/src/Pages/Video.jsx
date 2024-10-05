//Imports
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Icons
import { FaHeadset, FaMicrophoneAlt, FaVideo, FaHandPaper, FaInfoCircle, FaUserLock } from "react-icons/fa";
import { MdOutlinePresentToAll } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { IoPeople, IoChatboxEllipses } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


//Components
import WelcomeComponent from "../Components/WelcomeComponent";
import InfoComponent from "../Components/InfoComponent";
import PeopleComponent from "../Components/PeopleComponent";
import ChatComponent from "../Components/ChatComponent";
import PrivacyComponent from "../Components/PrivacyComponent";


const Video = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeIcon, setActiveIcon] = useState("")

  const people = [
    { id: 1, name: 'Anks', color: 'bg-red-600', micStatus: "on", permission: "leader" },
    { id: 2, name: 'John', color: 'bg-blue-600', micStatus: "off", permission: "co-leader" },
    { id: 3, name: 'Sarah', color: 'bg-green-600', micStatus: "on", permission: "elder" },
    { id: 4, name: 'Frank', color: 'bg-yellow-600', micStatus: "off", permission: "member" },
    { id: 5, name: 'Emma', color: 'bg-purple-600', micStatus: "on", permission: "elder" },
    { id: 6, name: 'Jane', color: 'bg-orange-600', micStatus: "off", permission: "member" },
    { id: 7, name: 'Hank', color: 'bg-pink-600', micStatus: "on", permission: "member" },
    { id: 8, name: 'David', color: 'bg-teal-600', micStatus: "on", permission: "co-leader" },
    { id: 9, name: 'Bob', color: 'bg-indigo-600', micStatus: "off", permission: "member" },
    { id: 10, name: 'Sophia', color: 'bg-cyan-600', micStatus: "on", permission: "elder" }
  ];

  const toggleSidebar = (icon) => {
    if (activeIcon === icon) {
      setIsSidebarOpen(false);
      setActiveIcon("");
    } else {
      setIsSidebarOpen(true);
      setActiveIcon(icon);
    }
  };

  const renderSidebarContent = () => {
    switch (activeIcon) {
      case 'info':
        return (
          <div className="w-full">
            <InfoComponent />
          </div>
        );

      case 'people':
        return (
          <div className="w-full">
            <PeopleComponent />
          </div>
        );

      case 'chat':
        return (
          <div className="w-full">
            <ChatComponent />
          </div>
        );

      case 'privacy':
        return (
          <div className="w-full">
            <PrivacyComponent />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={`Video-Component w-full min-h-screen bg-zinc-900 py-10 pb-24 flex flex-wrap justify-center gap-3 transition-all duration-300 ${isSidebarOpen ? 'pl-[19vw]' : ''}`}>
        {people.map(person => (
          <div key={person.id} className={`relative w-[30vw] h-[20vw] ${person.color} rounded-2xl flex items-center justify-center ${isSidebarOpen ? 'transform -translate-x-[25vw]' : ''}`}>
            <div className="text-6xl text-white">
              <FaHeadset />
            </div>
            <div className="w-full px-12 absolute bottom-5 flex justify-between items-center text-white">
              <h1 className="text-xl bg-zinc-950/30 px-6 py-1">{person.name}</h1>
              <div className="text-xl cursor-pointer"><FaMicrophoneAlt /></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Control Bar */}
      <div className="fixed bottom-0 w-full h-[10vh] bg-black flex items-center justify-around text-white">
        {/* Name, Time, Code */}
        <div className="flex flex-col">
          <h1 className="text-xl">Anks</h1>
          <div className="flex items-center gap-2">
            <h1>12:45 AM</h1>
            <h1>|</h1>
            <h1>your-code-here</h1>
          </div>
        </div>

        {/* Mic and video controller */}
        <div className="flex items-center gap-3">
          <div className="w-fit bg-zinc-800/50 hover:bg-zinc-700 p-4 rounded-full cursor-pointer text-lg"><FaMicrophoneAlt /></div>
          <div className="w-fit bg-zinc-800/50 hover:bg-zinc-700 p-4 rounded-full cursor-pointer text-lg"><FaVideo /></div>
          <div className="w-fit bg-zinc-800/50 hover:bg-zinc-700 p-4 rounded-full cursor-pointer text-lg"><MdOutlinePresentToAll /></div>
          <div className="w-fit bg-zinc-800/50 hover:bg-zinc-700 p-4 rounded-full cursor-pointer text-lg"><FaHandPaper /></div>
          <NavLink to="/end-meet" className="w-fit bg-red-600 hover:bg-red-500 px-6 py-4 rounded-full cursor-pointer text-lg"><ImPhoneHangUp /></NavLink>
        </div>

        {/* Privacy controller */}
        <div className="flex items-center gap-3">
          <div onClick={() => toggleSidebar('info')} className={`w-fit p-4 rounded-full cursor-pointer text-lg ${activeIcon === 'info' ? 'bg-zinc-400/30' : 'hover:bg-zinc-800'}`}><FaInfoCircle /></div>
          <div onClick={() => toggleSidebar('people')} className={`relative w-fit p-4 rounded-full cursor-pointer text-lg ${activeIcon === 'people' ? 'bg-zinc-400/30' : 'hover:bg-zinc-800'}`}>
            <IoPeople />
            <div className="absolute w-fit top-0 left-8 text-xs"><h1 className="bg-zinc-500/50 p-1 rounded-full">{people.length}</h1></div>
          </div>
          <div onClick={() => toggleSidebar('chat')} className={`w-fit p-4 rounded-full cursor-pointer text-lg ${activeIcon === 'chat' ? 'bg-zinc-400/30' : 'hover:bg-zinc-800'}`}><IoChatboxEllipses /></div>
          <div onClick={() => toggleSidebar('privacy')} className={`w-fit p-4 rounded-full cursor-pointer text-lg ${activeIcon === 'privacy' ? 'bg-zinc-400/30' : 'hover:bg-zinc-800'}`}><FaUserLock /></div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`fixed top-0 right-0 h-[84vh] w-[27vw] mt-10 bg-zinc-800 text-white rounded-3xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? '-translate-x-2' : 'translate-x-full'} overflow-scroll`}>
        <div className="relative p-4 flex justify-between items-center">
          {renderSidebarContent()}
          <button
            onClick={() => {
              setIsSidebarOpen(false); // Close sidebar
              setActiveIcon(""); // Reset active icon
            }}
            className="w-fit absolute top-5 right-5 hover:bg-zinc-400/50 p-2 rounded-full text-xl"
          >
            <RxCross1 />
          </button>
        </div>
      </div>

      {/* The welcome component */}
      <div>
        <WelcomeComponent />
      </div>
    </>
  );
};

export default Video;