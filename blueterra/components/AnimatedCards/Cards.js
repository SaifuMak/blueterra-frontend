'use client'
import AnimatedCard from "./AnimatedCard"
import { useRef,useState } from 'react';


export default function Cards({ CardDetails }) {
    const [expandedIndex, setExpandedIndex] = useState(null)

    const handleCardClick =(index)=>{
        setExpandedIndex(expandedIndex=== index? null : index)
    }

    return (
        <div className=" flex w-full overflow-hidden">
            {
                CardDetails?.map((data, index) => (
                    <AnimatedCard key={index} card={data} onClick={()=>handleCardClick(index)} isExpanded={expandedIndex === index}/>
                ))
            }
        </div>

    )
}