'use client'
// import HorizontalCards from "../AnimatedHorizontalCards/HorizontalCards"
import VerticalCards from "../AnimatedVerticalCards/VerticalCards"
import gsap from 'gsap';
import { useState, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardData from "../datas/Destinations";


gsap.registerPlugin(ScrollTrigger);

export default function BannerAnimation({expandedIndex, setExpandedIndex, isFullCardVisible, setIsFullCardVisible,handleShowFullCard,setIsFilterVisible}) {

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

            {/* <HorizontalCards CardDetails={CardData} expandedIndex={expandedIndex} handleCardClick={handleCardClick} /> */}
            <VerticalCards CardDetails={CardData} expandedIndex={expandedIndex} handleCardClick={handleShowFullCard} isFullCardVisible={isFullCardVisible} handleHideFullCard={handleHideFullCard} setIsLoading={setIsLoading} isLoading={isLoading} setIsFilterVisible={setIsFilterVisible} />

        </div>
    )

}