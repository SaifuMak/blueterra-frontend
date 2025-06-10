'use client'
import AnimatedVerticalCard from "./AnimatedVerticalCard"
import { useRef, useState } from 'react';


export default function VerticalCards({ CardDetails, expandedIndex, handleCardClick, isFullCardVisible, handleHideFullCard, setIsLoading, isLoading,setIsFilterVisible }) {
    // const [expandedIndex, setExpandedIndex] = useState(null)

    // const handleCardClick =(index)=>{
    //     setExpandedIndex(expandedIndex=== index? null : index)
    // }

    return (
        <div className=" flex w-full overflow-hidden">
            {
                CardDetails?.map((data, index) => (
                    <AnimatedVerticalCard key={index} card={data} onClick={() => handleCardClick(index)} isExpanded={expandedIndex === index} isFullCardVisible={isFullCardVisible} handleHideFullCard={handleHideFullCard} setIsLoading={setIsLoading} isLoading={isLoading} setIsFilterVisible={setIsFilterVisible} />
                ))
            }
         </div>

    )
}