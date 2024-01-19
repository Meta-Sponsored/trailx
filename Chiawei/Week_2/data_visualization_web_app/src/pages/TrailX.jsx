import React from 'react';

// Import icons.
import { BsCurrencyDollar } from 'react-icons/bs';
import { BsFillCircleFill } from "react-icons/bs";

// Import components.
import { Stacked, Pie, Button, SparkLine } from '../components';

// Import the data for the main page.
import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';

// Import the current states.
import { useStateContext } from '../contexts/ContextProvider';

const TrailX = () => {
    return (
        <div className='mt-12'>
            {/* To render the general layout for the hero and the card layouts. */}
            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                {/* To render the hero layout of the main page. */}
                <div className='h-44 w-full lg:w-80 p-8 pt-9 m-3
                rounded-xl bg-hero-pattern bg-no-repeat bg-cover bg-center
                bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'>
                    {/* To render the text in the hero section. */}
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='font-bold text-gray-400'>
                                Earnings
                            </p>
                            <p className='text-2xl'>
                                $150,678.99
                            </p>
                        </div>
                    </div>
                    {/* To render a button in the hero section. */}
                    <div className='mt-6'>
                        <Button
                            color='white'
                            bgColor='#30CEDB'
                            text='Download'
                            borderRadius='10px'
                            size='md'
                        />
                    </div>
                </div>
                {/* To render the card layout of the main page. */}
                <div className='flex flex-wrap m-3 gap-3 justify-center items-center'>
                    {earningData.map((item) => (
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
            <div className='flex gap-10 flex-wrap justify-center'>
                <div className='m-3 p-4 md:w-780 
                    rounded-2xl bg-white dark:text-gray-200 dark:bg-secondary-dark-bg'>
                    {/* Title & Dots */}
                    <div className='flex justify-between'>
                        {/* Title */}
                        <p className='text-xl font-semibold'>Revenue Updates</p>
                        {/* Dots */}
                        <div className='flex gap-4 items-center'>
                            <p className='flex gap-2 
                                items-center text-gray-600 hover:drop-shadow-xl'>
                                <span className='flex h-1.5 w-1.5 pb-3.5'><BsFillCircleFill /></span>
                                <span>Expense</span>
                            </p>
                            <p className='flex gap-2 
                                items-center text-green-400 hover:drop-shadow-xl'>
                                <span className='flex h-1.5 w-1.5 pb-3.5'><BsFillCircleFill /></span>
                                <span>Budget</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex mt-10 gap-10 flex-wrap justify-center'>
                        {/* Key Figures & Sparkline Component */}
                        <div className='m-4 pr-10 border-r-1
                            border-color'>
                            <div>
                                <p>
                                    <span className='text-3xl font-semibold'>$99.999</span>
                                    <span className='p-1.5 ml-3
                                        hover:drop-shadow-xl cursor-pointer rounded-full
                                        text-white bg-green-400 text-xs'>66%
                                    </span>
                                </p>
                                <p className='mt-1 text-gray-500'>
                                    Budget
                                </p>
                            </div>
                            <div className='mt-8'>
                                <p>
                                    <span className='text-3xl font-semibold'>$128.999</span>
                                </p>
                                <p className='mt-1 text-gray-500'>
                                    Expense
                                </p>
                            </div>
                            {/* Sparkline Component */}
                            <div className='mt-5'>
                                <SparkLine
                                    currentColor='#30CEDB'
                                    id='line-sparkline'
                                    type='Line'
                                    height='80px'
                                    width='250px'
                                    data={SparklineAreaData}
                                    color='#30CEDB'
                                />
                            </div>
                            {/* Button */}
                            <div className='mt-10'>
                                <Button
                                    color='white'
                                    bgColor='#30CEDB'
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
            </div>
        </div>
    )
}

export default TrailX

