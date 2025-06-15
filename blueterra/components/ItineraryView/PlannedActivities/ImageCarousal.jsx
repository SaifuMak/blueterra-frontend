import { useRef } from 'react';
import Image from 'next/image';

const ImageCarousal = ({ carousalData }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = current.clientWidth; // one full view width
            current.scrollBy({
                left: direction === 'next' ? scrollAmount : -scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative w-10/12 mx-auto">
            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll scroll-smooth no-scrollbar"
            >
                {carousalData?.map((item, ind) => (
                    <div
                        key={ind}
                        className="w-full flex-shrink-0 h-[400px] relative"
                        style={{ minWidth: '100%' }} // one full width image
                    >
                        <Image
                            src={item.image}
                            alt="image"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <button
                onClick={() => scroll('prev')}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full z-10"
            >
                Prev
            </button>
            <button
                onClick={() => scroll('next')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full z-10"
            >
                Next
            </button>
        </div>
    );
};

export default ImageCarousal;
