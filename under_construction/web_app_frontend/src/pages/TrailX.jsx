import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';

// Import icons.
import { BsFillCircleFill } from "react-icons/bs";
import { IoIosMore } from 'react-icons/io';
import product9 from '../data/product9.jpg';

// Import components.
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';

// Import the data for the main page.
import { medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { weeklySparklineAreaData } from '../data/weekly-analysis'

// Import the current states.
import { useStateContext } from '../contexts/ContextProvider';

const fetchIssues = async () => {
    const issuesCollectionRef = collection(db, 'feedbacks'); // 'issues' is the name of the Firestore collection
    const data = await getDocs(issuesCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
        <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
);

const TrailX = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const getIssues = async () => {
            const issuesData = await fetchIssues();
            setIssues(issuesData);
        };

        getIssues();
    }, []);

    const { currentColor, currentMode } = useStateContext();
    const [gcsData, setGcsData] = useState(null);

    const fetchDataFromFirebaseStorage = async () => {
        const storageRef = ref(storage, 'gs://user_counter/user_counter_output.json'); // Adjust the path as needed

        try {
            const url = await getDownloadURL(storageRef);
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setGcsData(data);
        } catch (error) {
            console.error("Could not fetch data from Firebase Storage:", error);
        }
    };

    useEffect(() => {
        fetchDataFromFirebaseStorage(); // Fetch data on component mount
        const intervalId = setInterval(fetchDataFromFirebaseStorage, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);


    return (
        <div className='mt-12'>
            <div className="w-full flex items-center justify-between px-2 h-12">
                <img className="max-w-xs" alt="Vector" src="vector 17.svg" style={{ flexShrink: 0 }} />
                <div className="text-center text-black font-semibold text-2xl flex-1">
                    DASHBOARD
                </div>
                <img className="max-w-xs" alt="Vector" src="vector 18.svg" style={{ flexShrink: 0 }} />
            </div>


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
                                {gcsData ? gcsData["Total User Count"] : "Loading..."} users
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
                    {gcsData ? (
                        <>
                            <div
                                className='p-4 pt-9 md:w-56 rounded-2xl bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'
                            >
                                <p className='text-2xl opacity-90 rounded-full hover:drop-shadow-xl'>
                                    🚶‍♂️ Pedestrians
                                </p>
                                <p className='mt-3 text-lg font-semibold'>
                                    {gcsData["Pedestrians"]}
                                </p>
                            </div>

                            <div
                                className='p-4 pt-9 md:w-56 rounded-2xl bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'
                            >
                                <p className='text-2xl opacity-90 rounded-full hover:drop-shadow-xl'>
                                    🚴 Cyclists
                                </p>
                                <p className='mt-3 text-lg font-semibold'>
                                    {gcsData["Cyclists"]}
                                </p>
                            </div>

                            <div
                                className='p-4 pt-9 md:w-56 rounded-2xl bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'
                            >
                                <p className='text-2xl opacity-90 rounded-full hover:drop-shadow-xl'>
                                    🐕 Dog Walkers
                                </p>
                                <p className='mt-3 text-lg font-semibold'>
                                    {gcsData["Dog Walkers"]}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p>Loading data...</p>
                    )}
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
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Created At
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Email
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Issue Description
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Location
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((issue) => (
                                <tr key={issue.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6">
                                        {issue.createdAt.toDate().toLocaleString()} {/* Adjust formatting as needed */}
                                    </td>
                                    <td className="py-4 px-6">{issue.email}</td>
                                    <td className="py-4 px-6">{issue.issueDescription}</td>
                                    <td className="py-4 px-6">{issue.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            </div>
        </div>
    );
};

export default TrailX

