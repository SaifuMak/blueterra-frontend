'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import backgroundImage from '../../public/images/itinerary/nature-background.png'
import Image from "next/image";
import ScrollSmoother from 'gsap/ScrollSmoother';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);


export default function FullPageScroll() {
   



    return (
        <div className="w-full h-screen">
            <div id='page1' className="w-full h-screen flex-center bg-slate-100"></div>
            <div id='page2' className="w-full h-screen flex-center bg-red-100"></div>
            <div id='page3' className="w-full h-screen flex-center bg-indigo-100"></div>
        </div>

    );
}
