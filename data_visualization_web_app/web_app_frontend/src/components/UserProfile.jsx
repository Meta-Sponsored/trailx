import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/chiawei.png';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut method
import { app } from '../firebase-config';



const UserProfile = () => {
    const navigate = useNavigate();
    const { currentColor } = useStateContext(); // Extract currentColor from context
    const [user, setUser] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        console.log('Attempting to log out...');
        const auth = getAuth(app);
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            navigate('/NewsMap'); // Navigate to NewsMap page after logout
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
                <Button
                    icon={<MdOutlineCancel />}
                    color="rgb(153, 171, 180)"
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="50%"
                />
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                <img
                    className="rounded-full h-24 w-24"
                    src={avatar}
                    alt="user-profile"
                />
                <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p>
                    {/* Display the user's email dynamically */}
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user?.email}</p>
                </div>
            </div>
            <div>
                {/* Navigation link */}
                <Link to="/trailx" className="text-xl">
                    <div className="flex items-center gap-3 p-3 hover:bg-light-gray rounded-lg cursor-pointer dark:hover:bg-[#42464D]">
                        <p className="font-semibold dark:text-gray-200">Dashboard</p>
                    </div>
                </Link>
            </div>
            <div className="mt-5">
                <button
                    onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
                    onMouseLeave={() => setIsHovered(false)} // Handle mouse leave
                    onClick={handleLogout}
                    style={{
                        backgroundColor: isHovered ? '#3B82F6' : currentColor, // Change color on hover
                        color: 'white',
                        borderRadius: '10px',
                        width: '100%',
                        padding: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
