"use client"
import { Suspense } from "react";
import { useSearchParams,usePathname } from "next/navigation";
import React from 'react'
import SearchComponent from './SearchComponent'
import { useEffect, useState } from "react";


function SearchInSearchPage({ fetchJournals }) {


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const query = searchParams.get("query") || "";

    const [hasEntered, setHasEntered] = useState(false)

    useEffect(() => {
        if (!query) return;

        localStorage.setItem("searchQuery", query);
        fetchJournals('View All', 1, query)

    }, [hasEntered,query]);


    
    return (
        <div className=" w-11/12 md:w-10/12 2xl:w-9/12 md:space-y-10 flex flex-col  items-center  my-20  h-full ">
            <div className="w-full flex flex-col  justify-between    ">
                <SearchComponent setHasEntered={setHasEntered} hasEntered={hasEntered}  />

                {query && <p className=" font-normal text-xl mt-3">   {`Showing results for`} <span className=" font-medium">{query}</span> </p>}

            </div>

        </div>
    )
}

export default SearchInSearchPage