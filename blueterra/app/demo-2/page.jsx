"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

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

export default function Carousel() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 5;
  const totalCards = galleryData.length;

  useEffect(() => {
    cardRefs.current.forEach((el) => {
      gsap.set(el, { flex: "0 0 20%" }); // 5 cards, each 20%
    });
  }, []);

  const handleMouseEnter = (index) => {
    cardRefs.current.forEach((el, i) => {
      if (i === index) {
        gsap.to(el, {
          flex: "0 0 70%", // hovered grows
          duration: 1,
          ease: "power1.out",
        });
      } else {
        gsap.to(el, {
          flex: "0 0 15%", // others shrink
          duration: 1,
          ease: "power1.out",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    cardRefs.current.forEach((el) => {
      gsap.to(el, {
        flex: "0 0 20%", // reset
        duration: 1,
        ease: "power1.out",
      });
    });
  };

  const slideTo = (newIndex) => {
    if (newIndex < 0 || newIndex > totalCards - visibleCards) return;
    setCurrentIndex(newIndex);
    const offset = -(newIndex * (100 / visibleCards));
    gsap.to(containerRef.current, {
      xPercent: offset,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };

  const nextSlide = () => slideTo(currentIndex + 1);
  const prevSlide = () => slideTo(currentIndex - 1);

  return (
    <div className="w-full">
      {/* Carousel */}
      <div className="overflow-hidden">
        <div ref={containerRef} className="flex">
          {galleryData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative h-[90vh] flex items-center justify-center cursor-pointer overflow-hidden"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover "
              />

            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prevSlide}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
           Prev
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Next 
        </button>
      </div>
    </div>
  );
}
