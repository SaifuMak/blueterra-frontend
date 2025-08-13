import { playfair, rubik } from '@/app/fonts'
import { MdInfoOutline, IoMdArrowDropup } from '@/components/reactIcons'
import PriceInclusionsDummy from '../generalComponents/PriceInclusionsDummy';
import TravelInfoDummy from '../generalComponents/TravelInfoDummy';
export default function TravelInfo() {

    const items = [
        {
            icon: "/Icons/Itinerary/leaf.svg",
            title: "Best Time to Travel",
            subtitle: "Jun–Oct / Dec–Jan"
        },
        {
            icon: "/Icons/Itinerary/dollar.svg",
            title: "Price start from",
            subtitle: (
                <>
                    From $8,000pp excl. flights
                 
                </>
            )
        },
        {
            icon: "/Icons/Itinerary/ballon.svg",
            title: "Adventures in Motion",
            subtitle: ""
        }
    ];


    return (
        <div className="  bg-white pb-28">
            <div className=" w-10/12 mx-auto flex justify-between ">
                {items.map((item, idx) => (
                    <div key={idx} className="flex space-x-2 border-y border-[#CDCDCD] px-6 py-7 ">
                        {/* Top border */}

                        {/* Icon + title */}
                        <div className="flex  mt-1.5">
                            <img src={item.icon} alt={item.subtitle} className=" size-5.5 object-contain" />
                        </div>

                        {/* Subtitle */}
                        <div className="    ">

                            <div className=" flex">
                                <h3 className={`text-2xl ${playfair.className} font-medium  text-nowrap text-dark-4B`}>{item.title}</h3>

                                <div className="relative flex w-full group">
                                    {/* Trigger */}
                                    <div className="flex peer cursor-pointer">
                                        <MdInfoOutline className="mt-3 ml-2 text-dark-4B" />
                                    </div>

                                    {/* Popup */}
                                    <div className="absolute bottom-6 left-3/4 -translate-x-3/4 min-h-[200px] max-w-[600px] min-w-[450px] z-[999] hidden 
                                        peer-hover:block group-hover:block hover:block
                                        transition-all duration-300">

                                        <div className="relative mb-4 border  !z-[1999] rounded-xl shadow-2xl bg-white">
                                            <IoMdArrowDropup className="text-4xl text-white absolute left-1/2 -translate-x-1/2 rotate-180 -bottom-5" />
                                            <TravelInfoDummy />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {item.subtitle && (

                                <p className={`${rubik.className}   mt-3 font-light`}  >
                                    {item.subtitle}
                                </p>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
