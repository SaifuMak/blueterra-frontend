import React, { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import { rubik } from '@/app/fonts'
import useClickOutside from "@/app/hooks/useClickOutside";

export default function ColorThemePicker({color, setColor}) {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    // const pickerRef = useRef(null);

    const pickerRef = useClickOutside(() => setIsPickerVisible(false))

    // Close picker when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (pickerRef.current && !pickerRef.current.contains(e.target)) {
    //             setIsPickerVisible(false);
    //         }
    //     };
    //     window.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         window.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);



    return (
        <div className={`flex items-center space-x-4 ${rubik.className}`}>
            {/* Label */}
            <span className="text-base  font-normal text-gray-800">Color Theme</span>

            {/* Color circle */}
            <div className="relative">
                <div
                    onClick={() => setIsPickerVisible((prev) => !prev)}
                    className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer"
                    style={{ backgroundColor: color }}
                ></div>

                {/* Color picker */}
                {isPickerVisible && (
                    <div ref={pickerRef} className="absolute z-20 mt-2">
                        <ChromePicker
                            color={color}
                            onChangeComplete={(newColor) => setColor(newColor.hex)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
