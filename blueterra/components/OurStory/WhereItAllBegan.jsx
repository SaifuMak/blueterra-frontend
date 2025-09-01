import { playfair, rubik } from '@/app/fonts'


export default function WhereItAllBegan() {

    return (
        <div className={`${rubik.className}   flex-center`}>
            <div className=" w-full font-light text-[15px] md:text-lg  xl:text-xl flex-center  text-white px-4  md:px-10 2xl:py-20 md:py-10 py-5  backdrop-blur-2xl border rounded-2xl  border-white/30 shadow-lg bg-black/0  ">
                <div className="flex flex-col items-center  w-full  xl:w-10/12 text-center space-y-2 lg:space-y-5">
                    <h1 className={`${playfair.className} font-light text-2xl md:text-5xl xl:text-[60px] max-sm:mb-4 2xl:text-[70px]`}>How it All Began</h1>
                    <p className=" xl:leading-9 leading-6 md:leading-8 mt-6 2xl:leading-10  2xl:text-xl">BlueTerra Travel and Experiences was born from a collection of travel stories gathered over the years, each trip adding a new chapter to who we are. One journey in particular left a lasting impression on us. What began as a casual family holiday quickly became something much more meaningful. It was in the unexpected detours, the quiet moments shared under vast skies, and the laughter that echoed across unfamiliar landscapes where we discovered what travel truly means.
                    </p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10  text-white/90">We realized, travel is not just about ticking places off a list or following a set plan. It is about the feelings that stay with you, the sense of wonder, connection and discovery that shape who you are long after the trip ends. At BlueTerra, we do not create ordinary holidays. We craft journeys designed to inspire stories worth telling, stories filled with authentic experiences and memories that stay with you forever.</p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10 lg:px-10 text-white/90">To us travel is not just about where you go. It is about how it moves you, changes you, and the way you carry it with you when you return home.Welcome to BlueTerra Travel and Experiences. </p>
                    <p className=" xl:leading-9 leading-6 md:leading-8 2xl:leading-10 lg:px-10 text-white/90">Let us create your next story together.</p>
            
                </div>
            </div>
        </div>
    )
}

