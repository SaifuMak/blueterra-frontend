'use client'
import React, { useState, useEffect, useRef } from 'react'
import AXIOS_INSTANCE from '@/lib/axios'
import { gsap } from "gsap";
import { rubik, playfair } from '@/app/fonts'
import { trimWords } from '@/app/utils/textHelpers';
import Button from '../generalComponents/Button';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight } from "react-icons/md";

import { MdOutlineArrowForwardIos } from '@/components/reactIcons'

function DealsMobileDevices() {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const cardsRef = useRef([]);
    const bannerRefs = useRef([]); // store 2 banners for crossfade
    const [destinationsData, setDestinationsData] = useState([]);

    const router = useRouter();

    const fetchDestinations = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('get-cruise-deals/')
            setDestinationsData(response?.data || [])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchDestinations()
    }, [])

    const slides = [
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,]

    // Auto-play (optional, can remove if arrows only)
    useEffect(() => {
        if (!slides.length) return;
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    // Animate on index change
    useEffect(() => {
        if (!slides.length) return;

        const tl = gsap.timeline();

        // Slide container (one card per view)
        tl.to(containerRef.current, {
            x: `-${currentIndex * 100}%`,
            duration: 1,
            ease: "power2.inOut",
        });

        // Active card scaling
        if (cardsRef.current[currentIndex]) {
            tl.to(cardsRef.current[currentIndex], { scale: 1.05, duration: 0.8 }, "<");
        }
        if (cardsRef.current[currentIndex - 1]) {
            tl.to(cardsRef.current[currentIndex - 1], { scale: 1, duration: 0.8 }, "<");
        }

        // Title + description sliders
        tl.to(".title-slider", { y: -currentIndex * 70, duration: 0.8, ease: "power3.inOut" }, "<0.2");
        tl.to(".desc-slider", { y: -currentIndex * 200, duration: 0.8, ease: "power3.inOut" }, "<");

        // Crossfade background
        const targetLayer = bannerRefs.current[currentIndex % 2];
        gsap.set(targetLayer, {
            backgroundImage: `url(${slides[currentIndex].image_public_url})`,
        });
        tl.to(targetLayer, { autoAlpha: 1, duration: 1.6 }, 0);
        bannerRefs.current.forEach((layer, idx) => {
            if (layer !== targetLayer) {
                tl.to(layer, { autoAlpha: 0, duration: 1.2 }, 0);
            }
        });
    }, [currentIndex, slides]);

    // Manual navigation
    const handlePrev = () => {
        clearInterval(intervalRef.current);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        clearInterval(intervalRef.current);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };


    return (
        <>
            {slides.length > 0 && (
                <div className="min-h-[100vh] py-10 w-full relative overflow-hidden">
                    {/* Two banners for crossfade */}
                    <div ref={(el) => (bannerRefs.current[0] = el)} className="banner absolute inset-0 bg-cover bg-center" style={{ opacity: 1 }} />
                    <div ref={(el) => (bannerRefs.current[1] = el)} className="banner absolute inset-0 bg-cover bg-center" style={{ opacity: 0 }} />
                    <div className="absolute inset-0 bg-[#0E5181]/60"></div>

                    <div className="max-w-11/12 mx-auto relative  z-10">
                        {/* Header */}
                        <div className="w-full vertically-animated-element text-white px-2 ">
                            <h2 className={`${playfair.className}   text-[30px]`}>Cruise by Destination</h2>
                            <p className={`${rubik.className} mt-2  font-light text-base`}>Choose your perfect getaway by exploring cruises categorized by destination, making it easy to find the voyage that matches your travel dreams.</p>
                        </div>

                        {/* Titles & Descriptions */}
                        <div className="grid grid-cols-1   mt-10 ">
                            <div className="h-[70px]  overflow-hidden">
                                <div className="title-slider">
                                    {slides.map((slide, idx) => (
                                        <div key={slide.id + "-title-" + idx} className="h-[70px] px-2  flex items-center">
                                            <h2 className={`text-3xl font-medium text-white ${playfair.className}`}>
                                                {trimWords(slide.title, 5, '')}
                                            </h2>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[200px]  px-2   overflow-hidden">
                                <div className="desc-slider">
                                    {slides.map((slide, idx) => (
                                        // <div key={slide.id + "-desc-" + idx} className="h-[140px]  px-2  flex items-center">
                                        //     <p className="text-base font-light text-white">{slide.description}</p>
                                        // </div>
                                        <div
                                            key={slide?.id + "-desc-" + idx}
                                            className="h-[200px] text-sm cruise-deals-description flex flex-col justify-center font-light leading-7 text-white"
                                            dangerouslySetInnerHTML={{ __html: slide?.description }}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>


                        {/* Carousel (1 card per view) */}
                        <div className="relative w-full mt-10">
                            <div ref={containerRef} className="flex w-full">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id + "-" + index}
                                        className="w-full flex-shrink-0 px-10"
                                    >
                                        <div ref={(el) => (cardsRef.current[index] = el)} className="carousel-card h-[300px] rounded-2xl shadow-xl overflow-hidden relative">
                                            <img src={slide.image_public_url} alt={slide.title} className="w-full h-full object-cover rounded-2xl" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2 text-center">
                                                <div className="w-full h-full flex flex-col justify-end">
                                                    <p className="mb-2 text-sm ">{slide.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                        </div>

                        <div className=" mt-5 flex-center space-x-6">
                            <button onClick={handlePrev} className=" p-1.5 rounded-sm border-white border  text-white "><MdOutlineArrowForwardIos className=" text-lg rotate-180  " /></button>
                            <button onClick={handleNext} className="   p-1.5 rounded-sm  border-white border  text-white"><MdOutlineArrowForwardIos className=" text-lg " /></button>
                        </div>
                        <div className=" px-4 flex-center mt-5">
                            <a href={slides[currentIndex]?.link}
                                target="_blank"
                                rel="noopener noreferrer" className="">
                                <Button text='EXPLORE' buttonStyle={`px-12 mt-4 text-sm tracking-wider  ${rubik.className} py-2 `} />
                            </a>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default DealsMobileDevices
