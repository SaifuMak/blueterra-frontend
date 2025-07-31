'use client'
import AnimatedHorizontalCard from "./AnimatedHorizontalCard"
import { useRef,useState } from 'react';


export default function HorizontalCards({ CardDetails,expandedIndex,handleCardClick }) {
    // const [expandedIndex, setExpandedIndex] = useState(null)

    // const handleCardClick =(index)=>{
    //     setExpandedIndex(expandedIndex=== index? null : index)
    // }

    return (
        <div className=" flex  w-full overflow-hidden">
            {
                CardDetails?.map((data, index) => (
                    <AnimatedHorizontalCard key={index} card={data} onClick={()=>handleCardClick(index)} isExpanded={expandedIndex === index}/>
                ))
            }
        </div>

    )
}