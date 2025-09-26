import Image from "next/image"
import { playfair } from '@/app/fonts'
import { useRef } from "react"
import { useState, useEffect } from "react"
import gsap from 'gsap';
import MobileAnimatedVerticalIndividualCard from "./MobileAnimatedVerticalIndividualCard";

export default function MobileAnimatedVerticalCard({ page, CardData, selectedVerticalTileMobile, setSelectedVerticalTileMobile, handleSetCollectionRequestedToShowInMobile }) {

  const mobileVerticalTilesRef = useRef([])
  const [touchedCard, setTouchedCard] = useState(null)

  const handleCardClick = (index) => {
    setSelectedVerticalTileMobile(index)
    // gsap.to(mobileVerticalTilesRef[index], {
    //   flex: 9,
    //   duration: 1,
    //   ease: 'Power3.out'
    // });
  }



  return (
    // <div className="w-full min-h-[94vh] mt-[6vh] overflow-hidden  flex flex-col ">
    <div className="w-full h-screen overflow-hidden  flex flex-col ">

    {/* <div className="w-full h-[calc(100vh-6vh)] mt-[6vh] overflow-hidden  flex flex-col "> */}

      {CardData?.map((card, index) => (
        <MobileAnimatedVerticalIndividualCard key={index}
          index={index}
          card={card}
          selectedVerticalTileMobile={selectedVerticalTileMobile}
          setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
          handleCardClick={handleCardClick}
          page={page}
          handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile} />

      ))}
    </div>
  )
}