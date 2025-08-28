import Image from "next/image"
import { CiClock1 } from "react-icons/ci";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import DestinationCardCarousal from "../collections/DestinationCardCarousal";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { trimWords } from "@/app/utils/textHelpers";


export default function DestinationCards({ itineraryData }) {

    const router = useRouter();

    return (
        <>

            {itineraryData.map((destination, index) => (
                // <div key={index} className=" xl:w-[600px] lg:w-[400px] lg:h-[320px] w-[300px] h-auto shadow-xl shadow-stone-400  xl:h-[500px] rounded-lg bg-white  text-black">
                <Link key={index} href={`/itinerary-view/${destination.id}`}>
                    <div className=" cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.09)] w-full xl:min-h-[480px]   lg:min-h-[480px] h-full   rounded-lg bg-white text-dark-28">

                        <div className="relative lg:h-7/12 overflow-hidden rounded-t-lg "> {/* Set your dimensions here */}

                            <DestinationCardCarousal Data={destination.gallery} />

                            <div className=" absolute top-6 -left-1">
                                <div className="relative  ">

                                    <img src='/Icons/PriceTag.svg' className=" object-cover">
                                    </img>

                                    <div className=" absolute flex m-1 items-center  ml-3 inset-0">
                                        <CiClock1 className="text-sm" />
                                        <span className="text-sm max-sm:text-xs ml-1 ">{destination?.days?.length} nights</span>
                                    </div>

                                </div>

                            </div>
                        </div>


                        <div className="px-7 py-4 lg:h-5/12   space-y-3 2xl:space-y-5">
                            <div className=" flex max-md:flex-col justify-between md:items-center">
                                <p className="text-base font-normal">{trimWords(destination.title, 5)}</p>
                                <div className=" flex max-md:flex-col   md:items-center ">
                                    <div className=" flex space-x-0.5 ">

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
                                        <p className="text-sm ml-1 md:hidden font-normal">{destination.rating}</p>

                                    </div>
                                    <p className="text-sm ml-1 max-md:hidden font-normal">{destination.rating}</p>
                                    <div className=" max-md:mt-2 rounded-full border flex justify-center md:ml-3  px-2 py-1.5 lg:px-2 xl:py-2 max-md:w-fit text-nowrap border-[#E4E4E4] text-xs text-[#828282]">{trimWords(destination.category, 3)}</div>

                                </div>
                            </div>
                            <h3 className=" xl:text-xl lg:text-lg  font-medium text-dark-4B ">{trimWords(destination.description, 16)}</h3>
                            <div className=" flex justify-between text-sm">
                                <div className=" text-base">
                                    From <span className="font-medium">$3/ person</span>
                                </div>
                                <div className="flex items-center font-medium cursor-pointer">
                                    <p className=" font-medium text-base">Explore</p>

                                    <img src='/Icons/Arrow.svg' className="ml-1 group-hover:translate-x-2 transition-all duration-700 w-4 lg:w-5 mt-1"></img>

                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>

    )
}