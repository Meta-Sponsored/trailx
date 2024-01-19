import React from 'react'

const Button = ({ bgColor, color, size, text, borderRadius }) => {
    return (
        <button
            type='button'
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`p-3 
                text-${size} hover:drop-shadow-xl`}
        >
            {text}
        </button>
    )
}

export default Button