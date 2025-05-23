import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLock } from "react-icons/io";

const KickedOutPage = () => {

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
                    <h1 className='text-3xl text-white'>You have been kicked out by Anks ☹️</h1>
                    <h1 className='text-white font-extralight px-24 text-left mt-3 ml-10'>Sorry we decided to kick you out!!</h1>
                </div>

                <div className='flex gap-5'>
                    <NavLink to="/video" className='bg-transparent border border-white px-5 py-2 rounded-full text-white hover:bg-black transition-all'>Request a Rejoin</NavLink>
                    <NavLink to="/" className='bg-black text-white border border-white px-5 py-2 rounded-full hover:bg-transparent transition-all'>Return to home screen</NavLink>
                </div>

            </div>
        </div>
    );

}

export default KickedOutPage