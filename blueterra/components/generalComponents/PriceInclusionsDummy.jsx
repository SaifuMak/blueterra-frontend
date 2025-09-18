import { FaCheckCircle, FaTimes } from 'react-icons/fa';

import { rubik } from '@/app/fonts'
import { useHasScrollbar } from '@/app/hooks/useHasScrollbar';
import { useMediaQuery } from 'react-responsive'


export default function PriceInclusionsDummy({ itineraryData }) {

    const isSmallerScreen = useMediaQuery({
        query: '(max-width: 1024px)'
    })

    const { containerRef, hasScrollbar } = useHasScrollbar([])



    return (
        <div className={`w-full  mx-auto px-4 py-8  ${rubik.className} `}>
            <p className="mb-4 text-gray-800">As detailed in the itinerary:</p>
            <div className="grid text-sm font-light grid-cols-1 lg:grid-cols-2 lg:gap-10  max-lg:max-h-[400px] max-lg:overflow-y-auto " {...(isSmallerScreen ? { 'data-lenis-prevent': true } : {})}>

                <div className='  '>
                    <h3 className=" font-medium capitalize mb-4 ">Includes</h3>
                    <ul ref={containerRef} className="space-y-3 lg:max-h-44 pb-10 lg:overflow-y-auto " {...(hasScrollbar && !isSmallerScreen ? { 'data-lenis-prevent': true } : {})}>
                        {itineraryData?.package_inclusions?.map((item, idx) => (
                            <li
                                key={idx}
                                className={`flex   justify-between`}
                            >
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-green-600 mt-1 shrink-0" />
                                    <span>{item.title}</span>
                                </div>
                                {/* {item.title && (
                                    <span className="text-gray-500 text-nowrap  ml-3">as detailed</span>
                                )} */}
                            </li>
                        ))}
                    </ul>
                </div>


                <div className=''>
                    <h3 className="font-medium  mb-4">Excludes</h3>
                    <ul ref={containerRef} className="space-y-3 lg:max-h-44 pb-10 lg:overflow-y-auto " {...(hasScrollbar && !isSmallerScreen ? { 'data-lenis-prevent': true } : {})}>
                        {itineraryData?.package_exclusions?.map((item, idx) => (
                            <li key={idx} className="flex items-start  gap-2">
                                <FaTimes className="text-red-600 mt-1 shrink-0" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
