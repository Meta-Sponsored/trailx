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
                <div>
                    <div
                        className=" rounded-2xl md:w-400 p-4 m-3"
                        style={{ backgroundColor: currentColor }}
                    >
                        <div className="flex justify-between items-center ">
                            <p className="font-semibold text-white text-2xl">Earnings</p>

                            <div>
                                <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                                <p className="text-gray-200">Monthly revenue</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
                        </div>
                    </div>

                    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
                        <div>
                            <p className="text-2xl font-semibold ">$43,246</p>
                            <p className="text-gray-400">Yearly sales</p>
                        </div>

                        <div className="w-40">
                            <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="160px" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-10 m-4 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-xl font-semibold">Recent Transactions</p>
                        <DropDown currentMode={currentMode} />
                    </div>
                    <div className="mt-10 w-72 md:w-400">
                        {recentTransactions.map((item) => (
                            <div key={item.title} className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{
                                            color: item.iconColor,
                                            backgroundColor: item.iconBg,
                                        }}
                                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                                <p className={`text-${item.pcColor}`}>{item.amount}</p>
                            </div>
                        ))}
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

                        <p className="text-gray-400 text-sm">36 Recent Transactions</p>
                    </div>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
                    <div className="flex justify-between items-center gap-2 mb-10">
                        <p className="text-xl font-semibold">Sales Overview</p>
                        <DropDown currentMode={currentMode} />
                    </div>
                    <div className="md:w-full overflow-auto">
                        <LineChart />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Weekly Stats</p>
                        <button type="button" className="text-xl font-semibold text-gray-500">
                            <IoIosMore />
                        </button>
                    </div>

                    <div className="mt-10 ">
                        {weeklyStats.map((item) => (
                            <div key={item.title} className="flex justify-between mt-4 w-full">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{ background: item.iconBg }}
                                        className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>

                                <p className={`text-${item.pcColor}`}>{item.amount}</p>
                            </div>
                        ))}
                        <div className="mt-4">
                            <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
                        </div>
                    </div>

                </div>
                <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">MedicalPro Branding</p>
                        <button type="button" className="text-xl font-semibold text-gray-400">
                            <IoIosMore />
                        </button>
                    </div>
                    <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
                        16 APR, 2021
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

                        <p className="text-gray-400 text-sm">36 Recent Transactions</p>
                    </div>
                </div>
                <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Daily Activities</p>
                        <button type="button" className="text-xl font-semibold text-gray-500">
                            <IoIosMore />
                        </button>
                    </div>
                    <div className="mt-10">
                        <img
                            className="md:w-96 h-50 "
                            src={product9}
                            alt=""
                        />
                        <div className="mt-8">
                            <p className="font-semibold text-lg">React 18 coming soon!</p>
                            <p className="text-gray-400 ">By Johnathan Doe</p>
                            <p className="mt-8 text-sm text-gray-400">
                                This will be the small description for the news you have shown
                                here. There could be some great info.
                            </p>
                            <div className="mt-3">
                                <Button
                                    color="white"
                                    bgColor={currentColor}
                                    text="Read More"
                                    borderRadius="10px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailX

