'use client'
import dynamic from 'next/dynamic';

import React, { useRef, useEffect } from "react";
// const MapClient = dynamic(() => import('./Leaflet'), {
//     ssr: false,
// });


const MapClient = dynamic(() => import('./MapDemo'), {
    ssr: false,
});

export default function Map({ expandCards, index, itineraryData }) {
    const containerRef = useRef(null);
    const lockedRef = useRef(false);

    useEffect(() => {

        const handleClickInside = (event) => {

            if (containerRef.current && !containerRef.current.contains(event.target)) {
                document.documentElement.style.overflow = 'auto'
                 console.log('it is clicked outside');
                 
            }
            else {
                document.documentElement.style.overflow = 'hidden'
                 console.log('it is clicked inside');
                //  alert('it is clicked inside')
            }
        }
        document.addEventListener('mousedown', handleClickInside);

        return () => {
            document.removeEventListener('mousedown', handleClickInside);
            document.documentElement.style.overflow = 'auto'
        }

    }, [])



    return (
        // <div onClick={()=>expandCards(index)} className=" relative rounded-sm  overflow-hidden cursor-pointer w-full h-full">
        <div ref={containerRef} className=" relative  bg-red-400 rounded-xl lg:rounded-sm  overflow-hidden cursor-pointer w-full h-[50vh] lg:h-full  ">


            <MapClient expandCards={expandCards} itineraryData={itineraryData} />
        </div>

    )
}