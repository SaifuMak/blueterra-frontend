
import Image from "next/image"
import TitleText from "../generalComponents/TitleText"
import { useIsMobile } from '@/app/hooks/useIsMobile';
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import useGsapOpacity from "@/app/hooks/Gsap/useGsapOpacity";

export default function JourneryIntro() {
    const isMobile = useIsMobile();

    const titleRef = useGsapFadeIn()

    const descriptionRef = useGsapFadeIn()
    const secondDescriptionRef = useGsapFadeIn()

    const imageRef = useGsapOpacity()


    return (
        <div className=" relative   flex-center md:px-10 px-3 bg-white w-full h-full ">

            <div className=" py-10 2xl:py-7 my-20 w-full items-center max-md:space-y-5 max-sm:px-3 max-sm:py-7 max-sm:pt-16 md:space-x-10    justify-center rounded-4xl bg-[#F4FBFF] h-full md:flex   ">

                <div ref={titleRef} className=" lg:w-5/12   md:w-6/12 w-full flex flex-col   max-sm:pl-0 max-lg:pl-5  ">
                    {isMobile ?
                        (
                            <TitleText text='The BlueTerra Approach' className=' font-medium text-center  ' />

                        ) :
                        (
                            <>
                                <TitleText text='The' className=' font-medium  ' />
                                <TitleText text='BlueTerra Approach' className=' font-medium  lg:mt-2  ' />
                            </>
                        )
                    }

                    <p ref={descriptionRef} className=" font-light lg:text-lg 2xl:text-xl  mt-6 lg:leading-8 xl:leading-9 2xl:leading-9 max-sm:text-center  max-w-2xl text-dark-28">At BlueTerra, every journey begins with understanding. We take the time to learn what you hope to feel, discover, and carry home from your travels. Guided by this, we bring together destinations and experiences that are both authentic and seamless. Every element is crafted with care, built on trust, and designed to give you more than memories. They become moments you will share and cherish for years to come.</p>
                    <p ref={secondDescriptionRef} className="font-light lg:text-lg 2xl:text-xl  mt-2 lg:leading-8 xl:leading-9 2xl:leading-9 max-sm:text-center  max-w-2xl text-dark-28">
                        Because true luxury is a journey shaped around you.</p>
                </div>

                <div ref={imageRef} className=" md:w-6/12  flex md:justify-end md:pr-4 ">
                    <div className=" overflow-hidden rounded-2xl">
                        <Image
                            src="/images/our-story/blueterra-approach.jpg"
                            alt="blueterra approach"
                            width={810}
                            height={100}
                            priority
                            className=' rounded-2xl hover:scale-110 transition-all duration-1000 ease-in-out'
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}