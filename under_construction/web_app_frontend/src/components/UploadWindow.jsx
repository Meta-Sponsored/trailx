import React from "react";

const UploadWindow = () => {

    return (
        <div className="w-[416px] h-[943px] px-3 py-6 bg-gradient-to-b from-black to-white rounded-3xl border border-black backdrop-blur-xl flex-col justify-end items-center gap-5 inline-flex">
            <div className="w-4 px-3 py-1 rounded-[41px] border border-black backdrop-blur-sm justify-center items-center gap-2.5 inline-flex" />
            <div className="h-[38px] flex-col justify-end items-center gap-2 flex">
                <div className="h-[38px] flex-col justify-end items-center gap-2 flex">
                    <div className="h-[38px] px-[57px] bg-white bg-opacity-60 rounded-3xl border border-black flex-col justify-end items-center gap-2.5 flex">
                        <div className="py-1 justify-start items-center gap-2 inline-flex">
                            <div className="justify-start items-center gap-2.5 flex">
                                <div className="w-7 h-[30px] justify-end items-center gap-2.5 flex" />
                                <div className="text-zinc-800 text-base font-semibold font-['Poppins']">Report the issues</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[114px] flex-col justify-end items-center gap-2 flex">
                <div className="w-[354px] text-black text-sm font-medium font-['Poppins']">Please describe the issue in detail:</div>
                <div className="w-[354px] h-[85px] px-[18px] py-3 bg-white bg-opacity-60 rounded-3xl border border-black justify-start items-start gap-2.5 inline-flex">
                    <div className="text-zinc-400 text-sm font-normal font-['Poppins']">I found the water machine was broken...</div>
                </div>
            </div>
            <div className="h-[414px] flex-col justify-end items-center gap-2 flex">
                <div className="w-[354px] text-black text-sm font-medium font-['Poppins']">Upload the images or other files:</div>
                <div className="w-[354px] h-[253px] bg-white bg-opacity-60 rounded-[26px] border border-black flex-col justify-center items-center gap-2.5 flex">
                    <div className="h-[219px] px-4 py-5 flex-col justify-center items-center gap-6 flex">
                        <div className="w-[421px] h-[118px] flex-col justify-start items-center gap-3 flex">
                            <div className="w-[46px] h-[46px] relative flex-col justify-start items-start inline-flex">
                                <div className="w-[46px] h-[46px] relative">
                                </div>
                            </div>
                            <div className="flex-col justify-start items-center gap-[15px] flex">
                                <div className="text-center text-zinc-800 text-base font-semibold font-['Poppins']">Choose a file or drag & drop it here</div>
                                <div className="text-center text-gray-400 text-sm font-medium font-['Poppins']">JPEG, PNG, PDG, and MP4 formats, up to 50MB</div>
                            </div>
                        </div>
                        <div className="w-[164px] h-[37px] px-3 py-1 bg-white bg-opacity-60 rounded-3xl border border-black justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-black text-base font-medium font-['Poppins']">Browse File</div>
                        </div>
                    </div>
                </div>
                <div className="w-[354px] h-[124px] bg-white rounded-[26px] border border-black flex-col justify-center items-center gap-2.5 flex">
                    <div className="h-[82.77px] flex-col justify-center items-center gap-5 flex">
                        <div className="justify-end items-start gap-1 inline-flex">
                            <div className="justify-start items-center gap-3 flex">
                                <div className="w-[62.09px] h-[60px] relative">
                                    <div className="w-[62.09px] h-[60px] left-0 top-0 absolute">
                                        <div className="w-[41.86px] h-[24.42px] left-0 top-[26.51px] absolute bg-rose-600 rounded-[7px]" />
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-start gap-4 inline-flex">
                                    <div className="text-zinc-800 text-sm font-medium font-['Poppins']">Water Pump.pdf</div>
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-gray-400 text-sm font-normal font-['Inter']">60 KB of 12O KB •</div>
                                        <div className="justify-center items-start gap-0.5 flex">
                                            <div className="w-6 h-6 relative flex-col justify-start items-start inline-flex" />
                                            <div className="text-zinc-800 text-sm font-normal font-['Inter']">Uploading</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-4 h-4 relative flex-col justify-start items-start inline-flex">
                                <div className="w-4 h-4 relative">
                                </div>
                            </div>
                        </div>
                        <div className="w-[299px] h-[0.93px] relative">
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[357.35px] h-[74px] relative">
                <div className="w-[354px] left-[3.35px] top-0 absolute text-black text-sm font-medium font-['Poppins']">Leave your email to receive updates:</div>
                <div className="w-[354px] h-[45px] px-[18px] py-3 left-0 top-[29px] absolute bg-white bg-opacity-60 rounded-3xl border border-black justify-start items-end gap-2.5 inline-flex">
                    <div className="text-zinc-400 text-sm font-normal font-['Poppins']">12345@gmail.com</div>
                </div>
            </div>
            <div className="w-[357.35px] h-[74px] relative">
                <div className="w-[354px] left-[3.35px] top-0 absolute text-black text-sm font-medium font-['Poppins']">The location of your discovery:</div>
                <div className="w-[354px] h-[45px] px-[18px] py-3 left-0 top-[29px] absolute bg-white bg-opacity-60 rounded-3xl border border-black justify-start items-end gap-2.5 inline-flex">
                    <div className="w-5 h-5 relative" />
                    <div className="text-zinc-400 text-sm font-normal font-['Poppins']">EasTrail , Woodinville, WA, 98004</div>
                </div>
            </div>
            <div className="h-[13px] rounded-md justify-center items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 relative" />
                <div className="text-center text-zinc-900 text-opacity-50 text-xs font-medium font-['Poppins'] leading-snug">Help Centre</div>
            </div>
            <div className="w-[354px] h-12 px-2.5 py-10 bg-black rounded-3xl justify-center items-center gap-2.5 inline-flex">
                <div className="text-white text-lg font-semibold font-['Poppins']">UPLOAD</div>
            </div>
        </div>
    );
};

export default UploadWindow;