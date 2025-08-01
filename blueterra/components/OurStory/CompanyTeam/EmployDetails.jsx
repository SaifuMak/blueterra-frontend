
import Image from "next/image"
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn"
import { useIsMobile } from "@/app/hooks/useIsMobile"

export default function EmployDetails({ member, index, isMobile }) {

    const employRef = useGsapFadeIn(index, { initialPosition: 50 })

    return (
        <div
            //    ref={isMobile ? employRef  : null }
            ref={employRef}
            className="flex flex-col rounded-2xl items-center w-full text-center  overflow-hidden  transition"
        >
            <div className=" overflow-hidden rounded-2xl">

                <Image
                    src={member.image}
                    alt={member.name}
                    width={380}
                    height={100}
                    priority
                    className=' rounded-2xl hover:scale-110  delay-100  transition-all duration-1000 ease-in-out'
                />
            </div>


            <h3 className="2xl:text-2xl text-xl text-dark-28 mt-4 font-medium">{member.name}</h3>
            <p className=" text-dark-28 text-lg 2xl:text-xl 2xl:mt-1">{member.role}</p>
        </div>
    )
}