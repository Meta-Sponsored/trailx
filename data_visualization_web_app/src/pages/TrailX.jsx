import React from 'react';

// Import icons.
import { BsCurrencyDollar } from 'react-icons/bs';
import { BsFillCircleFill } from "react-icons/bs";
import { IoIosMore } from 'react-icons/io';
import product9 from '../data/product9.jpg';

// Import components.
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';

// Import the data for the main page.
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { realtimeData } from '../data/real-time-analysis'
import { weeklySparklineAreaData } from '../data/weekly-analysis'

// Import the current states.
import { useStateContext } from '../contexts/ContextProvider';

const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
        <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
);

const TrailX = () => {
    const { currentColor, currentMode } = useStateContext();

    return (
        <div className='mt-12'>
            {/* To render the general layout for the hero and the card layouts. */}
            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                {/* To render the hero layout of the main page. */}
                <div className='h-44 w-full lg:w-80 p-8 pt-9 m-3
                rounded-xl bg-none bg-no-repeat bg-cover bg-center
                bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'>
                    {/* To render the text in the hero section. */}
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='font-bold text-gray-400'>
                                Today
                            </p>
                            <p className='text-2xl'>
                                347 users
                            </p>
                        </div>
                    </div>
                    {/* To render a button in the hero section. */}
                    <div className='mt-6'>
                        <Button
                            color='white'
                            bgColor={currentColor}
                            text='Download'
                            borderRadius='10px'
                            size='md'
                        />
                    </div>
                </div>
                {/* To render the card layout of the main page. */}
                <div className='flex flex-wrap m-3 gap-3 justify-center items-center'>
                    {realtimeData.map((item) => (
                        <div
                            key={item.title}
                            className='p-4 pt-9 md:w-56
                            rounded-2xl bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'
                        >
                            <button type='button'
                                style={{
                                    color: item.iconColor,
                                    backgroundColor: item.iconBg
                                }}
                                className='p-4 
                                text-2xl opacity-90 rounded-full
                                hover:drop-shadow-xl'>
                                {item.icon}
                            </button>
                            <p className='mt-3'>
                                <span className='text-lg font-semibold'>
                                    {item.amount}
                                </span>
                                <span className={`ml-2 
                                    text-sm text-${item.pcColor}`}>
                                    {item.percentage}
                                </span>
                            </p>
                            <p className='mt-1 
                                text-sm text-gray-400'>
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* To render a big card layout for the syncfusion data visualization component. */}
            <div className='flex gap-3 flex-wrap justify-center'>
                <div className='m-3 p-4 md:w-780 
                    rounded-2xl bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'>
                    {/* Title & Dots */}
                    <div className='flex justify-between'>
                        {/* Title */}
                        <p className='text-xl font-semibold'>Trend Summary</p>
                        {/* Dots */}
                        <div className='flex gap-4 items-center'>
                            <p className='flex gap-2 
                                items-center text-gray-600 hover:drop-shadow-xl'>
                                <span className='flex h-1.5 w-1.5 pb-3.5'><BsFillCircleFill /></span>
                                <span>Pedestrians</span>
                            </p>
                            <p className='flex gap-2 
                                items-center text-[#01BDAE] hover:drop-shadow-xl'>
                                <span className='flex h-1.5 w-1.5 pb-3.5'><BsFillCircleFill /></span>
                                <span>Cyclists</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex mt-10 gap-10 flex-wrap justify-center'>
                        {/* Key Figures & Sparkline Component */}
                        <div className='m-4 pr-10 border-r-1
                            border-color'>
                            <div>
                                <p>
                                    <span className='text-3xl font-semibold'>5946</span>
                                    <span className='p-1.5 ml-3
                                        hover:drop-shadow-xl cursor-pointer rounded-full
                                        text-white bg-[#01BDAE] text-xs'>66%
                                    </span>
                                </p>
                                <p className='mt-1 text-gray-500'>
                                    Past 4 Weeks
                                </p>
                            </div>
                            <div className='mt-8'>
                                <p>
                                    <span className='text-3xl font-semibold'>2501</span>
                                    <span className='p-1.5 ml-3
                                        hover:drop-shadow-xl cursor-pointer rounded-full
                                        text-white bg-[#01BDAE] text-xs'>75%
                                    </span>
                                </p>
                                <p className='mt-1 text-gray-500'>
                                    This Week
                                </p>
                            </div>
                            {/* Sparkline Component */}
                            <div className='mt-5'>
                                <SparkLine
                                    currentColor={currentColor}
                                    id='line-sparkline'
                                    type='Line'
                                    height='80px'
                                    width='250px'
                                    data={weeklySparklineAreaData}
                                    color={currentColor}
                                />
                            </div>
                            {/* Button */}
                            <div className='mt-10'>
                                <Button
                                    color='white'
                                    bgColor={currentColor}
                                    text='Download Analysis'
                                    borderRadius='10px'
                                />
                            </div>
                        </div>
                        {/* Stacked Component */}
                        <div>
                            <Stacked width='320px' height='360px' />
                        </div>
                    </div>
                </div>

                {/* other components */}
                <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Northup Connector Opening 🎉</p>
                        <button type="button" className="text-xl font-semibold text-gray-400">
                            <IoIosMore />
                        </button>
                    </div>
                    <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
                        16 DEC, 2023
                    </p>

                    <div className="flex gap-4 border-b-1 border-color mt-6">
                        {medicalproBranding.data.map((item) => (
                            <div key={item.title} className="border-r-1 border-color pr-4 pb-2">
                                <p className="text-xs text-gray-400">{item.title}</p>
                                <p className="text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-b-1 border-color pb-4 mt-2">
                        <p className="text-md font-semibold mb-2">Teams</p>

                        <div className="flex gap-4">
                            {medicalproBranding.teams.map((item) => (
                                <p
                                    key={item.name}
                                    style={{ background: item.color }}
                                    className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                                >
                                    {item.name}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="text-md font-semibold mb-2">Leaders</p>
                        <div className="flex gap-4">
                            {medicalproBranding.leaders.map((item, index) => (
                                <img key={index} className="rounded-full w-8 h-8" src={item.image} alt="" />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                        <div className="mt-3">
                            <Button
                                color="white"
                                bgColor={currentColor}
                                text="Add"
                                borderRadius="10px"
                            />
                        </div>

                        <p className="text-gray-400 text-sm">30 Participants</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailX

