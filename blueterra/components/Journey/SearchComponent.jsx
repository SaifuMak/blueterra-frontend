"use client";

import { useState } from "react";
import { playfair } from "@/app/fonts";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");

  // Handle input change and save to localStorage
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    localStorage.setItem("searchQuery", value);
  };

  // Trigger when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const savedQuery = localStorage.getItem("searchQuery");
    console.log("Searching for:", savedQuery);
    // You can replace the console.log with your API call or navigation
  };


  return (
    <div className="md:w-6/12 w-full flex flex-col">
      <p className={`xl:text-3xl text-2xl font-medium ${playfair.className}`}>
        Get Inspired
      </p>
      <div className="md:w-[80%] w-[90%] h-9 md:h-10 xl:h-12 xl:mt-4 mt-3 rounded-sm border border-[#2A282880]/50 px-3 flex justify-between items-center">
        <input
          type="text"
          className="w-11/12 bg-red-100 outline-none placeholder:text-sm md:placeholder:text-base"
          placeholder="Search journal..."
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <img
          src="/Icons/search.svg"
          alt="search icon"
          className="size-5 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
