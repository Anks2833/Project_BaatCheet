import { useState } from "react";
import { NavLink } from "react-router-dom";

// Icons
import { FaHeadset } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Create = () => {
    const [isNext, setIsNext] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Function to handle "Next" button click
    const handleNext = () => {
        setIsNext(true);
    };

    const handleBack = () => {
        setIsNext(false);
    };

    // Function to handle file input change and preview the image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Create image preview URL
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="Auth-Box w-[30vw] h-[70vh] flex flex-col gap-1 relative overflow-hidden">
            <div className="w-full h-full bg-white flex transition-transform duration-500 ease-in-out"
                style={{ transform: isNext ? 'translateX(-100%)' : 'translateX(0)' }}>

                {/* First Part */}
                <div className="w-full h-full bg-white flex flex-col shrink-0">
                    <div className="flex flex-col gap-3 px-10 py-8 text-2xl">
                        <div className="flex items-center gap-2 text-2xl">
                            <div><FaHeadset /></div>
                            <h1 className="font-semibold text-zinc-700">BaatCheet</h1>
                        </div>
                        <h1 className="font-semibold">Create account</h1>
                    </div>
                    <div className="flex justify-center">
                        <form action="">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-center gap-6">
                                    <input className="pt-2 pb-1 bg-transparent outline-none border-b border-b-zinc-900" type="text" placeholder="First Name" />
                                    <input className="pt-2 pb-1 bg-transparent outline-none border-b border-b-zinc-900" type="text" placeholder="Last Name" />
                                </div>
                                <input className="w-[25vw] pt-2 pb-1 bg-transparent outline-none border-b border-b-zinc-900 mx-10" type="email" placeholder="someone@example.com" />
                                <div className="relative">
                                    <input 
                                        className="w-[25vw] pt-2 pb-1 bg-transparent outline-none border-b border-b-zinc-900 mx-10" 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Create Password" 
                                    />
                                    <div className="absolute right-12 top-[0.9vw] text-lg cursor-pointer" onClick={togglePasswordVisibility}>
                                        {showPassword ? <IoEyeOff /> : <IoEye />}
                                    </div>
                                </div>
                                <div className="relative">
                                    <input 
                                        className="w-[25vw] pt-2 pb-1 bg-transparent outline-none border-b border-b-zinc-900 mx-10" 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="Confirm Password" 
                                    />
                                    <div className="absolute right-12 top-[0.9vw] text-lg cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end px-6">
                                <NavLink className="bg-blue-600 text-white px-8 py-1 mt-24 hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer transition-all" to="/login">Back</NavLink>
                                <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-8 py-1 mx-1 mt-24 hover:rounded-tr-3xl hover:rounded-br-3xl cursor-pointer transition-all">Next</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Second Part */}
                <div className="w-full h-full flex flex-col shrink-0 bg-white">
                    <div className="flex flex-col gap-3 px-10 py-8 text-2xl">
                        <div className="flex items-center gap-2 text-2xl">
                            <div><FaHeadset /></div>
                            <h1 className="font-semibold text-zinc-700">BaatCheet</h1>
                        </div>
                        <h1 className="font-semibold">Upload Profile Picture</h1>
                    </div>
                    <div className="flex justify-center mt-8">
                        <form action="">
                            <div className="flex flex-col items-center gap-3">
                                {/* Image preview */}
                                <div className="w-[6vw] h-[6vw] rounded-full border">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <div className="flex justify-center items-center w-full h-full text-gray-400">No Image</div>
                                    )}
                                </div>

                                {/* Custom Upload Button */}
                                <input type="file" id="imageUpload" className="hidden" onChange={handleImageChange} />
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 mt-2 cursor-pointer hover:bg-blue-700 transition-all rounded"
                                    onClick={() => document.getElementById('imageUpload').click()}
                                >
                                    Upload Image
                                </button>
                            </div>

                            <div className="w-full flex justify-end ml-16">
                                <button type="button" onClick={handleBack} className="bg-blue-600 text-white px-8 py-1 mt-24 hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer transition-all">Back</button>
                                {/* <input className="bg-blue-600 text-white px-8 py-1 mx-1 mt-24 hover:rounded-tr-3xl hover:rounded-br-3xl cursor-pointer transition-all" type="submit" value="Create" /> */}
                                <NavLink to="/success" className="bg-blue-600 text-white px-8 py-1 mx-1 mt-24 hover:rounded-tr-3xl hover:rounded-br-3xl cursor-pointer transition-all">Create</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
