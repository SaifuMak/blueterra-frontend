import Image from "next/image"
import { CiClock1 } from "react-icons/ci";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import DestinationCardCarousal from "../collections/DestinationCardCarousal";
import { useState } from "react";

export default function DestinationCards({ Destinations }) {

   
    return (
        <>

            {Destinations.map((destination, index) => (
                // <div key={index} className=" xl:w-[600px] lg:w-[400px] lg:h-[320px] w-[300px] h-auto shadow-xl shadow-stone-400  xl:h-[500px] rounded-lg bg-white  text-black">
                <div key={index} className="shadow-xl w-full xl:min-h-[480px]   lg:min-h-[480px]  h-[130px] shadow-stone-400  rounded-lg bg-white text-dark-28">

                    <div className="relative h-7/12 overflow-hidden rounded-t-lg "> {/* Set your dimensions here */}

                        <DestinationCardCarousal  Data={destination.images} />

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


                    <div className="p-5 h-5/12  space-y-3 2xl:space-y-5">
                        <div className=" flex justify-between items-center">
                            <p className="text-base font-normal">{destination.place}</p>
                            <div className=" flex items-center ">
                                <div className=" flex space-x-0.5">

                                    {[...Array(5)].map((_, index) => {
                                        const roundedRating = Math.round(destination.rating * 2) / 2;
                                        const filled = index + 1 <= roundedRating;
                                        const half = index + 0.5 === roundedRating;

                                        return filled ? (
                                            <IoIosStar key={index} className="text-[#FFCB1F] fill-[#FFCB1F]" />
                                        ) : half ? (
                                            <IoIosStarHalf key={index} className="text-[#FFCB1F]" />
                                        ) : (
                                            <IoIosStarOutline key={index} className="text-[#FFCB1F]" />
                                        );
                                    })}
                                </div>
                                <p className="text-sm ml-1 font-normal">{destination.rating}</p>
                                <div className=" rounded-full border flex justify-center ml-3 max-lg:hidden items-center lg:px-2 xl:py-1.5   border-[#E4E4E4] text-xs text-[#828282]">{destination.category}</div>

                            </div>
                        </div>
                        <h3 className=" xl:text-xl lg:text-lg  font-medium ">{destination.description}</h3>
                        <div className=" flex justify-between text-sm">
                            <div className=" text-base">
                                From <span className="font-medium">${destination.price}/ person</span>
                            </div>
                            <div className="flex items-center font-medium cursor-pointer">
                                <p className="">Explore</p>

                                <img src='/Icons/Arrow.svg' className="ml-2 w-4 mt-1"></img>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
}