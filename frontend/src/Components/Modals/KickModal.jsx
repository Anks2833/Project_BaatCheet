import { useState } from "react";

const KickModal = ({ isOpen, onClose, onConfirm, person }) => {

    const [textAreaValue, setTextAreaValue] = useState("Sorry we decided to kick you out!!");

    const handleTextAreaValue = (event) => {
        setTextAreaValue(event.target.value); // Properly updating state from the textarea value
    }

    if (!isOpen) return null;

    return (
        // Full-page overlay
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            {/* Modal box taking up full height */}
            <div className="w-full h-[280vh] bg-zinc-950/90 flex flex-col items-center justify-end pb-60">
                <h1 className="text-white mb-4 text-xl">Kick Out: <span className="text-red-600 font-semibold">{person?.name}</span>?</h1>

                <div>
                    <textarea 
                        cols={40} 
                        rows={6} 
                        value={textAreaValue} // Set the default value from state
                        onChange={handleTextAreaValue} // Proper onChange handler
                        className="mt-3 mb-2 rounded-2xl resize-none outline-none bg-zinc-800 border border-zinc-600 pl-5 pt-5">
                    </textarea>
                </div>

                <div className="flex gap-5">
                    <button className="failure-btn px-4 py-2 text-white rounded-md" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="success-btn px-4 py-2 text-white rounded-md" onClick={() => onConfirm(person?.name)}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KickModal;