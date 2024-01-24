import React, { createContent, createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#01BDAE');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    }

    const setMode = (event) => {
        setCurrentMode(event.target.value);
        localStorage.setItem('themeMode', event.target.value);
        // setThemeSettings(false);
    }

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        // setThemeSettings(false);
    }

    return (
        <StateContext.Provider
            value={{
                activeMenu, setActiveMenu,
                isClicked, setIsClicked,
                handleClick, initialState,
                screenSize, setScreenSize,
                currentColor, currentMode,
                themeSettings, setThemeSettings,
                setMode, setColor
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);