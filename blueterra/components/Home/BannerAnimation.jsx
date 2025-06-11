'use client'
// import HorizontalCards from "../AnimatedHorizontalCards/HorizontalCards"
import VerticalCards from "../AnimatedVerticalCards/VerticalCards"
import gsap from 'gsap';

import { useState, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Filter from "../Filter";
import CardData from "../datas/Destinations";


gsap.registerPlugin(ScrollTrigger);

export default function BannerAnimation() {

    const [expandedIndex, setExpandedIndex] = useState(null)

    const [isFullCardVisible, setIsFullCardVisible] = useState(true)

    const [isLoading, setIsLoading] = useState(true)

    const [isFilterVisible, setIsFilterVisible] = useState(false)

    const animationBannerRef = useRef()

    const handleShowFullCard = (index) => {
        // console.log('  open full card animation called on this index card --------------------', index);
        setIsFullCardVisible(true)
        // setExpandedIndex(expandedIndex=== index? null : index)
        setExpandedIndex(index)

    }


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

    // const handleCardClick =(index)=>{
    //     setExpandedIndex(expandedIndex=== index? null : index)
    // }



    //   useEffect(() => {
    //     if(animationBannerRef.current){
    //         gsap.from(animationBannerRef.current,{
    //             scrollTrigger:{
    //                 trigger: animationBannerRef.current,
    //                 start: "top -10%",
    //                 scrub: true,
    //                 markers: true,
    //                 onEnter : ()=> handleHideFullCard(),

    //             },

    //         })
    //     }

    //   }, [])



    return (
        // <div ref={animationBannerRef} className={` z-30 ${isFullCardVisible ? 'relative' : 'fixed top-0 '} w-full`}>
        <div ref={animationBannerRef} className={` z-30  w-full`}>


            {/* <HorizontalCards CardDetails={CardData} expandedIndex={expandedIndex} handleCardClick={handleCardClick} /> */}
            <VerticalCards CardDetails={CardData} expandedIndex={expandedIndex} handleCardClick={handleShowFullCard} isFullCardVisible={isFullCardVisible} handleHideFullCard={handleHideFullCard} setIsLoading={setIsLoading} isLoading={isLoading} setIsFilterVisible={setIsFilterVisible} />
            <Filter setIsFilterVisible={setIsFilterVisible} isFilterVisible={isFilterVisible} />

        </div>
    )

}