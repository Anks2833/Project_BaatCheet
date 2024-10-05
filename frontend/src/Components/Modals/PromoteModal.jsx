import { useState } from "react";

const PromoteModal = ({ isOpen, onClose, onConfirm, person }) => {

    if (!isOpen) return null;

    return (
        // Full-page overlay
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            {/* Modal box taking up full height */}
            <div className="w-full h-[280vh] bg-zinc-950/90 flex flex-col items-center justify-end pb-60">
                <p className="text-white mb-4 text-xl">Promote <span className="text-emerald-600 font-semibold">{person?.name}</span>?</p>

                <div className="flex gap-5">
                    <button className="failure-btn px-4 py-2 text-white rounded-md" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="success-btn px-4 py-2 text-white rounded-md" onClick={() => onConfirm(person?.name)}>
                        Promote
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromoteModal