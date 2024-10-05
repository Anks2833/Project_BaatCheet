import { useState } from "react";
import Toggler from "./Toggler";
import { FaHeadset } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import KickModal from "./Modals/KickModal";
import PromoteModal from "./Modals/PromoteModal";

const PrivacyComponent = () => {

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

    const [selectedOption, setSelectedOption] = useState("invite");
    const [modalOpen, setModalOpen] = useState(false);
    const [promoteModalOpen, setPromoteModalOpen] = useState(false);
    const [personToPromote, setPersonToPromote] = useState(null);  // Change from false to null
    const [personToKick, setPersonToKick] = useState(null);

    const handleCheckboxChange = (option) => {
        setSelectedOption(option);
    };

    const openKickModal = (person) => {
        setPersonToKick(person);
        setModalOpen(true);
    };

    const openPromoteModal = (person) => {
        setPersonToPromote(person);  // Set the person to promote
        setPromoteModalOpen(true);   // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false);
        setPersonToKick(null);
    };

    const closePromoteModal = () => {
        setPromoteModalOpen(false);
        setPersonToPromote(null);
    };

    const handleKickConfirm = (personName) => {
        console.log(`Kicking person with name: ${personName}`);
        closeModal();
    };

    const handlePromoteConfirm = (personName) => {
        console.log(`Promoting person with name: ${personName}`);
        closePromoteModal();
    };


    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1 className="text-xl p-3">BaatCheet Controls</h1>
                <p className="px-3 mt-2">Use these settings to keep control of the baatcheet. </p>
                <h1 className="w-full mt-10 text-center border-t border-b border-t-yellow-100 border-b-yellow-100 py-3 text-yellow-100">
                    You are the leader of this baatcheet
                </h1>
            </div>

            <div className="mt-10 pl-5">
                <h1 className="text-xs">LET CO-LEADERS, ELDERS AND MEMBERS</h1>

                <div className="flex flex-col gap-5 mt-5">
                    {/* Share screen */}
                    <div className="flex justify-between items-center px-3">
                        <h1>Share their screen</h1>
                        <div>
                            <Toggler />
                        </div>
                    </div>

                    {/* Send chat messages */}
                    <div className="flex justify-between items-center px-3">
                        <h1>Send chat messages</h1>
                        <div>
                            <Toggler />
                        </div>
                    </div>

                    {/* Turn on mic */}
                    <div className="flex justify-between items-center px-3">
                        <h1>Turn on their microphone</h1>
                        <div>
                            <Toggler />
                        </div>
                    </div>

                    {/* Turn on video */}
                    <div className="flex justify-between items-center px-3">
                        <h1>Turn on their video</h1>
                        <div>
                            <Toggler />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 pl-5">
                <h1 className="text-xs">BAATCHEET ACCESS</h1>

                <div className="flex flex-col gap-5 mt-5">
                    {/* BaatCheet access type */}
                    <div className="flex flex-col px-3">
                        <h1 className="mb-4 text-xl font-semibold">BaatCheet access type</h1>

                        <div className="flex flex-col gap-5">
                            <div>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="w-4 h-4 rounded-full cursor-pointer hover:bg-zinc-300"
                                        type="checkbox"
                                        checked={selectedOption === "anyone"}
                                        onChange={() => handleCheckboxChange("anyone")}
                                    />
                                    <h1>Anyone can join</h1>
                                </div>
                                <p className="text-xs ml-6">
                                    No one has to ask to join. Anyone can dial in.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="w-4 h-4 rounded-full cursor-pointer hover:bg-zinc-300"
                                        type="checkbox"
                                        checked={selectedOption === "invite"}
                                        onChange={() => handleCheckboxChange("invite")}
                                    />
                                    <h1>Invite only</h1>
                                </div>
                                <p className="text-xs ml-6">
                                    People can only join if they are admitted or invited.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Kick participants */}
                    <div className="flex flex-col px-3 mt-4">
                        <h1 className="text-xl">Kick Participants</h1>

                        <p className="text-zinc-500 text-xs mb-3">As a leader you can kick Co-leaders, Elders and Memebers</p>

                        <div className="w-full relative">
                            <div className="w-fit absolute top-6 left-3 text-white text-lg"><CiSearch /></div>
                            <input className="w-full h-10 rounded-full caret-white pl-10 text-white bg-zinc-950 border border-zinc-700 mt-3 outline-none" type="text" placeholder="Search for participants to kick" />
                        </div>

                        <div className="my-5 flex flex-col gap-2">
                            {people.map(person => (
                                <div key={person.id} className="flex justify-between items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full ${person.color} flex items-center justify-center`}><FaHeadset /></div>
                                        <h1>{person.name}</h1>
                                        <button
                                            className={`text-[0.7vw] border border-zinc-700 px-4 py-1 hover:bg-red-600 hover:text-white hover:border-white rounded-md origin-left hover:rotate-3 transition-all ${person.permission === "leader" && "hidden"}`}
                                            onClick={() => openKickModal(person)}
                                        >
                                            Kick
                                        </button>

                                        <button
                                            className={`text-[0.7vw] border border-zinc-700 px-4 py-1 hover:bg-emerald-600 hover:text-white hover:border-white rounded-md origin-left hover:rotate-3 transition-all ${person.permission === "leader" && "hidden"}`}
                                            onClick={() => openPromoteModal(person)}
                                            >
                                            {person.permission != "leader" ? "Promote" : ""}
                                        </button>

                                    </div>

                                    <div className="text-left">
                                        <h1 className="capitalize">{person.permission}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Kick Modal */}
            <KickModal
                isOpen={modalOpen}
                onClose={closeModal}
                onConfirm={handleKickConfirm}
                person={personToKick}
            />

            {/* Promote Modal */}
            <PromoteModal
                isOpen={promoteModalOpen}
                onClose={closePromoteModal}
                onConfirm={handlePromoteConfirm}
                person={personToPromote}
            />

        </div>
    );
};

export default PrivacyComponent;