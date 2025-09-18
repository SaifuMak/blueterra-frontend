import { playfair, rubik } from '@/app/fonts'
import { MdInfoOutline, IoMdArrowDropup, RxCross2 } from '@/components/reactIcons'
import PriceInclusionsDummy from '../generalComponents/PriceInclusionsDummy';
import TravelInfoDummy from '../generalComponents/PriceAdditionalInformation';
import PriceAdditionalInformation from '../generalComponents/PriceAdditionalInformation';
import { useState, useEffect } from 'react';
import { useLenis } from '../SmoothScroll';
import useClickOutside from '@/app/hooks/useClickOutside';
import { BsQuestionLg } from "react-icons/bs";


export default function TravelInfo({ icon, title, subtitle, additionalInformation }) {

    const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
    const lenis = useLenis();
    const InfoRef = useClickOutside(() => setIsMobileInfoOpen(false))



    useEffect(() => {

        if (isMobileInfoOpen) {

            lenis?.stop();
            document.body.style.overflow = 'hidden';

        } else {

            lenis?.start();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileInfoOpen, lenis]);



    return (

        <div className="flex space-x-2 lg:border-y border-[#CDCDCD] lg:px-6 lg:py-7 py-3 ">
            {/* Top border */}

            {/* Icon + title */}
            <div className="flex  mt-1.5">
                <img src={icon} alt={title} className=" size-4  lg:size-5.5 object-contain" />
            </div>

            {/* Subtitle */}
            <div className=" ">

                <div className=" flex group ">
                    <h3 className={` text-lg lg:text-2xl ${playfair.className} ${additionalInformation && 'cursor-pointer'}  font-medium  text-nowrap text-dark-4B`}>{title}</h3>

                    {additionalInformation && <div className="relative  flex w-full ">

                        <div className="flex peer cursor-pointer max-lg:hidden ">
                            <MdInfoOutline className="mt-3 ml-2  text-dark-28" />
                        </div>

                        <div className="flex peer cursor-pointer lg:hidden" >
                            {/* <button onClick={() => setIsMobileInfoOpen(true)} className="  ml-2  mt-1 shrink-0  size-5 flex-center  bg-sky-blue-dark font-light rounded-full text-sm text-white"><MdInfoOutline /> </button> */}
                            <button onClick={() => setIsMobileInfoOpen(true)} className=" ml-2"><MdInfoOutline className=' text-dark-28 shrink-0 text-lg' /> </button>

                        </div>


                        <div className="absolute max-sm:hidden top-8 left-4/4  -translate-x-3/4 rounded-2xl  min-h-[200px] max-w-[600px] min-w-[450px] z-[999] hidden 
                                        peer-hover:block group-hover:block hover:block
                                        transition-all duration-300">

                            <div className="relative mt-6  bg-white  !z-[1999] rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.15)]  ">
                                <IoMdArrowDropup className="text-4xl text-white absolute  left-1/2 -translate-x-1/2 -top-5" />
                                <PriceAdditionalInformation additionalInformation={additionalInformation} />
                            </div>
                        </div>
                    </div>}

                </div>

                {subtitle && (
                    <p className={`${rubik.className}  mt-1  max-sm:text-sm lg:mt-3 font-light`}  >
                        {title === 'Price start from' ? `From ${subtitle}pp excl. flights` : `${subtitle}`}

                    </p>
                )}

                {isMobileInfoOpen && (
                    <div className="fixed inset-0 lg:hidden flex items-center justify-center bg-black/10 z-50">
                        <div ref={InfoRef} className="relative bg-white max-w-11/12 rounded-2xl">
                            <RxCross2 onClick={() => setIsMobileInfoOpen(false)} className=' absolute text-xl  top-5 right-5' />
                            <PriceAdditionalInformation additionalInformation={additionalInformation} />
                        </div>
                    </div>
                )}


            </div>

        </div>


    );
}
