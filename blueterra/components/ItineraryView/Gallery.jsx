
import Image from "next/image"



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
        <div className=" w-full z-10  my-20   flex justify-center items-center ">

            <div className=" w-10/12 h-[90vh] py-8  xl:px-28 lg:px-16 rounded-4xl bg-white/60 border-white border ">
                <div className="mb-9">
                    <p className=" text-center text-4xl xl:text-5xl text-[#18283F] font-medium ">Gallery</p>
                </div>
                <div className="  2xl:h-[77%] h-[87%] my-2  relative flex rounded-xl  overflow-hidden gap-4   ">


                    {galleryData?.map((item, index) => (
                        <div key={index} className={`relative group  hover:flex-2 overflow-hidden delay-75 hover:cursor-pointer w-full h-full flex-1 transition-all ease-in-out duration-500 rounded-xl`}>
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


    )
}