import { playfair, rubik } from '@/app/fonts'
import { MdInfoOutline, IoMdArrowDropup } from '@/components/reactIcons'
import PriceInclusionsDummy from '../generalComponents/PriceInclusionsDummy';
import TravelInfoDummy from '../generalComponents/PriceAdditionalInformation';

export default function TravelInfo({ icon, title, subtitle, additionalInformation }) {


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

                        <div className="flex peer cursor-pointer ">
                            <MdInfoOutline className="mt-3 ml-2  text-dark-28" />
                        </div>

                        <div className="absolute top-8 left-4/4  -translate-x-3/4 rounded-2xl  min-h-[200px] max-w-[600px] min-w-[450px] z-[999] hidden 
                                        peer-hover:block group-hover:block hover:block
                                        transition-all duration-300">

                            <div className="relative mt-6  bg-white  !z-[1999] rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.15)]  ">
                                <IoMdArrowDropup className="text-4xl text-white absolute  left-1/2 -translate-x-1/2 -top-5" />
                                <TravelInfoDummy additionalInformation={additionalInformation} />
                            </div>
                        </div>
                    </div>}

                </div>

                {subtitle && (

                    <p className={`${rubik.className}  mt-2  lg:mt-3 font-light`}  >
                        {title === 'Price start from' ? `From ${subtitle}pp excl. flights` : `${subtitle}`}
                       
                    </p>
                )}
            </div>

        </div>

    );
}
