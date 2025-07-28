import { playfair, rubik } from '@/app/fonts'


export default function WhereItAllBegan() {

    return (
        <div className={`${rubik.className}  flex-center`}>
            <div className=" w-full font-light text-xl flex-center  text-white  px-10 py-20  backdrop-blur-2xl border rounded-2xl  border-white/30 shadow-lg bg-black/0  ">
                <div className="flex flex-col items-center w-9/12 text-center space-y-5">
                    <h1 className={`${playfair.className} font-light text-[70px]`}>Where it all began</h1>
                    <p className=" leading-10 text-2xl">Our journey began where desert meets sea — at the vibrant crossroads of 25°N, 55°E, a place of contrasts, culture, and connection. From this  unique origin, we were inspired to reimagine travel: not as a checklist, but as a curated, boutique experience that reflects the soul of a destination.</p>
                    <p className=" leading-10 text-white/90">We craft experience-driven journeys that go beyond the surface. Rooted in sustainability and authenticity, our travels are curated with purpose — celebrating local cultures, respecting the planet, and prioritizing meaningful connection.</p>
                    <p className=" leading-10 px-10 text-white/90">We are a boutique travel collective built on trust, offering handpicked experiences for those who seek more than just a destination — they seek depth, story, and soul.</p>
                </div>
            </div>
        </div>
    )
}

