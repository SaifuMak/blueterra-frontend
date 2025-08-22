"use client";

import { useEffect, useState } from "react";
import { rubik } from "@/app/fonts";
import { useRouter, useSearchParams } from 'next/navigation';


const SearchInSingleBlog = () => {

    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();

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

        const searchValue = localStorage.getItem("searchQuery");
        if (searchValue.trim() === "") return;
        router.push(`/search?query=${encodeURIComponent(searchValue)}`);

    };


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        localStorage.setItem("searchQuery", '')
    }, []);



    return (
        <div className=" w-full flex flex-col ">
            <p className={` text-2xl font-normal ${rubik.className}`}>
                Search
            </p>
            <div className=" w-full  h-9 md:h-10 xl:h-12 xl:mt-4 mt-3 rounded-full border border-[#2A282880]/80 px-5 flex justify-between items-center">
                <input
                    type="text"
                    className="w-11/12 outline-none placeholder:text-sm md:placeholder:text-lg"
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

export default SearchInSingleBlog;
