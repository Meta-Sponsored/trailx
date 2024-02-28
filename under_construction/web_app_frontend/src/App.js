import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Import icons.
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

// Import the components and pages created by ourselves. 
import { Navbar, Sidebar, ThemeSettings } from './components';
import {
    TrailX, Orders, Employees, Customers,
    Calendar, Kanban, Editor, ColorPicker,
    Line, Stacked, Area, Bar, Pie, Financial, ColorMapping, Pyramid, NewsMap, AdminLoginPage
} from './pages';

// Import the current states.
import { useStateContext } from './contexts/ContextProvider';

// Import an extra CSS file for the page.
import './App.css';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibGV1bmdob24iLCJhIjoiY2xzODc5emV3MHV2aTJzbmwxM3RyaXcxdCJ9.ycMiuaM_PLXNZ34w2rXpug';

const App = () => {
    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <BrowserRouter>
                <div className='flex relative dark:bg-main-dark-bg'>

                    {/* To place the setting component. */}
                    <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
                        <TooltipComponent content='Settings' position='Top'>
                            <button type='button'
                                className='text-3xl p-3 hover:drop-shadow-xl
                            hover:bg-light-gray text-white'
                                style={{
                                    background: currentColor,
                                    borderRadius: '50%'
                                }}
                                onClick={() => setThemeSettings(true)}
                            >
                                <FiSettings />
                            </button>
                        </TooltipComponent>
                    </div>

                    <div className={
                        `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full`
                    }>
                        {/* To place the navigation bar. */}
                        <div className='fixed md:static
                        bg-main-bg dark:bg-main-dark-bg 
                        navbar w-full'>
                            <Navbar />
                        </div>

                        {/* To place the theme setting component and set up React routers. */}
                        <div>
                            {/* Theme Settings */}
                            {themeSettings && <ThemeSettings />}

                            <Routes>
                                {/* Main Dashboard */}
                                <Route path="/" element={<TrailX />} />
                                <Route path="/trailx" element={<TrailX />} />

                                {/* Pages */}
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/employees" element={<Employees />} />
                                <Route path="/customers" element={<Customers />} />

                                {/* Apps */}
                                <Route path="/kanban" element={<Kanban />} />
                                <Route path="/editor" element={<Editor />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/color-picker" element={<ColorPicker />} />

                                {/* Charts */}
                                <Route path="/line" element={<Line />} />
                                <Route path="/area" element={<Area />} />
                                <Route path="/bar" element={<Bar />} />
                                <Route path="/pie" element={<Pie />} />
                                <Route path="/financial" element={<Financial />} />
                                <Route path="/color-mapping" element={<ColorMapping />} />
                                <Route path="/pyramid" element={<Pyramid />} />
                                <Route path="/stacked" element={<Stacked />} />

                                {/* Trailx */}
                                <Route path="/NewsMap" element={<NewsMap />} />

                                <Route path="/AdminLoginPage" element={<AdminLoginPage />} />   
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App