'use client'
import { useRef } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';
import { IoIosStar } from '../reactIcons'


const cardData = [
    {
        image: '/images/static/room1.png',
        title: 'Deluxe Room',
        subtitle: 'Comfort meets elegance',
        description: 'Spacious room with a king-size bed, city view, and modern amenities for a relaxing stay.',
    },
    {
        image: '/images/static/room2.png',
        title: 'Executive Suite',
        subtitle: 'Luxury redefined',
        description: 'A lavish suite with separate living area, premium furnishings, and personalized services.',
    },
    {
        image: '/images/static/room1.png',
        title: 'Family Room',
        subtitle: 'Perfect for all',
        description: 'Comfortable and spacious, ideal for families with multiple beds and kid-friendly features.',
    },
    {
        image: '/images/static/room2.png',
        title: 'Pool View Room',
        subtitle: 'Serenity by the pool',
        description: 'Enjoy tranquil views of the poolside, with access to a private balcony and cozy interiors.',
    },
    {
        image: '/images/static/room1.png',
        title: 'Ocean View Room',
        subtitle: 'Wake up to waves',
        description: 'Breathtaking views of the sea, perfect for a romantic or peaceful retreat.',
    },
    {
        image: '/images/static/room2.png',
        title: 'Penthouse Suite',
        subtitle: 'Top-tier experience',
        description: 'The finest in luxury, with panoramic views, private terrace, and exceptional service.',
    },
    {
        image: '/images/static/room1.png',
        title: 'Twin Room',
        subtitle: 'Stylish sharing',
        description: 'Ideal for friends or colleagues, featuring two single beds and modern décor.',
    },
    {
        image: '/images/static/room1.png',
        title: 'Business Room',
        subtitle: 'Work and unwind',
        description: 'Designed for business travelers, with workspace, fast Wi-Fi, and quiet environment.',
    },
];


export default function ThreeItemsCarousel() {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        const container = scrollRef.current;
        if (container) {
            const screenWidth = window.innerWidth;
            const gap = 48; // gap-12
            const cardWidth = screenWidth >= 1024 ? 360 : 300; // lg: 360, sm: 300
            const cardsPerSlide = screenWidth >= 1024 ? 3 : 2;
            const scrollAmount = (cardWidth + gap) * cardsPerSlide;

            container.scrollBy({
                left: dir === 'next' ? scrollAmount : -scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative w-full max-w-[1200px] mx-auto px-4">
            <div className="overflow-hidden border rounded-lg">
                <div
                    ref={scrollRef}
                    className="flex gap-12 overflow-x-auto scroll-smooth no-scrollbar"
                >
                    {cardData.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[360px] md:w-[300px] bg-white border rounded-xl shadow p-4"
                        >
                            <div className="h-[300px] w-full relative">
                                <Image
                                    src={item.image}
                                    alt="room"
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <div className="flex mt-3 items-center justify-between">
                                <h3 className="font-medium text-xl">{item.title}</h3>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, ind) => (
                                        <IoIosStar key={ind} className="fill-[#FFCB1F]" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{item.subtitle}</p>
                            <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                                Donec malesuada, sapien nec interdum facilisis, tortor leo volutpat
                                neque, in ultrices eros arcu at purus. Curabitur at augue sed met
                                commodo gravida.
                            </p>

                            <button className="w-full mt-3 text-white text-sm py-2 bg-[#2670B8] rounded-md">
                                VIEW ON MAP
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1 z-10">
                <button
                    onClick={() => scroll('prev')}
                    className="p-2 bg-white rounded-full shadow"
                >
                    <MdOutlineKeyboardArrowLeft size={24} />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-1 z-10">
                <button
                    onClick={() => scroll('next')}
                    className="p-2 bg-white rounded-full shadow"
                >
                    <MdOutlineKeyboardArrowRight size={24} />
                </button>
            </div>
        </div>
    );
}
