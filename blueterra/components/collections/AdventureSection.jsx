
import Image from "next/image"
import Button from "../generalComponents/Button"
import { playfair } from '@/app/fonts'

export default function AdventureSection() {

    return (
        <div className="w-full mb-10 lg:mb-20 lg:min-h-[20vh] max-lg:py-10  min-h-[50vh] flex-center">
            <div className="w-11/12 h-[500px] border rounded-3xl overflow-hidden max-lg:flex-col flex">

                <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full">
                    <Image
                        src="/images/collections/boy-on-mountain.png"
                        alt="travel"
                        fill
                        priority={true}
                        className="w-full h-full object-cover"
                    />

                    <div className=" absolute w-full h-full flex items-center max-lg:justify-center xl:pl-20 lg:pl-10 inset-0 ">
                        <h2 className={`xl:text-[80px] text-4xl lg:text-[73px]  max-lg:px-5 max-lg:text-center lg:max-w-sm  text-white ${playfair.className}`}>Wander the World With Us</h2>
                    </div>
                </div>

                <div className=" lg:w-1/2 h-1/2 lg:h-full w-full text-center max-lg:py-5  flex flex-col items-center justify-center space-y-5 lg:space-y-7 2xl:space-y-10  overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/our-story/yellow-banner.png')",
                    }}>
                    <h1 className={`${playfair.className}  text-dark-4B max-lg:px-4 text-2xl  md:text-4xl  lg:text-4xl xl:text-[43px] 2xl:text-[50px]`} >Your Adventure Begins Here</h1>
                    <p className="  max-lg:px-5 md:text-lg xl:text-xl 2xl:text-2xl max-w-sm  xl:max-w-lg 2xl:max-w-2xl font-light">Unforgettable adventures, tailor-made just for you — let’s turn your travel dreams into reality.</p>
                    <Button text="START EXPLORING" buttonStyle=" px-10 py-2.5   lg:text-base" />
                </div>

            </div>
        </div>
    )
}