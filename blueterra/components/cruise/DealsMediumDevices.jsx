import React, { useState, useEffect, useRef } from 'react'
import AXIOS_INSTANCE from '@/lib/axios'
import { gsap } from "gsap";
import { rubik, playfair } from '@/app/fonts'
import { trimWords } from '@/app/utils/textHelpers';
import Button from '../generalComponents/Button';
import { useRouter } from 'next/navigation';
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn';

function DealsMediumDevices() {
    const router = useRouter()
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const cardsRef = useRef([]);
    const bannerRefs = useRef([]); 
    const [destinationsData, setDestinationsData] = useState([])
    const titleContainer = useGsapFadeIn()

    const fetchDestinations = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('get-cruise-deals/')
            setDestinationsData(response?.data || [])
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchDestinations()
    }, [])

    const handleNavigateToDestinations = () => {
        router.push('/destinations')
    }

    const slides = Array(20).fill(destinationsData).flat(); // repeat slides

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev + 1 > slides.length - 2 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    useEffect(() => {
        if (!slides.length) return;

        const tl = gsap.timeline();

        // Slide container (move by 50% each time)
        tl.to(containerRef.current, {
            x: `-${currentIndex * (100 / 2)}%`,
            duration: 1,
            ease: "power2.inOut",
        });

        // Scale active card
        if (cardsRef.current[currentIndex]) {
            tl.to(
                cardsRef.current[currentIndex],
                { scaleY: 1.15, duration: 0.8, delay: 0.5, ease: "sine.out" },
                "<"
            );
        }
        if (cardsRef.current[currentIndex - 1]) {
            tl.to(
                cardsRef.current[currentIndex - 1],
                { scaleY: 1, duration: 0.8, ease: "sine.out" },
                "<"
            );
        }

        // Titles & descriptions
        tl.to(
            ".title-slider",
            { y: -currentIndex * 160, duration: 0.8, ease: "power3.inOut" },
            "<0.2"
        );
        tl.to(
            ".desc-slider",
            { y: -currentIndex * 220, duration: 0.8, ease: "power3.inOut" },
            "<"
        );

        const targetLayer = bannerRefs.current[currentIndex % 3];

        // Update background
        gsap.set(targetLayer, {
            backgroundImage: `url(${slides[currentIndex].image_public_url})`,
        });

        // Fade in target layer
        tl.to(
            targetLayer,
            { autoAlpha: 1, duration: 1.6, ease: "sine.inOut" },
            0
        );

        // Fade out others
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
            {slides?.length > 1 && (
                <div className="min-h-[100vh] w-full relative overflow-hidden">

                    {/* Background banners */}
                    <div
                        ref={(el) => (bannerRefs.current[0] = el)}
                        className="banner absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ opacity: 1, backgroundImage: destinationsData[0] ? `url(${destinationsData[0].image_public_url})` : 'none' }}
                    />
                    <div
                        ref={(el) => (bannerRefs.current[1] = el)}
                        className="banner absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ opacity: 0 }}
                    />
                    <div
                        ref={(el) => (bannerRefs.current[2] = el)}
                        className="banner absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ opacity: 0 }}
                    />

                    <div className="absolute w-full h-full inset-0 bg-[#0E5181]/70"></div>

                    <div className="max-w-11/12 mx-auto">
                        <div className="w-full text-white relative py-20">
                            <h2 className={`${playfair.className} vertically-animated-element text-[45px] xl:text-[50px]`}>
                                Featured Deals
                            </h2>
                            <p className={`${rubik.className} mt-4 vertically-animated-element leading-8 font-light w-7/12 xl:w-6/12 2xl:w-5/12 text-xl xl:text-2xl`}>
                                Exclusive travel offers designed to make your dream journeys affordable and unforgettable.
                            </p>
                        </div>

                        <div className="w-full mx-auto items-center pb-5 grid grid-cols-12">

                            {/* LEFT SECTION */}
                            <div className="2xl:col-span-3 col-span-4 relative flex flex-col">
                                <div className="h-[160px] overflow-hidden">
                                    <div className="title-slider">
                                        {slides.map((slide, idx) => (
                                            <div
                                                key={slide?.id + "-title-" + idx}
                                                className="h-[160px] flex items-center"
                                            >
                                                <h2 className={`xl:text-7xl text-6xl font-medium text-white ${playfair.className}`}>
                                                    {trimWords(slide.title, 2, '')}
                                                </h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[220px] overflow-hidden">
                                    <div className="desc-slider">
                                        {slides.map((slide, idx) => (
                                            <div
                                                key={slide?.id + "-desc-" + idx}
                                                className="h-[220px] text-lg cruise-deals-description flex flex-col justify-center font-light leading-8 text-white"
                                                dangerouslySetInnerHTML={{ __html: slide?.description }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    text='EXPLORE'
                                    buttonStyle={`px-12 mt-4 text-sm tracking-wider ${rubik.className} py-2`}
                                    onClickFunction={handleNavigateToDestinations}
                                />
                            </div>

                            {/* RIGHT SECTION: Carousel */}
                            <div className="2xl:col-span-9 col-span-8 relative w-full overflow-hidden py-12 ml-7 2xl:ml-20">
                                <div ref={containerRef} className="flex w-full">
                                    {slides.map((slide, index) => (
                                        <div
                                            key={slide?.id + "-" + index}
                                            className="w-full sm:w-1/2 flex-shrink-0 cursor-pointer px-2 2xl:px-5"
                                            onClick={() => handleClick(index)}
                                        >
                                            <div
                                                ref={(el) => (cardsRef.current[index] = el)}
                                                className="carousel-card 2xl:h-[440px] xl:h-[330px] h-[300px] rounded-2xl shadow-xl overflow-hidden relative"
                                            >
                                                <img
                                                    src={slide.image_public_url}
                                                    alt={slide.title}
                                                    className="w-full h-full object-cover rounded-2xl"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2 text-center">
                                                    <div className="w-full h-full flex flex-col justify-end">
                                                        <p className="mb-2 text-base">{slide.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DealsMediumDevices
