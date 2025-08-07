import React from 'react'

const Button = ({ text, buttonStyle, isHoverWhiteApplied = true, onClickFunction= ()=>{} }) => {
    return (
        <button onClick={onClickFunction} className={`${buttonStyle} ${isHoverWhiteApplied ? 'hover:bg-white/15 hover:ring-2 ring-white/80 ' : 'hover:bg-[#026E9E]'} bg-sky-blue-1 transition-all duration-700 ease-in-out  cursor-pointer font-normal max-md:text-[13px] rounded-sm  text-white w-fit h-fit`}>{text}</button>
    )
}

export default Button