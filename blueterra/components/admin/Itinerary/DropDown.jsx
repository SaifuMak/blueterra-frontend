import React, { useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from '@/components/reactIcons'

const Dropdown = ({ value, onChange, options, placeholder, className, isOpen, onToggle }) => {
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onToggle(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [onToggle]);

    return (
        <div
            ref={ref}
            className={`relative placeholder:text-[#949393] w-4/12 bg-white rounded-[4px] border border-[#B5B5B5] outline-none ${className}`}
        >
            {/* Selected box */}
            <div
                onClick={() => onToggle(!isOpen)}
                className="px-3 py-2.5 cursor-pointer flex justify-between items-center"
            >
                <span className={value ? " text-dark-28" : "text-[#949393]"}>
                    {value || placeholder}
                </span>
                <MdKeyboardArrowDown className={`${isOpen ? ' rotate-180' : ' rotate-0'} text-2xl text-dark-blue transform transition-all duration-500 `} />
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <div className="absolute mt-1 w-full border rounded-lg max-h-64 overflow-y-auto bg-white shadow-lg z-10">
                    {options.map((opt, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                onChange(opt);
                                onToggle(false);
                            }}
                            className={`px-3 py-2 cursor-pointer  text-dark-28 hover:bg-gray-50 ${value === opt ? "bg-gray-200" : ""
                                }`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
