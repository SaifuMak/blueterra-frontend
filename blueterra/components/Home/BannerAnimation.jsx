'use client'
import HorizontalCards from "../AnimatedHorizontalCards/HorizontalCards"
import VerticalCards from "../AnimatedVerticalCards/VerticalCards"
import gsap from 'gsap';
import { useState, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

export default function BannerAnimation({page,CardData, expandedIndex, setExpandedIndex, isFullCardVisible, setIsFullCardVisible, handleShowFullCard, setIsFilterVisible, isFilterVisible }) {

    const [isLoading, setIsLoading] = useState(true)

    const animationBannerRef = useRef()

    // const handleShowFullCard =(index)=>{
    //     console.log('  open full card animation called on this index card --------------------', index);
    //     setIsFullCardVisible(true)
    //     setExpandedIndex(expandedIndex=== index? null : index)
    // }


    const handleHideFullCard = () => {

        // console.log('close full card animation called --------------------');
        setIsFullCardVisible(false)
        // setExpandedIndex(expandedIndex=== index? null : index)
    }


    return (
        // <div ref={animationBannerRef} className={` z-30 ${isFullCardVisible ? 'relative' : 'fixed top-0 '} w-full`}>
        <div ref={animationBannerRef} className={` z-30  w-full fixed top-[70px]`}>

            {/* <HorizontalCards CardDetails={CardData} expandedIndex={expandedIndex} handleCardClick={handleShowFullCard} /> */}
            <VerticalCards page={page} CardDetails={CardData} expandedIndex={expandedIndex} handleCardClick={handleShowFullCard} isFullCardVisible={isFullCardVisible} handleHideFullCard={handleHideFullCard} setIsLoading={setIsLoading} isLoading={isLoading} setIsFilterVisible={setIsFilterVisible} isFilterVisible={isFilterVisible} />

        </div>
    )
}
