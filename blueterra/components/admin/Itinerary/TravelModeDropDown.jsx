import React, { useState, useRef, useEffect } from "react";

const TravelModeDropDown = ({ value, onChange, options, placeholder, className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative placeholder:text-[#949393] w-4/12 bg-white rounded-[4px] border border-[#B5B5B5] outline-none ${className}`}
    >
      {/* Selected box */}
      <div
        onClick={() => setOpen(!open)}
        className="px-3 py-2 cursor-pointer flex justify-between items-center"
      >
        <span className={value ? "text-black" : "text-[#949393]"}>
          {value || placeholder}
        </span>
        <span className="text-gray-500">▾</span>
      </div>

      {/* Dropdown options */}
      {open && (
        <div className="absolute mt-1 w-full border rounded-lg bg-white shadow-lg z-10">
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                value === opt ? "bg-gray-200" : ""
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

export default TravelModeDropDown;
