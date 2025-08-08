import { playfair, rubik } from '@/app/fonts'

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
                    <br />
                    <span className=" text-dark-28 ">(based on 2 ppl sharing)</span>
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
                    <div key={idx} className="flex space-x-2 border-t border-[#CDCDCD] px-6 pt-7 ">
                        {/* Top border */}

                        {/* Icon + title */}
                        <div className="flex  mt-1.5">
                            <img src={item.icon} alt={item.subtitle} className=" size-5.5 object-contain" />
                        </div>

                        {/* Subtitle */}
                        <div className=" ">
                            <h3 className={`text-2xl ${playfair.className} font-medium  text-dark-4B`}>{item.title}</h3>
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
