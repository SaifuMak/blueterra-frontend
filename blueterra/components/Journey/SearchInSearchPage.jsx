"use client"
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React from 'react'
import SearchComponent from './SearchComponent'
import { useEffect } from "react";


function SearchInSearchPage({ fetchJournals }) {


    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    useEffect(() => {
        if (!query) return;

        localStorage.setItem("searchQuery", query);
        fetchJournals('View All', 1, query)

    }, [query]);


    
    return (
        <div className=" w-11/12 md:w-10/12 2xl:w-9/12 md:space-y-10 flex flex-col  items-center  my-20  h-full ">
            <div className="w-full flex flex-col  justify-between    ">
                <SearchComponent />

                {query && <p className=" font-normal text-xl mt-3">   {`Showing results for`} <span className=" font-medium">{query}</span> </p>}

            </div>

        </div>
    )
}

export default SearchInSearchPage