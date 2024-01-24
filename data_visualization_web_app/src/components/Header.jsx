import React from 'react'

const Header = ({ category, title }) => {
    return (
        <div className='mb-10'>
            <p className='text-gray-400'>
                {category}
            </p>
            <p className='tracking-tight text-3xl font-extrabold text-slate-900'>
                {title}
            </p>
        </div>
    )
}

export default Header