import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Import icons.
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

// Import the content on the sidebar, 
// including titles and components' or pages' names and icons.
import { links } from '../data/dummy';

// Import the current states.
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize } = useStateContext();

    // Imagine you are on a small screen and have just opened the sidebar. 
    // This function allows you to close the sidebar when you click on the logo or 
    // item on the sidebar (such as the employee button).
    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    }

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 m-2 \
    rounded-lg text-white text-md';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 m-2 \
    rounded-lg text-md text-gray-700 hover:bg-light-gray \
    dark:text-gray-200 dark:bg-light-gray dark:hover:text-black';

    return (
        <div className="ml-3 h-screen 
        md:overflow-hidden overflow-auto
        md:hover:overflow-auto pb-10">
            {activeMenu && (<>
                {/* To implement the logo and cancel button. */}
                <div className='flex justify-between items-center'>
                    {/* Logo & Brand Name */}
                    <Link to='/' onClick={handleCloseSideBar}
                        className='flex items-center gap-3 ml-3 mt-4 
                    text-xl font-extrabold tracking-tight
                    dark:text-white text-slate-900'>
                        <SiShopware /><span>TrailX</span>
                    </Link>
                    {/* Cancel Button */}
                    <TooltipComponent content="Menu" position="BottomCenter">
                        <button type='button'
                            onClick={() => {
                                setActiveMenu(
                                    (prevActiveMenu) =>
                                        (!prevActiveMenu))
                            }}
                            className='text-xl rounded-full p-3 mt-4 
                        hover:bg-light-gray block md:hidden'>
                            <MdOutlineCancel />
                        </button>
                    </TooltipComponent>
                </div>
                {/* To implement items on the sidebar. */}
                <div className='mt-10'>
                    {links.map((item) => (
                        <div key={item.title}>
                            { /* Title: DASHBOARD, PAGES, APPS, CHARTS. */}
                            <p className='m-3 mt-4
                            text-gray-400 dark:text-gray-400 uppercase'>
                                {item.title}
                            </p>
                            { /* Name: TrailX, Employees, Customers, etc. */}
                            {item.links.map((link) => (
                                <NavLink
                                    to={`/${link.name}`}
                                    key={link.name}
                                    onClick={handleCloseSideBar}
                                    className={({ isActive }) =>
                                        isActive ? activeLink : normalLink}
                                >
                                    {link.icon}
                                    <span className='capitalize'>
                                        {link.name}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>
            </>)}
        </div>
    )
}

export default Sidebar