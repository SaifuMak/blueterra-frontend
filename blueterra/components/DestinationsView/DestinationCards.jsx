import Image from "next/image"
import { CiClock1 } from "react-icons/ci";


export default function DestinationCards({ Destinations }) {

    return (
        <>

            {Destinations.map((destination, index) => (
                <div key={index} className=" xl:w-[600px] lg:w-[400px] lg:h-[300px] w-[300px] h-auto shadow-md shadow-slate-200  xl:h-[500px] rounded-lg bg-white  text-black">


                    <div className="relative xl:w-[600px] xl:h-[300px] lg:w-[400px] lg:h-[150px] w-[300px] h-[130px] overflow-hidden rounded-t-lg "> {/* Set your dimensions here */}
                        <Image
                            src={destination.image}
                            fill
                            priority={true}
                            alt='Destnations'
                            className="object-cover " // This makes the image cover the container
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        <div className=" absolute top-6 -left-1">
                            <div className="relative ">
                                <img src='/Icons/PriceTag.svg' className=" w-20 object-cover">

                                </img>
                                <div className=" absolute flex m-1 items-center  inset-0">
                                    <CiClock1 className="text-xs" />
                                    <span className="text-sm max-sm:text-xs ml-1 "> 6 days</span>

                                </div>

                            </div>


                        </div>
                    </div>


                    <div className="p-5 space-y-3 2xl:space-y-5">
                        <div className=" flex justify-between">
                            <p className="text-sm font-medium">{destination.place}</p>
                            <p className="text-sm"> Rating 4.5</p>
                            <div className=" rounded-full border flex justify-center max-lg:hidden items-center lg:px-2   border-[#E4E4E4] text-xs text-[#828282]">{destination.category}</div>
                        </div>
                        <h3 className=" xl:text-xl lg:text-lg  font-medium text-black/90">{destination.description}</h3>
                        <div className=" flex justify-between text-sm">
                            <div className="">
                                From <span className="font-medium">${destination.price}</span>
                            </div>
                            <div className="flex items-center font-medium cursor-pointer">
                                <p className="">Read More</p>

                                <img src='/Icons/Arrow.svg' className="ml-2 w-4 mt-1"></img>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
}