import { playfair, rubik } from '@/app/fonts'


export default function WhereItAllBegan() {

    return (
        <div className={`${rubik.className}   flex-center`}>
            <div className=" w-full font-light text-[15px] md:text-lg  xl:text-xl flex-center  text-white px-4  md:px-10 2xl:py-20 md:py-10 py-5  backdrop-blur-2xl border rounded-2xl  border-white/30 shadow-lg bg-black/0  ">
                <div className="flex flex-col items-center  w-full  xl:w-9/12 text-center space-y-2 lg:space-y-5">
                    <h1 className={`${playfair.className} font-light text-2xl md:text-5xl xl:text-[60px] max-sm:mb-4 2xl:text-[70px]`}>Where it all began</h1>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10  2xl:text-2xl">Our journey began where desert meets sea — at the vibrant crossroads of 25°N, 55°E, a place of contrasts, culture, and connection. From this  unique origin, we were inspired to reimagine travel: not as a checklist, but as a curated, boutique experience that reflects the soul of a destination.</p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10  text-white/90">We craft experience-driven journeys that go beyond the surface. Rooted in sustainability and authenticity, our travels are curated with purpose — celebrating local cultures, respecting the planet, and prioritizing meaningful connection.</p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10 lg:px-10 text-white/90">We are a boutique travel collective built on trust, offering handpicked experiences for those who seek more than just a destination — they seek depth, story, and soul.</p>
                </div>
            </div>
        </div>
    )
}

