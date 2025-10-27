import Image from "next/image"
import { CiClock1 } from "react-icons/ci";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import DestinationCardCarousal from "../collections/DestinationCardCarousal";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { trimWords } from "@/app/utils/textHelpers";


export default function DestinationCards({ itineraryData }) {

    return (
        <>

            {itineraryData.map((destination, index) => (
                // <div key={index} className=" xl:w-[600px] lg:w-[400px] lg:h-[320px] w-[300px] h-auto shadow-xl shadow-stone-400  xl:h-[500px] rounded-lg bg-white  text-black">
                <Link key={index} href={`/itinerary/${destination.slug}`}>
                    <div className=" cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.09)] w-full xl:min-h-[480px]   lg:min-h-[480px] h-full   rounded-lg bg-white text-dark-28">

                        <div className="relative lg:h-7/12 overflow-hidden rounded-t-lg "> {/* Set your dimensions here */}

                            <DestinationCardCarousal Data={destination.gallery} />

                            <div className=" absolute top-6 -left-1">
                                <div className="relative  ">

                                    <img src='/Icons/PriceTag.svg' className=" object-cover">
                                    </img>

                                    <div className=" absolute flex m-1 items-center  ml-3 inset-0">
                                        <CiClock1 className="text-sm" />
                                        <span className="text-sm max-sm:text-xs ml-1 ">{destination?.days?.length - 1} nights</span>
                                    </div>

                                </div>

                            </div>
                        </div>


                        <div className="px-7 py-4 lg:h-5/12   space-y-3 2xl:space-y-5">
                            <div className=" flex max-xl:flex-col justify-between xl:items-center  space-x-3">
                                <p className="text-base font-semibold max-sm:text-dark-4B">{trimWords(destination?.title, 35)}</p>
                                <div className=" flex max-md:flex-col   md:items-center max-xl:mt-2 ">
                                    {/* <div className=" flex space-x-0.5 ">

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
                                        <p className="text-sm ml-1 md:hidden font-normal">{destination?.rating}</p>

                                    </div> */}

                                    <div className="flex space-x-0.5">
                                        {/* {[...Array(5)].map((_, index) => (
                                            <IoIosStar key={index} className="text-[#FFCB1F] fill-[#FFCB1F]" />
                                        ))} */}
                                        {[...Array(5)].map((_, ratingIndex) => (
                                            <IoIosStar key={ratingIndex} className={` ${ratingIndex + 1 <= destination?.general_rating ? 'fill-[#FFCB1F]' : 'fill-slate-200'} size-4 cursor-pointer`} />
                                        ))}
                                        <p className="text-sm ml-1 md:hidden font-normal">{destination?.general_rating}</p>
                                    </div>

                                    <p className="text-sm ml-1 mt-1 max-md:hidden font-normal text-dark-2B">{destination?.general_rating}</p>
                                    {/* <div className=" max-md:mt-2 rounded-full border flex justify-center md:ml-3  px-2 py-1.5 lg:px-2 xl:py-2 max-md:w-fit text-nowrap border-[#E4E4E4] text-xs text-[#828282]">{trimWords(destination?.category?.title, 3)}</div> */}

                                </div>
                            </div>

                            <div className=" flex space-x-3 ">
                                <div className=" max-md:mt-2 rounded-full border flex justify-center  px-2 py-1.5 lg:px-3 xl:py-2 w-fit text-nowrap border-[#E4E4E4] text-xs text-[#828282]">{trimWords(destination?.country?.title, 7)}</div>

                                <div className=" max-md:mt-2 rounded-full border flex justify-center  px-2 py-1.5 lg:px-3 xl:py-2 w-fit text-nowrap border-[#E4E4E4] text-xs text-[#828282]">{trimWords(destination?.category?.title, 7)}</div>
                            </div>

                            {/* <h3 className=" lg:text-lg  text-sm  md:font-normal text-dark-2B ">{trimWords(destination?.description, 16)}</h3> */}
                            <div className=" text-[15px]  md:font-normal text-dark-2B" dangerouslySetInnerHTML={{
                                __html: trimWords(destination?.description, 16),
                            }} />

                            <div className=" flex justify-between text-sm">
                                <div className=" lg:text-base">
                                    {destination?.featured_points?.[0]?.price ? (
                                        <p className="">From <span className=" text-dark-28  ">{destination?.featured_points?.[0]?.price}/person</span></p>

                                    ) : (
                                        <p className=" hover:underline  "> Price available on request </p>
                                    )}
                                </div>
                                <div className="flex items-center  cursor-pointer">
                                    <p className=" md:font-medium lg:text-base text-dark-28">Explore</p>

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