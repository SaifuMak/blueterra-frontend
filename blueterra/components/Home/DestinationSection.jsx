import React from 'react'
import AXIOS_INSTANCE from '@/lib/axios'
import { useState, useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { DESTINATIONS_COLLECTIONS } from '@/constants/home-destinations';
import { rubik, playfair } from '@/app/fonts'
import { trimWords } from '@/app/utils/textHelpers';
import Button from '../generalComponents/Button';

import { useRouter } from 'next/navigation';
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn';

function DestinationSection() {

    const router = useRouter()

    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const cardsRef = useRef([]);
    const bannerRefs = useRef([]); // store 2 banners for crossfade
    const [destinationsData, setDestinationsData] = useState([])

    const titleContainer = useGsapFadeIn()

    const fetchDestinations = async () => {

        try {
            const response = await AXIOS_INSTANCE.get('get-destinations/')
            setDestinationsData(response?.data || [])
        }
        catch (error) {

        }
        finally {

        }
    }

    useEffect(() => {
        fetchDestinations()
    }, [])

    const handleNavigateToDestinations = () => {
        router.push('/destinations')
    }


    const slides = [
        ...destinationsData,
        ...destinationsData,
        ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,
        ...destinationsData, ...destinationsData,

    ];


    // Auto-play
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev + 1 > slides.length - 3 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    // Animate everything on index change
    useEffect(() => {

        if (!slides.length) return;

        const tl = gsap.timeline();

        // Slide container
        tl.to(containerRef.current, {
            x: `-${currentIndex * (100 / 3)}%`,
            duration: 1,
            ease: "power2.inOut",
        });

        // Scale active card
        if (cardsRef.current[currentIndex]) {
            tl.to(
                cardsRef.current[currentIndex],
                { scaleY: 1.15, duration: 0.8, delay: 0.5, ease: "sine.out" },
                "<" // start with slide animation
            );
        }
        if (cardsRef.current[currentIndex - 1]) {
            tl.to(
                cardsRef.current[currentIndex - 1],
                { scaleY: 1, duration: 0.8, ease: "sine.out" },
                "<"
            );
        }

        // Titles & descriptions (replace querySelector with refs if possible)
        tl.to(
            ".title-slider",
            { y: -currentIndex * 160, duration: 0.8, ease: "power3.inOut" },
            "<0.2"
        );
        tl.to(
            ".desc-slider",
            { y: -currentIndex * 170, duration: 0.8, ease: "power3.inOut" },
            "<"
        );


        const targetLayer = bannerRefs.current[currentIndex % 3];

        // Update background on the target layer
        gsap.set(targetLayer, {
            backgroundImage: `url(${slides[currentIndex].banner_image_public_url})`,
        });

        // Fade in target layer
        tl.to(
            targetLayer,
            { autoAlpha: 1, duration: 1.6, ease: "sine.inOut" },
            0
        );

        // Fade out all other layers
        bannerRefs.current.forEach((layer, idx) => {
            if (layer !== targetLayer) {
                tl.to(
                    layer,
                    { autoAlpha: 0, duration: 1.2, ease: "sine.inOut" },
                    0
                );
            }
        });

    }, [currentIndex]);

    const handleClick = (index) => {
        setCurrentIndex(index);
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
    };


    return (
        <>
            {slides?.length > 1 && (<div className="min-h-[110vh] w-full relative overflow-hidden">

                {/* Two banners for crossfade */}
                <div
                    ref={(el) => (bannerRefs.current[0] = el)}
                    className="banner absolute inset-0  bg-cover bg-center bg-no-repeat"
                    style={{ opacity: 1 }}
                />
                <div
                    ref={(el) => (bannerRefs.current[1] = el)}
                    className="banner absolute  inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ opacity: 0 }}
                />
                <div
                    ref={(el) => (bannerRefs.current[2] = el)}
                    className="banner absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ opacity: 0 }}
                />

                <div className=" absolute w-full h-full inset-0 bg-[#0E5181]/60"></div>


                <div className="max-w-11/12 mx-auto  ">

                    <div className=" w-full   text-white relative  py-20   ">
                        <h2 className={` ${playfair.className} vertically-animated-element text-[45px] xl:text-[50px]`}>Our Destination Highlights</h2>
                        <p className={`${rubik.className} mt-4 vertically-animated-element leading-8 font-light w-7/12 xl:w-6/12 2xl:w-5/12  text-xl  xl:text-2xl`}>Discover destinations that reflect the essence of BlueTerra</p>

                    </div>

                    <div className=" w-full  mx-auto items-center  py-5 grid grid-cols-12 ">

                        {/* LEFT SECTION */}
                        <div className="2xl:col-span-3 col-span-4 relative flex flex-col">
                            {/* Title area */}
                            <div className="h-[160px]   overflow-hidden">
                                <div className="title-slider">
                                    {slides.map((slide, idx) => (
                                        <div
                                            key={slide.id + "-title-" + idx}
                                            className="h-[160px] flex items-center"
                                        >
                                            <h2 className={`xl:text-7xl text-6xl font-medium    text-white ${playfair.className}`}>
                                                {trimWords(slide.title, 2, '')}
                                            </h2>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Separator */}
                            {/* <div className="h-[6px] border w-12 bg-gray-400/40 my-2"></div> */}

                            {/* Description area */}
                            <div className="h-[170px]   overflow-hidden">
                                <div className="desc-slider">
                                    {slides.map((slide, idx) => (
                                        <div
                                            key={slide.id + "-desc-" + idx}
                                            className="h-[170px] flex items-center"
                                        >
                                            <p className="text-xl  font-light leading-8 text-white ">
                                                {slide.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button text='EXPLORE' buttonStyle={`px-12 mt-4 text-sm tracking-wider ${rubik.className} py-2 `} onClickFunction={handleNavigateToDestinations} />
                        </div>

                        {/* RIGHT SECTION: Carousel */}
                        <div className="2xl:col-span-9 col-span-8 relative w-full overflow-hidden py-12 ml-7 2xl:ml-20 ">
                            <div ref={containerRef} className="flex w-full">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id + "-" + index}
                                        className="w-1/3 flex-shrink-0 cursor-pointer px-2 2xl:px-5"
                                        onClick={() => handleClick(index)}
                                    >
                                        <div
                                            ref={(el) => (cardsRef.current[index] = el)}
                                            className="carousel-card 2xl:h-[440px] xl:h-[330px] h-72 rounded-2xl shadow-xl overflow-hidden relative"
                                        >
                                            <img
                                                src={slide.banner_image_public_url}
                                                alt={slide.alt}
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2 text-center">
                                                <div className="w-full h-full flex flex-col justify-end ">
                                                    <p className=" mb-2 text-base">{slide.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>)}
        </>
    );
}

export default DestinationSection
