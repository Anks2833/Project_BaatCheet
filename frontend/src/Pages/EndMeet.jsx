import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLock } from "react-icons/io";

const EndMeet = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 10000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <div className="Landing-Page w-[100vw] h-screen flex items-start justify-center overflow-hidden">
            <div className='absolute top-6 left-6 flex gap-2 text-white'>
                <h1>{countdown}</h1>
                <h1>Returning to the home page</h1>
            </div>

            <div className='w-[50vw] h-screen flex flex-col items-center justify-start gap-10 pt-10'>
                <div className='flex flex-col gap-1 items-center'>
                    <h1 className='text-3xl text-white'>You left the BaatCheet 🥲</h1>
                    <h1 className='text-white font-extralight'>See you soon!! Anks</h1>
                </div>

                <div className='flex gap-5'>
                    <NavLink to="/video" className='bg-transparent border border-white px-5 py-2 rounded-full text-white hover:bg-black transition-all'>Rejoin</NavLink>
                    <NavLink to="/" className='bg-black text-white border border-white px-5 py-2 rounded-full hover:bg-transparent transition-all'>Return to home screen</NavLink>
                </div>

                <div className='w-[25vw] h-[20vh] rounded-md border flex items-center text-white px-10'>
                    <div className='text-5xl bg-black rounded-full p-3'><IoMdLock /></div>
                    <div className='flex flex-col pl-6'>
                        <h1 className='text-xl'>Your BaatCheet Is Safe</h1>
                        <p className='text-xs'>No one can join the BaatCheet unless invited or admitted by the leader</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EndMeet;
