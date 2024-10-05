import { useState } from "react";
// Icons
import { RxCross1 } from "react-icons/rx";
import { IoMdPersonAdd, IoMdLock } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

const WelcomeComponent = () => {
    const [isVisible, setIsVisible] = useState(true);
    const meetingLink = "meet.baatcheet.com/your-code-here";


    const handleClose = () => {
        setIsVisible(false);
    };

    
    const handleCopy = () => {
        navigator.clipboard.writeText(meetingLink)
            .then(() => {
                alert("Baatcheet link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    
    if (!isVisible) return null;

    return (
        <div className='fixed bottom-[6vw] left-6 w-[25vw] h-[52vh] bg-zinc-100 rounded-xl p-6 flex flex-col gap-4'>
            <div className="flex justify-between items-center">
                <h1 className="text-lg">Your baatcheet&apos;s ready</h1>
                <div className="p-3 hover:bg-zinc-400/30 rounded-full cursor-pointer" onClick={handleClose}>
                    <RxCross1 />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="w-fit flex items-center gap-2 bg-blue-600 px-5 py-3 text-white rounded-full cursor-pointer">
                    <div><IoMdPersonAdd /></div>
                    <h1 className="font-semibold">Add others</h1>
                </div>

                <p className="text-sm">Share this meeting link with others you&apos;d like to invite to the meeting.</p>

                <div className="flex items-center justify-between bg-zinc-300/40 py-3 px-2 rounded-xl">
                    <h1>{meetingLink}</h1>
                    <div className="p-2 hover:bg-zinc-400/30 rounded-full cursor-pointer" onClick={handleCopy}>
                        <MdContentCopy />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-2xl text-white bg-black rounded-full p-2"><IoMdLock /></div>
                    <p className="text-xs leading-4">Anyone using this BaatCheet link will need your permission to join the meeting.</p>
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <p>Joined as</p>
                    <p className="font-semibold text-green-700">anks@mail.com</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeComponent;