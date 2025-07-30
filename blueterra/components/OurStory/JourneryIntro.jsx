
import Image from "next/image"
import TitleText from "../generalComponents/TitleText"
import { useIsMobile } from '@/app/hooks/useIsMobile';
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import useGsapOpacity from "@/app/hooks/Gsap/useGsapOpacity";

export default function JourneryIntro() {
    const isMobile = useIsMobile();

    const titleRef = useGsapFadeIn()

    const descriptionRef = useGsapFadeIn()
    const imageRef = useGsapOpacity()


    return (
        <div className=" relative   flex-center md:px-10 px-3 bg-white w-full h-full ">

            <div className=" py-4 my-20 w-full items-center max-sm:space-y-5 max-sm:px-3 max-sm:py-7 md:space-x-10  justify-end rounded-4xl bg-[#F4FBFF] h-full md:flex   ">

                <div ref={titleRef} className=" lg:w-5/12  md:w-6/12 w-full flex flex-col   max-sm:pl-0 max-lg:pl-5 2xl:pl-20 ">
                    {isMobile ?
                        (
                            <TitleText text='Crafting Journeys with Heart' className=' font-medium text-center  ' />

                        ) :
                        (
                            <>
                                <TitleText text='Crafting Journeys' className=' font-medium  ' />
                                <TitleText text=' with Heart' className=' font-medium  lg:mt-2  ' />
                            </>
                        )
                    }

                    <p ref={descriptionRef} className=" font-light lg:text-lg xl:text-xl 2xl:text-2xl mt-4 lg:leading-8 xl:leading-9 2xl:leading-10 max-sm:text-center  max-w-2xl text-dark-28">we are passionate about creating meaningful travel experiences that go beyond the ordinary. As a boutique travel company,
                        we specialize in personalized, thoughtful itineraries that reflect your interests, pace, and dreams. </p>
                </div>

                <div ref={imageRef} className=" md:w-6/12  flex  md:justify-end md:pr-4 ">
                    <Image
                        src="/images/our-story/girl-holding-globe.png"
                        alt="Woman holding a globe at desk"
                        width={810}
                        height={100}
                        priority
                        className=' rounded-2xl'
                    />
                </div>

            </div>

        </div>
    )
}