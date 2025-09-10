'use client'
import dynamic from 'next/dynamic';
import { useLenis } from '@/components/SmoothScroll';
import React, { useRef, useEffect } from "react";
import { useMediaQuery } from 'react-responsive'

// const MapClient = dynamic(() => import('./Leaflet'), {
//     ssr: false,
// });



const MapClient = dynamic(() => import('./MapDemo'), {
    ssr: false,
});

export default function Map({ expandCards, index, itineraryData }) {
    const containerRef = useRef(null);
    const lockedRef = useRef(false);

    const lenis = useLenis();

    

    // useEffect(() => {

    //     const handleClickInside = (event) => {

    //         if (containerRef.current && !containerRef.current.contains(event.target)) {
    //             document.documentElement.style.overflow = 'auto'
    //              console.log('it is clicked outside');
    //              lenis?.start();
                 
    //         }
    //         else {
    //             document.documentElement.style.overflow = 'hidden'
    //               lenis?.stop();
    //              console.log('it is clicked inside');
    //             //  alert('it is clicked inside')
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickInside);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickInside);
    //         document.documentElement.style.overflow = 'auto'
    //     }

    // }, [])



    return (
        // <div onClick={()=>expandCards(index)} className=" relative rounded-sm  overflow-hidden cursor-pointer w-full h-full">
        <div ref={containerRef} className=" relative  bg-red-400 rounded-xl lg:rounded-sm  overflow-hidden cursor-pointer w-full h-[50vh] lg:h-full  " data-lenis-prevent>


            <MapClient expandCards={expandCards} itineraryData={itineraryData} />
        </div>

    )
}