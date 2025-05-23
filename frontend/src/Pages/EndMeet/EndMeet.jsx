import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLock } from "react-icons/io";
import { FaVideo, FaHome, FaHandPeace } from "react-icons/fa";
import './EndMeet.css';

const EndMeet = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Start animation after component mounts
        setAnimate(true);
        
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                }
                return prevCountdown - 1;
            });
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
        <div className="end-meet-container">
            <div className={`countdown-banner ${countdown <= 3 ? 'urgent' : ''}`}>
                <div className="countdown-circle">{countdown}</div>
                <p>Returning to the home page in {countdown} second{countdown !== 1 ? 's' : ''}</p>
            </div>

            <div className={`end-meet-content ${animate ? 'animate-in' : ''}`}>
                <div className="end-meet-header">
                    <FaHandPeace className="wave-icon" />
                    <h1>You left the BaatCheet</h1>
                    <p>See you soon! We hope you had a great conversation.</p>
                </div>

                <div className="action-buttons">
                    <NavLink to="/video" className="rejoin-button">
                        <FaVideo />
                        <span>Rejoin</span>
                    </NavLink>
                    <NavLink to="/" className="home-button">
                        <FaHome />
                        <span>Return to home</span>
                    </NavLink>
                </div>

                <div className="security-box">
                    <div className="lock-icon">
                        <IoMdLock />
                    </div>
                    <div className="security-info">
                        <h2>Your BaatCheet Is Secure</h2>
                        <p>No one can join the BaatCheet unless invited or admitted by the meeting organizer.</p>
                    </div>
                </div>

                <div className="feedback-prompt">
                    <p>How was your experience?</p>
                    <div className="rating-buttons">
                        <button className="rating-btn good">👍 Good</button>
                        <button className="rating-btn bad">👎 Bad</button>
                    </div>
                </div>
            </div>

            <div className="background-elements">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        </div>
    );
};

export default EndMeet;