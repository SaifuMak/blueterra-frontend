'use client'
import AnimatedVerticalCard from "./AnimatedVerticalCard"
import { useRef, useState } from 'react';
import MobileAnimatedVerticalCard from "./MobileAnimatedVerticalCard";

export default function VerticalCards({ CardDetails, expandedIndex, handleCardClick, isFullCardVisible, handleHideFullCard, setIsLoading, isLoading, setIsFilterVisible }) {
    // const [expandedIndex, setExpandedIndex] = useState(null)

    // const handleCardClick =(index)=>{
    //     setExpandedIndex(expandedIndex=== index? null : index)
    // }

    return (
        <div className=" md:flex  w-full md:overflow-hidden">
            {
                CardDetails?.map((data, index) => (
                    <AnimatedVerticalCard key={index} card={data} onClick={() => handleCardClick(index)} isExpanded={expandedIndex === index} isFullCardVisible={isFullCardVisible} handleHideFullCard={handleHideFullCard} setIsLoading={setIsLoading} isLoading={isLoading} setIsFilterVisible={setIsFilterVisible} />
                    // <MobileAnimatedVerticalCard key={index} card={data} onClick={() => handleCardClick(index)} isExpanded={expandedIndex === index} isFullCardVisible={isFullCardVisible} handleHideFullCard={handleHideFullCard} setIsLoading={setIsLoading} isLoading={isLoading} setIsFilterVisible={setIsFilterVisible} />


                ))
            }
        </div>

    )
}