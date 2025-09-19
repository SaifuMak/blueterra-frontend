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

    const mapRef = useRef(null);
    const isMobile = useMediaQuery({
        query: '(max-width: 844px)'
    })

    useEffect(() => {
        if (!isMobile || !mapRef.current) return;

        const el = mapRef.current;

        const updateInteraction = (e) => {
            if (e.touches.length === 2) {
                // alert('entered-')
                // ✅ enable map interaction
                el.removeAttribute("data-lenis-prevent");

            } else {
                // 🚫 disable map interaction, let Lenis scroll
                el.setAttribute("data-lenis-prevent", "true");
            }
        };

        el.addEventListener("touchstart", updateInteraction);
        el.addEventListener("touchend", updateInteraction);

        return () => {
            el.removeEventListener("touchstart", updateInteraction);
            el.removeEventListener("touchend", updateInteraction);
        };
    }, [isMobile]);



    return (
        // <div onClick={()=>expandCards(index)} className=" relative rounded-sm  overflow-hidden cursor-pointer w-full h-full">
        // <div    ref={mapRef} className=" relative   rounded-2xl lg:rounded-sm  overflow-hidden cursor-pointer w-full h-[50vh] lg:h-full  " {...(isMobile ? { 'data-lenis-prevent': true } : {})}>
        <div ref={mapRef} className=" relative   rounded-2xl lg:rounded-sm  overflow-hidden cursor-pointer w-full h-[50vh] lg:h-full  " {...(isMobile ? { 'data-lenis-prevent': true } : {})}>

            <MapClient expandCards={expandCards} itineraryData={itineraryData} />
        </div>

    )
}