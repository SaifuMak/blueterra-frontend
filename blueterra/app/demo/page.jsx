'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

import { IoIosStar } from '../../components/reactIcons'


export default function Demo() {



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



    return (
        <div className=" h-screen flex-center ">

            <div className=" border w-full lg:w-10/12 2xl:w-9/12 flex-center">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                    className="w-full "
                >
                    <CarouselContent>

                        {cardData?.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 2xl:p-3 xl:p-0 lg:p-4   xl:basis-1/3 flex-center">

                                <div className="2xl:w-[500px] w-[550px]   border  h-[500px] bg-white mx-4 lg:mx-2">
                                    <div className=" relative  h-[55%] w-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                        />
                                    </div>

                                    <div className=" px-2">

                                        <div className="flex mt-2 items-center justify-between">
                                            <h3 className="font-medium text-xl xl:text-2xl">{item.title}</h3>
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, ind) => (
                                                    <IoIosStar key={ind} className="fill-[#FFCB1F]" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className=" xl:text-lg text-[#6E6E6E]">{item.subtitle}</p>
                                        </div>

                                        <div className="mt-2">
                                            <p className=" font-light">
                                                Donec malesuada, sapien nec interdum facilisis, tortor leo volutpat neque,
                                                in ultrices eros arcu at purus. Curabitur at augue sed met commodo gravida. Donec malesu Read more...
                                            </p>
                                        </div>

                                        <button className=" bg-[#2670B8] cursor-pointer rounded-sm w-full py-2 mt-2 text-white">VIEW ON MAP</button>

                                    </div>
                                </div>



                            </CarouselItem>
                        ))}


                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </div>
    )
}