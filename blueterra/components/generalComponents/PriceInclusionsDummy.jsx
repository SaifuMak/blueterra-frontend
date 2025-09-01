import { FaCheckCircle, FaTimes } from 'react-icons/fa';

import { rubik } from '@/app/fonts'
import { useLenis } from '../SmoothScroll';

const priceIncludes = [
    { text: "Internal flights", note: "(as detailed)" },
    { text: "Transfers", note: "(as detailed)" },
    { text: "Activities and excursions", note: "(as detailed)" },
    { text: "Accommodation and meals indicated", note: "(as detailed)" },
    { text: "24/7 Support whilst away", note: null },
];

const priceExcludes = [
    "Travel Insurance",
    "Visas",
    "Gratuities",
    "International flights",
];


export default function PriceInclusionsDummy({ itineraryData }) {

    const lenis = useLenis()
    return (
        <div className={`w-full  mx-auto px-4 py-8 ${rubik.className} `}>
            <p className="mb-4 text-gray-800">As detailed in the itinerary:</p>
            <div className="grid text-sm font-light grid-cols-1 md:grid-cols-2 gap-10 ">

                <div className='  '>
                    <h3 className=" font-medium mb-4 ">INCLUDES</h3>
                    <ul className="space-y-3 max-h-44 overflow-y-auto ">
                        {itineraryData?.package_inclusions?.map((item, idx) => (
                            <li
                                key={idx}
                                className={`flex   justify-between`}
                            >
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-green-600 mt-1" />
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
                    <h3 className="font-medium  mb-4">EXCLUDES</h3>
                    <ul className="space-y-3 max-h-44 overflow-y-auto ">
                        {itineraryData?.package_exclusions?.map((item, idx) => (
                            <li key={idx} className="flex items-start  gap-2">
                                <FaTimes className="text-red-600 mt-1" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
