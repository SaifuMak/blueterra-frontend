import { playfair, rubik } from '@/app/fonts'


export default function WhereItAllBegan() {

    return (
        <div className={`${rubik.className}   flex-center`}>
            <div className=" w-full font-light text-[15px] md:text-lg  xl:text-xl flex-center  text-white px-4  md:px-10 2xl:py-20 md:py-10 py-5  backdrop-blur-2xl border rounded-2xl  border-white/30 shadow-lg bg-black/0  ">
                <div className="flex flex-col items-center  w-full  xl:w-9/12 text-center space-y-2 lg:space-y-5">
                    <h1 className={`${playfair.className} font-light text-2xl md:text-5xl xl:text-[60px] max-sm:mb-4 2xl:text-[70px]`}>How it All Began</h1>
                    <p className=" xl:leading-9 leading-6 md:leading-8 mt-6 2xl:leading-10  2xl:text-2xl">Some dreams arrive quietly
                        Ours began with travel that left us changed
                        A family visit. A road trip under northern skies
                        Shared laughter, unplanned wonder, the kind of moments that linger.
                    </p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10  text-white/90">We craft experience-driven journeys that go beyond the surface. Rooted in sustainability and authenticity, our travels are curated with purpose — celebrating local cultures, respecting the planet, and prioritizing meaningful connection.</p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10 lg:px-10 text-white/90">We are a boutique travel collective built on trust, offering handpicked experiences for those who seek more than just a destination — they seek depth, story, and soul.</p>
                </div>
            </div>
        </div>
    )
}

