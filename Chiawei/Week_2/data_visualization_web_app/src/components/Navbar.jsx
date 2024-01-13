import React, { useEffect } from 'react';

// Import icons.
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';

// Import components.
import { Cart, Chat, Notification, UserProfile } from '.';

// Import the current states.
import { useStateContext } from '../contexts/ContextProvider';

// To render all buttons shown on the Navbar.
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position='BottomCenter'>
        <button type='button' onClick={customFunc}
            style={{ color }} className='relative p-3
        text-xl rounded-full hover:bg-light-gray'>
            <span style={{ background: dotColor }}
                className='absolute inline-flex h-2 w-2 right-2 top-2 
                rounded-full'>
            </span>
            {icon}
        </button>
    </TooltipComponent>
)

// To render the Navbar component.
const Navbar = () => {
    const { activeMenu, setActiveMenu,
        isClicked, setIsClicked, handleClick,
        screenSize, setScreenSize
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
        <div className='flex justify-between p-2 md:mx-6 relative'>
            {/* To render a menu button. */}
            <NavButton title='Menu'
                customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                color='blue'
                icon={<AiOutlineMenu />}
            />
            <div className='flex'>
                {/* To render a cart button. */}
                <NavButton title='Cart'
                    customFunc={() => handleClick('cart')}
                    color='blue'
                    icon={<FiShoppingCart />}
                />
                {/* To render a chat button. */}
                <NavButton title='Chat'
                    dotColor="#03C9D7"
                    customFunc={() => handleClick('chat')}
                    color='blue'
                    icon={<BsChatLeft />}
                />
                {/* To render a notification button. */}
                <NavButton title='Notifications'
                    dotColor="#03C9D7"
                    customFunc={() => handleClick('notification')}
                    color='blue'
                    icon={<RiNotification3Line />}
                />
                {/* To render a profile button. */}
                <TooltipComponent content='Profile' position='BottomCenter'>
                    <div className='flex items-center gap-2 p-1
                    cursor-pointer hover:bg-light-gray rounded-lg'
                        onClick={() => ('userProfile')}>
                        <img
                            className='w-8 h-8 
                                rounded-full'
                            src={avatar}
                        />
                        <p>
                            <span className='text-gray-400 text-14'>Hi, </span> {' '}
                            <span className='ml-1 text-gray-400 font-bold text-14'>Michael</span>
                        </p>
                        <MdKeyboardArrowDown className='text-gray-400 text-14' />
                    </div>
                </TooltipComponent>
                {/* To render the corresponding component when the user clicks the button. */}
                {/* If isClicked.cart is true (or truthy), then the <Cart /> component will be rendered. 
                    If isClicked.cart is false (or falsy), nothing will be rendered. */}
                {isClicked.cart && <Cart />}
                {isClicked.chat && <Chat />}
                {isClicked.notification && <Notification />}
                {isClicked.userProfile && <UserProfile />}
            </div>
        </div>
    )
}

export default Navbar