import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React, { useState } from "react";

const UploadWindow = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState('Report the issues');
    const handleClose = () => setIsOpen(false);
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const handleFileChange = (event) => {
        const files = event.target.files;
        // Process or store the files as needed
        console.log(files);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({ email, location, issueDescription });
      
        try {
          await addDoc(collection(db, 'feedbacks'), {
            email,
            location,
            issueDescription,
            createdAt: serverTimestamp(),
          });
      
          console.log('Feedback submitted successfully');
          onClose();
          // Close the modal or reset form as needed
        } catch (error) {
          console.error('Error writing document: ', error);
        }
      };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-6">
            <form onSubmit={handleSubmit} className="w-[416px] h-auto px-3 py-6 bg-white bg-opacity-10 rounded-3xl border border-black backdrop-blur-xl flex flex-col justify-start items-center overflow-hidden">
                <div className="absolute top-3.5 right-3.5 w-3 h-3">
                    <button onClick={onClose} className="w-full h-full flex justify-center items-center p-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto overflow-x-hidden">
                    <div className="relative inline-flex w-[354px]">
                        <button
                            className="px-3 py-1 w-full bg-white bg-opacity-60 rounded-3xl border border-black flex justify-center items-center"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="text-zinc-800 text-base font-semibold font-poppins ">{currentSelection}</span> {/* Display the current selection */}
                            {/* Optional: Include an icon or element here to indicate dropdown functionality */}
                        </button>
                        {isOpen && (
                            <div className="absolute w-full px-[57px] mt-2 flex flex-col items-start bg-white bg-opacity-60 rounded-3xl border border-black">
                                {/* Example of changing the selection. Duplicate and modify for other options. */}
                                <div
                                    className="w-full py-1 flex items-center gap-2.5 cursor-pointer hover:bg-gray-100 rounded-lg justify-center"
                                    onClick={() => {
                                        setCurrentSelection('Report the issues'); // Update the current selection
                                        setIsOpen(false); // Close the dropdown
                                    }}
                                >
                                    <div className="text-zinc-800 text-base font-semibold font-poppins ">Report the issues</div>
                                </div>
                                {/* Add more dropdown items here as needed, each with their own onClick to set the currentSelection */}
                                {/* Additional selections can be duplicated with different content as needed */}
                            </div>
                        )}
                    </div>

                    <div className="mt-[20px] h-[114px] flex flex-col justify-end items-center gap-2 flex">
                        <div className="w-[354px] text-black text-sm font-medium font-['Poppins']">Please describe the issue in detail:</div>
                        <textarea className="w-[354px] h-[85px] px-4 py-3 bg-white bg-opacity-60 rounded-3xl border border-black text-zinc-400 text-sm font-normal placeholder-zinc-400 align-top resize-none" placeholder="I found the water machine was broken..." 
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)} />
                    </div>
                    <div className="mt-[20px] h-[282px] flex flex-col justify-start items-center gap-2">
                        <div className="w-[354px] text-black text-sm font-medium font-poppins">Upload the images or other files:</div>
                        <div className="w-[354px] h-[253px] bg-white bg-opacity-60 rounded-[26px] border border-black flex flex-col justify-center items-center gap-2.5">
                            <label className="h-[219px] w-full px-4 py-5 flex flex-col justify-center items-center gap-6 cursor-pointer">
                                <input type="file" className="w-0 h-0" accept="image/jpeg,image/png,application/pdf,video/mp4" multiple onChange={handleFileChange} />

                                <div className="w-[421px] h-[118px] flex flex-col justify-start items-center gap-3">
                                    <div className="text-center text-zinc-800 text-base font-semibold font-poppins">Choose a file or drag & drop it here</div>
                                    <div className="text-center text-gray-400 text-sm font-medium font-poppins">JPEG, PNG, PDF, and MP4 formats, up to 50MB</div>
                                </div>
                                <div className="w-[164px] h-[37px] px-3 py-1 bg-white bg-opacity-60 rounded-3xl border border-black flex justify-center items-center gap-2.5">
                                    <span className="text-center text-black text-base font-medium font-poppins">Browse File</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className=" mt-[20px] w-[357.35px] h-[74px] relative">
                        <label className="absolute w-[354px] left-[3.35px] top-0 text-black text-sm font-medium font-poppins">Leave your email to receive updates:</label>
                        <input
                            type="email"
                            className="w-[354px] h-[45px] px-4 py-3 absolute left-0 top-[29px] bg-white bg-opacity-60 rounded-3xl border border-black text-zinc-400 text-sm font-normal font-poppins"
                            placeholder="12345@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mt-[20px] w-[357.35px] h-[74px] relative">
                        <label className="absolute w-[354px] left-[3.35px] top-0 text-black text-sm font-medium font-poppins">The location of your discovery:</label>
                        <input
                            type="text"
                            className="w-[354px] h-[45px] px-4 py-3 absolute left-0 top-[29px] bg-white bg-opacity-60 rounded-3xl border border-black text-zinc-400 text-sm font-normal font-poppins"
                            placeholder="EasTrail, Woodinville, WA, 98004"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} 
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-[20px] w-[354px] h-10 px-2.5 py-2 bg-black rounded-3xl flex justify-center items-center gap-2.5 text-white text-lg font-semibold font-poppins"
                    >
                        UPLOAD
                    </button>

                </div>
            </form>
        </div>
    );
};

export default UploadWindow;