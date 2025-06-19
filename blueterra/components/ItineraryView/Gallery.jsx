
import Image from "next/image"
import forestParallax from "../../public/images/itinerary/forest-parallax.png"




export default function Gallery({ }) {

    const galleryData = [
        { name: "Safari Adventure", image: "/images/gallery/giraffe.png" },
        { name: "Cultural Celebration", image: "/images/gallery/girl-dancing.png" },
        { name: "Island Escape", image: "/images/gallery/island.png" },
        { name: "Burj Khalifa", image: "/images/gallery/burj-kalifa.png" },
        { name: "Majestic Waterfalls", image: "/images/gallery/waterfall-mountain.png" },
        { name: "Tropical Forest Retreat", image: "/images/gallery/forest-in-beach.png" },
    ];


    return (


        <div className=" w-full  h-full  gallery-container  z-10  p-10  flex justify-center items-center ">

            <div className=" w-11/12 h-full  relative rounded-4xl   ">

                <Image
                    src={forestParallax}
                    alt="forest"
                    fill
                    className=" object-cover  rounded-4xl "
                    priority
                />

                <div className="  absolute w-full   rounded-4xl h-full bg-white/60 inset-0">

                    <div className="px-24  w-full h-full overflow-hidden">

                        <div className="h-[18%] flex-center ">
                            <h6 className=" gallery-title  text-center text-4xl xl:text-5xl text-[#18283F] font-medium ">Gallery</h6>
                        </div>
                        <div className="  h-[78%]   relative flex rounded-xl  overflow-hidden gap-4   ">


                            {galleryData?.map((item, index) => (
                                <div key={index} className={`relative group gallery-tile hover:flex-2 overflow-hidden delay-75 hover:cursor-pointer w-full h-full flex-1 transition-all ease-in-out duration-700 rounded-xl`}>
                                    <Image
                                        src={item.image}
                                        alt='image'
                                        fill
                                        className='object-cover rounded-xl'
                                        priority

                                    />
                                    <p className=" opacity-0 text-nowrap font-medium absolute delay-100 bottom-20 group-hover:opacity-100 group-hover:translate-x-12 -left-5 translate-all duration-500   2xl:text-2xl text-white">{item.name}</p>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}