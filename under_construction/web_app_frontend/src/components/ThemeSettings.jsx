import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { themeColors } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';


const ThemeSettings = () => {
    const { setMode, setColor, currentMode, currentColor, setThemeSettings } = useStateContext();

    return (
        <div className='top-0 right-0 w-screen fixed 
        bg-half-transparent nav-item'>
            <div className='float-right h-screen w-400
            dark:text-gray-200 bg-white dark:bg-[#484B52]'>

                {/* Cancel Button */}
                <div className='flex p-4 ml-4 justify-between items-center'>
                    <p className='text-xl font-semibold'>Settings</p>
                    <button
                        type='button'
                        onClick={() => { setThemeSettings(false) }}
                        style={{
                            color: 'rgb(153, 171, 180)',
                            borderRadius: '50%'
                        }}
                        className='p-3 text-2xl hover:drop-shadow-xl hover:bg-light-gray'
                    >
                        <MdOutlineCancel />
                    </button>
                </div>

                {/* Theme Options: Light or Dark */}
                <div className='flex-col p-4 ml-4 border-t-1 border-color'>
                    <p className='text-lg font-semibold'>Theme Options</p>
                    <div className='mt-4'>
                        <input
                            type='radio'
                            id='light'
                            name='theme'
                            value='Light'
                            className='cursor-pointer'
                            onChange={setMode}
                            checked={currentMode === 'Light'}
                        />
                        <label htmlFor='light' className='ml-2 text-md cursor-pointer'>
                            Light
                        </label>
                    </div>
                    <div className='mt-4'>
                        <input
                            type='radio'
                            id='dark'
                            name='theme'
                            value='Dark'
                            className='cursor-pointer'
                            onChange={setMode}
                            checked={currentMode === 'Dark'}
                        />
                        <label htmlFor='dark' className='ml-2 text-md cursor-pointer'>
                            Dark
                        </label>
                    </div>
                </div>

                {/* Theme Colors */}
                <div className='flex-col p-4 ml-4 border-t-1 border-color'>
                    <p className='text-lg font-semibold'>Theme Colors</p>
                    <div className='flex flex-wrap gap-3'>
                        {themeColors.map((item, index) => (
                            <TooltipComponent
                                key={index}
                                content={item.name}
                                position='TopCenter'>
                                <div className='flex relative mt-2 gap-5 items-center 
                                        cursor-pointer'>
                                    <button
                                        type='button'
                                        className='h-10 w-10 rounded-full cursor-pointer'
                                        style={{ backgroundColor: item.color }}
                                        onClick={() => setColor(item.color)}
                                    >
                                        <BsCheck className={`ml-2 text-2xl text-white
                                            ${item.color === currentColor ? 'block' : 'hidden'}`}
                                        />
                                    </button>
                                </div>
                            </TooltipComponent>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ThemeSettings