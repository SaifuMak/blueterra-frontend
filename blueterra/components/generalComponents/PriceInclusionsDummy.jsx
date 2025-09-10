import { FaCheckCircle, FaTimes } from 'react-icons/fa';

import { rubik } from '@/app/fonts'
import { useHasScrollbar } from '@/app/hooks/useHasScrollbar';


export default function PriceInclusionsDummy({ itineraryData }) {

    const { containerRef, hasScrollbar } = useHasScrollbar([])


    return (
        <div className={`w-full  mx-auto px-4 py-8  ${rubik.className} `}>
            <p className="mb-4 text-gray-800">As detailed in the itinerary:</p>
            <div className="grid text-sm font-light grid-cols-1 md:grid-cols-2 gap-10 ">

                <div className='  '>
                    <h3 className=" font-medium capitalize mb-4 ">Includes</h3>
                    <ul ref={containerRef} className="space-y-3 max-h-44 pb-10 overflow-y-auto " {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
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
                    <ul ref={containerRef} className="space-y-3 max-h-44 pb-10 overflow-y-auto " {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
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
