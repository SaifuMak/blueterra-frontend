"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from '@/components/reactIcons';

const galleryData = [
    { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
    { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
    { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
    { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
    { name: "Majestic Waterfalls", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg" },
    { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
    { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
    { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
    { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
];

export default function GalleryList({ data }) {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const visibleCards = 5;
    const totalCards = data.length;

    const [cardWidthPct, setCardWidthPct] = useState(20);
    const [gapPercent, setGapPercent] = useState(0);

    // Calculate percentages once container is ready
    useEffect(() => {
        if (containerRef.current) {
            const gapPx = 12; // from gap-x-3
            const totalGapPx = gapPx * (visibleCards - 1);
            const containerWidth = containerRef.current.offsetWidth;

            const availableWidth = containerWidth - totalGapPx;
            const widthPerCardPct = (availableWidth / visibleCards / containerWidth) * 100;
            const gapAsPercent = (gapPx / containerWidth) * 100;

            setCardWidthPct(widthPerCardPct);
            setGapPercent(gapAsPercent);

            // Set initial width for all cards
            cardRefs.current.forEach((el) => {
                gsap.set(el, { flex: `0 0 ${widthPerCardPct}%` });
            });

            setExpandedIndex(2);
            // Expand the 3rd card initially
            handleMouseEnter(2, widthPerCardPct);
        }
    }, []);

    const handleMouseEnter = (index, basePct = cardWidthPct) => {
        setExpandedIndex(index);

        const start = currentIndex;
        const end = currentIndex + visibleCards - 1;
        const bigCardPct = basePct * 3.2; // adjust as you like
        const smallCardPct = basePct * 0.45;

        cardRefs.current.forEach((el, i) => {
            if (i >= start && i <= end) {
                if (i === index) {
                    gsap.to(el, { flex: `0 0 ${bigCardPct}%`, duration: 1, ease: "sine.out" });
                } else {
                    gsap.to(el, { flex: `0 0 ${smallCardPct}%`, duration: 1, ease: "sine.out" });
                }
            }
        });
    };

    const handleMouseLeave = () => {

        const start = currentIndex;
        const end = currentIndex + visibleCards - 1;
        cardRefs.current.forEach((el, i) => {
            if (i >= start && i <= end) {
                gsap.to(el, { flex: `0 0 ${cardWidthPct}%`, duration: 1, ease: "sine.out" });
            }
        });
        setExpandedIndex(null);

    };

    const slideTo = (newIndex) => {
        if (newIndex < 0 || newIndex > totalCards - visibleCards) return;
        setCurrentIndex(newIndex);

        const totalCardSpacePercent = cardWidthPct + gapPercent;
        gsap.to(containerRef.current, {
            xPercent: -(newIndex * totalCardSpacePercent),
            duration: 0.8,
            ease: "sine.out",
        });
    };

    const nextSlide = () => slideTo(currentIndex + 1);
    const prevSlide = () => slideTo(currentIndex - 1);

    return (
        <div className="w-full">
            {/* Carousel */}
            <div className="overflow-hidden rounded-3xl">
                <div ref={containerRef} className="flex w-full gap-x-3">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="relative min-h-[80vh] flex items-center group justify-center cursor-pointer overflow-hidden"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Image
                                src={item.image_public_url}
                                alt={item.title}
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <p className={`text-nowrap ${expandedIndex === index ? 'opacity-100 translate-x-12' : 'opacity-0'}  font-medium absolute delay-200 bottom-10   -left-5 transition-all duration-500 2xl:text-2xl text-white`}>
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center overflow-hidden gap-4 mt-10">
                <button
                    onClick={prevSlide}
                    className="border border-sky-blue-1 group px-2 py-2 rounded cursor-pointer hover:bg-sky-blue-1 transition"
                >
                    <MdOutlineArrowForwardIos className="rotate-180 text-sky-blue-1 group-hover:text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="border border-sky-blue-1 group px-2 py-2 rounded cursor-pointer hover:bg-sky-blue-1 transition"
                >
                    <MdOutlineArrowForwardIos className="text-sky-blue-1 group-hover:text-white" />
                </button>
            </div>
        </div>
    );
}
