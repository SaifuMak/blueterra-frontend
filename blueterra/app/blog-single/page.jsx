'use client'
import Image from "next/image"
import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"
import Button from "@/components/generalComponents/Button"
import Navbar from "@/components/Navbar/page"
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath"
import Events from "@/components/Journey/Events"
import SmoothScroll from "@/components/SmoothScroll"
import Footer from "@/components/Footer/page"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function BlogSingle() {

    const BlogList = [
        { "image": "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg", "date": "10 May 2025", "description": "Top Stargazing Spots around the World for Unforgettable Views" },
        { "image": "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg", "date": "10 May 2025", "description": "Hidden Villages That Are Truly Worth Discovering and Exploring" },
        { "image": "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg", "date": "10 May 2025", "description": "Best Destinations for Wellness and Mindfulness" },
    ]


    return (

        <div className={` ${rubik.className} w-full text-dark-28 h-full flex flex-col justify-center items-center`} >

            <div className="w-full h-[600px] relative">
                <Image
                    src='/images/blog-single/banner.jpg'
                    alt='quote'
                    fill
                    priority
                    className=" object-cover "
                />
            </div>


            <div className=" w-10/12 mt-20  flex  border">
                <div className=" w-full  h-[190vh]">

                </div>
                <div className=" w-5/12 space-y-10 h-full border-l px-10 ">

                    <div className="">
                        <p className=" text-xl ml-1">Search</p>
                        <div className=" w-full h-10 mt-2 border rounded-full border-[#2A282880]/50 px-4 flex  justify-between items-center ">
                            <input type="text" className="w-[120px] outline-none placeholder:text-sm md:placeholder:text-base" placeholder="Search journal..." />
                            <img src="/Icons/search.svg" alt="search icon " className=" size-4" />
                        </div>
                    </div>

                    <div className="bg-light-beige rounded-2xl px-5 pb-4 pt-7">
                        <h3 className=" text-[24px] mb-5 ">More Blogs</h3>
                        {BlogList?.map((blog, index) => (
                            <div key={index} className=" flex  my-6 space-x-3">
                                <div className=" w-[130px] shrink-0 rounded-lg overflow-hidden h-[130px] relative">
                                    <Image
                                        src={blog.image}
                                        alt='blog'
                                        fill
                                        priority
                                        className=" object-cover "
                                    />
                                </div>
                                <div className="font-light mt-1 ">
                                    <p className=" flex items-center "><img src="/Icons/calender-dark.svg" alt="" className=" size-4 mr-2" /> 10 May 2025</p>
                                    <p className=" leading-7 mt-1">{blog.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className=" w-full h-[600px] rounded-2xl overflow-hidden relative">
                        <Image
                            src='/images/blog-single/mountain-in-sea.png'
                            alt='beach'
                            fill
                            priority
                            className=" object-cover "
                        />
                        <div className=" w-full h-full flex items-end  bg-gradient-to-t from-black via-black/30 to-transparent  absolute inset-0">
                            <div className=" flex flex-col p-5  space-y-3">
                                <h3 className={`text-[30px] pr-7 leading-11  text-white ${playfair.className}`}>Turning your travel dreams into real Adventures.</h3>
                                <Button text='PLAN YOUR TRIP' buttonStyle={` transition-all mb-3 vertically-animated-element duration-500 w-full py-2.5  ease-in-out font-medium  `} />

                            </div>

                        </div>
                    </div>


                    <div className="  space-y-6 w-full h-full pb-6 pt-10 px-5 text-center rounded-2xl bg-dark-beige">
                        <h5 className={`${playfair.className} font-medium text-2xl`}>Join Our Community Today!</h5>
                        <p className=" px-7 font-light">Get started for free and receive instant notifications about updates.</p>
                        <input type="text" className=" text-dark-28 outline-none w-full py-2 pl-4 rounded-md border-2 border-[#979797]/50" placeholder="Enter your email" />
                        <Button text='SUBSCRIBE' buttonStyle={` transition-all mb-3 vertically-animated-element duration-500 w-full py-2.5  ease-in-out font-medium  `} />
                    </div>

                </div>
            </div>

            {/* <div className=" w-10/12 h-[100vh] py-10  relative border ">
                <ResponsiveClipPath outerClass='absolute  bg-red-200 z-30 w-full left-0 top-0 h-10/12' ImagePath='/images/blog-single/related-blogs-clip-path.png' />

            </div> */}
        </div>
    )
}