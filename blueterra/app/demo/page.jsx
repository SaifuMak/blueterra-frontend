'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

// Sample array of box items
const boxData = [
    { id: 1, title: 'Box 1', color: 'bg-red-400' },
    { id: 2, title: 'Box 2', color: 'bg-green-400' },
    { id: 3, title: 'Box 3', color: 'bg-blue-400' },
    { id: 4, title: 'Box 4', color: 'bg-yellow-400' },
    { id: 5, title: 'Box 5', color: 'bg-purple-400' },
];


export default function Swipper() {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            // slidesPerView={3}
            slidesPerView='auto'

            loop={true}
            speed={3000} // smoothness of the transition (higher = smoother)
            autoplay={{
                delay: 0, // no delay between transitions
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            allowTouchMove={false} // optional: disable dragging if you want pure auto-scroll
        >
            {boxData.map((box) => (
                <SwiperSlide key={box.id}>
                    <div className={`h-40 flex items-center justify-center text-white text-lg font-semibold rounded-lg ${box.color}`}>
                        {box.title}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
