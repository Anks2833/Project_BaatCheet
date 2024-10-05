import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaHeadset } from "react-icons/fa";
import { IoIosCloudDone } from "react-icons/io";

const SuccesComponent = () => {
    const [timer, setTimer] = useState(5); // State for countdown timer
    const navigate = useNavigate();

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1); // Decrease timer by 1 every second
        }, 1000);

        const redirectTimeout = setTimeout(() => {
            navigate('/'); // Redirect after 5 seconds
        }, 5000);

        // Cleanup both the interval and timeout
        return () => {
            clearInterval(countdown);
            clearTimeout(redirectTimeout);
        };
    }, [navigate]);

    return (
        <div className="Auth-Box w-[30vw] h-[50vh] flex flex-col gap-1">
            <div className="w-full h-full bg-white flex flex-col">
                {/* The logo */}
                <div className="flex flex-col gap-3 px-10 py-8 text-2xl">
                    <div className="flex items-center gap-2 text-2xl">
                        <div><FaHeadset /></div>
                        <h1 className="font-semibold text-zinc-700">BaatCheet</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-3">
                    <div className='text-5xl'><IoIosCloudDone /></div>
                    <h1 className='text-2xl'>Success</h1>
                    <p className='text-[0.7vw] text-center px-10'>
                        Congratulations! You have successfully registered on our website. 
                        Welcome aboard! Your account is now active, and you can enjoy all the features and benefits our platform offers.
                    </p>
                </div>

                <div className="flex items-center gap-1 text-sm ml-36 my-16">
                    <h1>Please wait</h1>
                    <NavLink to="/create" className="text-blue-600 cursor-pointer">
                        Redirecting in {timer}s
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default SuccesComponent;
