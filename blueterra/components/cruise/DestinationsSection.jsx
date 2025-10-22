import { useState } from "react";
import { playfair, rubik } from "@/app/fonts"
import CollectionsList from "../Home/Collections";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import { CRUISE_DESTINATIONS } from "@/constants/cruise-destinations";

function DestinationsSection() {

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)

    const textContainer = useGsapFadeIn()

    const handleCruise = (link) => {
        if(!link) return
        window.open(link, "_blank");
    }


    return (
        <div className="xl:py-16 py-12 ">
            <div className="w-full h-full px-4 md:px-10 bg-white">
                <div className="   bg-sky-blue-light flex flex-col items-center rounded-4xl space-y-6 2xl:space-y-10 xl:space-y-6  px-4 xl:py-16 py-10  2xl:px-10 2xl:py-28 ">
                    <div className=" overflow-hidden flex-col-center w-full space-y-4 md:space-y-6">
                        <h3 className={`${playfair.className}  text-dark-4B heading-text`} >Cruise by Destination</h3>
                        <p className={`2xl:text-2xl xl:text-xl lg:text-lg font-light ${rubik.className} text-dark-28 w-full md:w-8/12  xl:w-6/12 text-center`}>Choose your perfect getaway by exploring cruises categorized by destination, making it easy to find the voyage that matches your travel dreams.</p>
                    </div>
                    <div className=" 2xl:w-11/12 w-full   max-2xl:px-5  rounded-2xl overflow-hidden  mt-8 2xl:mt-4 ">
                        {CRUISE_DESTINATIONS?.length > 0 && <CollectionsList Data={CRUISE_DESTINATIONS} setCurrent={setCurrentCollection} setCount={setCollectionCount} onclickEvent={handleCruise} />}
                    </div>

                    <div className=" flex-center w-full h-full">
                        {CRUISE_DESTINATIONS?.map((_, index) => (
                            <span key={index} className={` h-2 rounded-full translate-all duration-500 ease-in-out  mx-1 ${currentCollection === index + 1 ? '  bg-sky-blue-1 w-10' : 'bg-sky-blue-1/30 w-2'}`}  ></span>
                        ))}
                    </div>
                </div >
            </div >

        </div >
    )
}

export default DestinationsSection