// app/page.tsx or pages/index.tsx
'use client'; // if using app router

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from "@/components/SmoothScroll";

import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"

import IntroCard from '@/components/OurStory/IntroCard';
import MissionVisionValues from '@/components/OurStory/MissionVisionValues';
import WhereItAllBegan from '@/components/OurStory/WhereItAllBegan';
import Image from 'next/image';
import TitleText from '@/components/generalComponents/TitleText';
import WhyTravelWithUs from '@/components/datas/WhyTravelWithUs';
import Button from '@/components/generalComponents/Button';
import Marquee from "react-fast-marquee";
import PartnerCompanies from '@/components/datas/PartnerCompanies';


gsap.registerPlugin(ScrollTrigger);

export default function Home() {

    const sectionsRef = useRef([]);
    const cardsRef = useRef([]);

    const cardComponents = [IntroCard, WhereItAllBegan, MissionVisionValues];

    const boxData = [
        { id: 1, title: 'Box 1', color: 'bg-red-400' },
        { id: 2, title: 'Box 2', color: 'bg-green-400' },
        { id: 3, title: 'Box 3', color: 'bg-blue-400' },
        { id: 4, title: 'Box 4', color: 'bg-yellow-400' },
        { id: 5, title: 'Box 5', color: 'bg-purple-400' },
        { id: 6, title: 'Box 1', color: 'bg-red-400' },
        { id: 7, title: 'Box 2', color: 'bg-green-400' },
        { id: 8, title: 'Box 3', color: 'bg-blue-400' },
        { id: 9, title: 'Box 4', color: 'bg-yellow-400' },
        { id: 10, title: 'Box 5', color: 'bg-purple-400' },
    ];

    const Employees = [
        {
            name: 'Nick Thomas',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
        {
            name: 'James',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
        {
            name: 'Emilia',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
        {
            name: 'William Lucas',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
    ]


    useEffect(() => {
        sectionsRef.current.forEach((section, index) => {
            const card = cardsRef.current[index];
            if (!section || !card) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 50%',
                    end: 'top -40%',
                    scrub: true,
                    markers: true,
                }
            });


            tl.fromTo(card,
                {
                    opacity: 0,
                    y: 300,
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(0px)',
                },
                {
                    opacity: 1,
                    y: 0,
                    backdropFilter: index !== 0 && 'blur(16px)',
                    WebkitBackdropFilter: index !== 0 && 'blur(16px)',
                    duration: 2,
                    ease: 'power2.out'
                }
            ).to(card,
                {
                    opacity: 0,
                    y: -200,
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(0px)',
                    duration: 1,
                    ease: 'power2.in'
                }
            );
        });

        // Cleanup
        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);


    return (

        <SmoothScroll>
            <div className={`${rubik.className}  w-full h-full `}>


                {/* Section containing  3 cards  height for 3 cards*/}
                <div className="relative min-h-[270vh]">

                    {/* Background image*/}
                    <div
                        className="fixed inset-0 h-screen bg-cover bg-center z-0"
                        style={{ backgroundImage: "url('/images/our-story/nature-background.png')" }}
                    />


                    {/* 3 cards thats displayed over fixed background*/}
                    <div className="relative z-20">
                        {cardComponents.map((CardComponent, i) => (
                            <section
                                key={i}
                                ref={(el) => (sectionsRef.current[i] = el)}
                                className="min-h-[90vh] flex items-center justify-center"
                            >
                                <div
                                    ref={(el) => (cardsRef.current[i] = el)}
                                    className="w-9/12 flex justify-center"
                                >
                                    <CardComponent />
                                </div>
                            </section>
                        ))}
                    </div>
                </div>



                {/*   founder and company employees section */}
                <div className="w-full flex-center flex-col border bg-cover bg-center bg-no-repeat  relative" style={{ backgroundImage: "url('/images/our-story/hills.png')" }}>

                    {/* white overlay */}
                    <div className=" absolute inset-0 bg-white/95 w-full h-full z-0" />


                    {/* founder details */}
                    <div className=" w-10/12 items-center border my-32 space-x-6 z-30  flex   "  >
                        <div className=" flex items-end w-7/12 shrink-0    ">
                            <Image
                                src='/images/company/ceo.png'
                                alt='founder & ceo'
                                width={300}
                                height={100}
                                priority
                            />


                            <div className="-mx-6 mb-10">
                                <Image
                                    src="/images/our-story/connection-pipe.png"
                                    alt="connection pipe"
                                    width={120}
                                    height={10}
                                    priority

                                />
                            </div>

                            <div className=" flex flex-col space-y-10">
                                <TitleText text='Meet the Founder' />
                                {/* <h2 className={`${playfair.className} text-nowrap text-[50px] px-6`} >Meet the Founder</h2> */}
                                <div className=" bg-[#EEEFE0] flex-center text-dark-28 py-8 px-10 rounded-2xl flex-col">
                                    <p className=" text-3xl font-medium">Jerald Jacob</p>
                                    <p className=" text-xl">Founder, BlueTerra</p>
                                </div>

                            </div>
                        </div>
                        <div className=" w-5/12 text-dark-28 text-xl space-y-6 font-light leading-10 flex flex-col justify-center">
                            <p className="">With over 15 years of life and work in the UAE, Jerald Jacob has developed a deep connection
                                to the region’s landscapes, cultures, and stories. His love for travel began with a simple curiosity
                                — a desire to understand the world beyond the guidebooks.
                                That curiosity grew into a calling: to create travel experiences that are purposeful,
                                personal, and rooted in authenticity.</p>
                            <p className="">Driven by a vision to make travel more meaningful, Jerald founded BlueTerra
                                — blending his regional insight with a passion for curated,
                                sustainable journeys that inspire and connect.</p>
                        </div>
                    </div>



                    {/* section showing the employees data */}
                    <div className="w-10/12 px-6 py-16 z-30 ">
                        {/* Heading */}
                        <div className="text-center mb-16 ">
                            <TitleText text='Meet the Team' />
                        </div>

                        {/* Team Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full mx-auto">
                            {/* Team Member */}
                            {Employees.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col rounded-2xl items-center w-full text-center  overflow-hidden  transition"
                                >
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={380}
                                        height={100}
                                        priority
                                        className=' rounded-2xl'
                                    />

                                    <h3 className="text-2xl text-dark-28 mt-4 font-medium">{member.name}</h3>
                                    <p className=" text-dark-28 text-xl mt-1">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>



                {/*  why travel with us section */}
                <div className=" w-full h-full px-10  flex-center bg-white overflow-hidden  relative" >
                    <div className=" w-full rounded-4xl flex-center my-20 py-28 relative  overflow-hidden bg-cover bg-center bg-no-repeat  border " style={{
                        backgroundImage: "url('/images/our-story/mountain.png')",
                    }}>
                        <div className="absolute inset-0 rounded-4xl bg-[#0E518199]" />


                        <div className=" flex flex-col space-y-12 w-10/12 relative  ">
                            <div className=" flex flex-col space-y-5 text-white ">
                                <TitleText text='Why Travel with Us' className='text-white' />
                                <p className=" text-2xl font-light max-w-2xl">Discover the difference with personalized service, expert planning, and unforgettable experiences.</p>
                            </div>


                            <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-10  mx-auto">
                                {WhyTravelWithUs?.map((card, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#F4FBFFE5] z-50  text-dark-28 font-light p-10  space-y-3 rounded-2xl shadow-md hover:shadow-lg transition"
                                    >
                                        <img src={card.icon} alt="" className=" size-9 object-cover" />
                                        <h3 className="text-[22px] font-medium ">{card.title}</h3>
                                        <p className=" pr-10 text-xl leading-9  ">{card.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>



                {/*  plan with blueterra  banner */}
                <div className="  relative min-h-[50vh]">
                    <div
                        className=" absolute inset-0  bg-cover bg-center z-0"
                        style={{ backgroundImage: "url('/images/our-story/yellow-banner.png')" }}
                    />
                    <div className=" absolute flex-center py-6 space-y-5 flex-col inset-0  w-full h-full text-center ">
                        <TitleText text='Let’s Begin Your Journey' />
                        <p className=" text-2xl font-light max-w-2xl  text-dark-28 leading-10 ">Share your travel dreams with us—we’ll turn them into unforgettable experiences.</p>
                        <Button text='PlAN WITH BLUETERRA' buttonStyle={`px-6 mt-4  tracking-wider py-2.5`} isHoverWhiteApplied={false} />
                    </div>
                </div>



                {/* Journey intro */}
                <div className=" relative   flex-center px-10 bg-white w-full h-full ">

                    <div className=" py-4 my-20 w-full items-center space-x-10  justify-end rounded-4xl bg-[#F4FBFF] h-full flex   ">

                        <div className=" w-5/12  flex flex-col pl-20 ">
                            <TitleText text='Crafting Journeys' className=' font-medium  ' />
                            <TitleText text=' with Heart' className=' font-medium  ' />
                            <p className=" font-light text-2xl mt-4 leading-10  max-w-2xl text-dark-28">we are passionate about creating meaningful travel experiences that go beyond the ordinary. As a boutique travel company,
                                we specialize in personalized, thoughtful itineraries that reflect your interests, pace, and dreams. </p>
                        </div>

                        <div className=" w-6/12 flex justify-end pr-4 ">
                            <Image
                                src="/images/our-story/girl-holding-globe.png"
                                alt="Woman holding a globe at desk"
                                width={810}
                                height={100}
                                priority
                                className=' rounded-2xl'
                            />
                        </div>

                    </div>

                </div>


                {/* partner companies section */}
                <div className=" w-full flex-center flex-col pb-10  bg-white relative ">

                    <TitleText text='Trusted Brands' />

                    <div className=" 2xl:w-10/12 w-full lg:w-11/12 flex lg:px-10  mt-16 py-3   lg:space-x-20   ">
                        <Marquee pauseOnHover>
                            {PartnerCompanies?.map((data, index) => (
                                <div key={index} className="   group cursor-pointer h-[40px] w-[150px] relative mx-5 lg:mx-10">
                                    <Image
                                        src='/images/partner-company/logo-1.png'
                                        alt="pattern"
                                        fill
                                        className=" object-cover grayscale group-hover:grayscale-0 transition duration-500"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>

            </div>
        </SmoothScroll>

    );
}
