import { IoPersonAddOutline } from "react-icons/io5";
import { FaHeadset, FaMicrophoneAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const PeopleComponent = () => {

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

    // Helper function to determine the text color based on permission
    const getPermissionColor = (permission) => {
        switch (permission) {
            case 'leader':
                return 'text-yellow-100'; // golden
            case 'co-leader':
                return 'text-slate-500'; // silver
            case 'elder':
                return 'text-amber-700'; // bronze
            case 'member':
                return 'text-white'; // white
            default:
                return 'text-white'; // default white
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div>
                <h1 className="text-xl px-4 pt-2">Participants</h1>
            </div>

            <div className="w-fit px-4 py-2 rounded-3xl mt-6 flex items-center gap-2 bg-black border border-transparent hover:border-white hover:bg-zinc-950/50 cursor-pointer transition-all">
                <div><IoPersonAddOutline /></div>
                <button>Add Participants</button>
            </div>

            <div className="relative w-full mt-3">
                <div className="absolute top-[0.6vw] left-[0.6vw] text-white text-xl"><CiSearch /></div>
                <div className="">
                    <input className="w-full h-10 rounded px-10 bg-zinc-800 border border-zinc-600 outline-none" type="text" placeholder="Search for people" />
                </div>
            </div>

            <div className="w-full flex justify-between px-5 text-sm mt-7 mb-3">
                <h1>In BaatCheet</h1>
                <h1>{people.length}</h1>
            </div>

            <div className="p-4 flex flex-col gap-2">
                {people.map(person => (
                    <div key={person.id} className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${person.color} flex items-center justify-center`}><FaHeadset /></div>
                            <h1>{person.name}</h1>
                            <div><FaMicrophoneAlt /></div>
                        </div>

                        <div className="text-left">
                            <h1 className={`capitalize ${getPermissionColor(person.permission)}`}>{person.permission}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PeopleComponent;