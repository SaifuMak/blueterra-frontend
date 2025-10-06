"use client";
import React from 'react'
import Marquee from "react-fast-marquee";
import { testimonials } from '@/constants/testimonials';
import {playfair} from '@/app/fonts'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn';

function TestimonialsForMobile() {
     const testimonialTitleRef = useGsapFadeIn()
    return (
        <div className=" flex   bg-sky-blue-light py-10 ">
            <div className=" w-11/12  mx-auto rounded-2xl  bg-white pt-10 pb-2">
                <div ref={testimonialTitleRef} className="flex flex-col mb-8">
                    <h2 className={`${playfair.className}   text-center heading-text max-sm:px-2`}>Trusted By Customers</h2>
                    <p className=" text-center mt-3  font-light max-sm:px-5">Experiences Shared by Our Travelers</p>
                </div>
                <Marquee pauseOnHover pauseOnClick={false} speed={60}>
                    {testimonials?.map((testimonial, index) => (
                        <div key={index} className=" z-20  mx-5  my-4  py-10 px-5 bg-white  h-fit w-[300px]     rounded-2xl " style={{ boxShadow: '0 0 25px 1px rgba(153, 189, 188, 0.3)', }} >
                            <p className=" font-light md:leading-8 leading-7  ">{testimonial.message}</p>
                            <p className=" text-sky-blue-dark mt-5">{testimonial.name}</p>
                            <p className=" font-light mt-2">{testimonial.country}</p>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

export default TestimonialsForMobile