import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/chiawei.png';
import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const Navbar = () => {
    const { activeMenu, setActiveMenu,
        isClicked, setIsClicked, handleClick,
        screenSize, setScreenSize, currentColor
    } = useStateContext();

    // To handle if the screen size changes.
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // To handle if the screen size is too small, turn off the sidebar.
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className='flex items-center justify-between bg-white py-2 px-4 w-full'>
            <img className='h-8 w-20' src='/Logo.png' alt="Logo" />
            <div className='flex'>
                {/* Navigation Links */}
                <a href="/NewsMap" className='px-4 py-2 mx-1 text-gray-600 hover:bg-gray-100 rounded-md'>NEWS & UPDATES</a>
                <a href="/history" className='px-4 py-2 mx-1 text-gray-600 hover:bg-gray-100 rounded-md'>HISTORY</a>
                <a href="/who-we-are" className='px-4 py-2 mx-1 text-gray-600 hover:bg-gray-100 rounded-md'>WHO WE ARE</a>
            </div>
                <TooltipComponent content='Profile' position='BottomCenter'>
                    <div className='flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-1'
                        onClick={() => handleClick('userProfile')}>
                        <img className='h-9 w-9 rounded-full' src={avatar} alt="Profile" />
                        <MdKeyboardArrowDown className='text-gray-600 ml-1' />
                    </div>
                </TooltipComponent>
            {isClicked.userProfile && <UserProfile />}
        </div>
    );
};

export default Navbar;
