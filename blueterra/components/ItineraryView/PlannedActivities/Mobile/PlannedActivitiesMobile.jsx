import React from 'react'
import { playfair, rubik } from "@/app/fonts"
import DailyActivities from '../DailyActivities'
import Map from '../Map'
import DestinationsCarousal from '../DestinationsCarousal'
import Details from '../Details'
import { MdInfoOutline, RxCross2 } from "@/components/reactIcons"
import PriceInclusionsDummy from '@/components/generalComponents/PriceInclusionsDummy'
import { useState, useEffect } from 'react'
import { useLenis } from '@/components/SmoothScroll'
import useClickOutside from '@/app/hooks/useClickOutside'
import { BsQuestionLg } from "react-icons/bs";

function PlannedActivitiesMobile({ itineraryData }) {

    const [isPriceInclusionPopupOpened, setIsPriceInclusionPopupOpened] = useState(false)
    const lenis = useLenis();
    const priceInclusionRef = useClickOutside(() => setIsPriceInclusionPopupOpened(false))

    const [dailyActivitiesScrollHeight, setDailyActivitiesScrollHeight] = useState(null)


    useEffect(() => {

        if (isPriceInclusionPopupOpened) {

            lenis?.stop();
            document.body.style.overflow = 'hidden';

        } else {

            lenis?.start();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPriceInclusionPopupOpened, lenis]);


    return (
        <div className="  w-11/12 my-10 ">
            <div className=" flex  mt-10 flex-col vertically-animated-element  items-center  ">
                <h3 className={`text-3xl font-medium ${playfair.className}`}>Planned Activities</h3>
            </div>

            <div className=" mt-10 space-y-10 mx-auto z-10">
                <DailyActivities itineraryData={itineraryData} setDailyActivitiesScrollHeight={setDailyActivitiesScrollHeight} />
                <Map expandCards={1} index={null} itineraryData={itineraryData} />
                <DestinationsCarousal itineraryData={itineraryData} />
                <Details itineraryData={itineraryData} />
            </div>

            <div className="flex items-center peer cursor-pointer mt-8">
                <p className=' text-dark-28'>Inclusions and Exclusions</p>
                <button onClick={() => setIsPriceInclusionPopupOpened(true)} className="  ml-2  p-1 flex-center  bg-sky-blue-dark font-light rounded-full text-sm text-white"><BsQuestionLg /> </button>
            </div>

            {isPriceInclusionPopupOpened && (<div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
                <div ref={priceInclusionRef} className=" bg-white w-11/12 px-3 relative rounded-2xl">
                    <RxCross2 onClick={() => setIsPriceInclusionPopupOpened(false)} className=' absolute text-xl  top-5 right-5' />
                    <PriceInclusionsDummy itineraryData={itineraryData} />
                </div>
            </div>)}
        </div>
    )
}

export default PlannedActivitiesMobile