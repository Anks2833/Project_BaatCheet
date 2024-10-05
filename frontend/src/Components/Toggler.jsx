import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Toggler = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggleSwitch = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className="w-full flex justify-center items-center">
            {/* Toggle Container */}
            <div
                onClick={toggleSwitch}
                className={`toggler relative w-[4vw] h-8 rounded-full cursor-pointer transition-colors duration-300 ${isToggled ? 'bg-blue-500' : 'bg-red-500'
                    }`}
            >
                {/* Toggle Thumb */}
                <div
                    className={`thumb absolute top-1 left-1 w-[1.5vw] h-6 bg-zinc-200 rounded-full transition-all duration-300 flex items-center justify-center ${isToggled ? 'translate-x-[2vw]' : 'translate-x-0'
                        }`}
                >
                    {isToggled ? <IoCheckmark className="text-black" /> : <RxCross1 className="text-black" />}
                </div>
            </div>
        </div>
    );
};

export default Toggler