import Image from "next/image"
import { playfair} from '@/app/fonts'
import { useRef } from "react"

export default function MobileAnimatedVerticalCard({CardData,selectedVerticalTileMobile,setSelectedVerticalTileMobile}) {

  const mobileVerticalTilesRef = useRef([])

   return (
     <div className="w-full min-h-[92vh]  flex flex-col ">
        {CardData?.map((card, index) => (
          <div key={index} ref={(e) => (mobileVerticalTilesRef[index] = e)} onClick={() => setSelectedVerticalTileMobile(index)} className={`  transition-all duration-500 ease-in-out relative ${selectedVerticalTileMobile === index ? 'flex-9' : 'flex-1'} `}>
            <Image
              src={card.image}
              alt={card.alt}
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />


            <div className={`absolute ${selectedVerticalTileMobile === index ? "opacity-0" : " opacity-100"} text-white transition-all duration-500 ease-in-out inset-0   bg-[#00284680]/50`}>
              <div className="flex   w-full h-full px-3 mt-2 space-x-2 ">
                <img src={card.icon} alt={card.tagline} className=" object-cover size-[27px]" />
                <div className="bg-white/40 h-0.5 flex-1 my-3"></div>
                <p className=''> {card.tagline}</p>
              </div>
            </div>

            <div className={`bg-[#104F82D9]/80 text-white transition-all duration-500 ease-in-out absolute inset-0 ${selectedVerticalTileMobile === index ? "opacity-100" : " opacity-0"}`}>
              <div className=" w-full h-full p-6 ">

                <p className='  flex  text-white text-lg  '>
                  <img src={card.icon} alt={card.tagline} className=" object-cover size-[25px]" />
                  <span className={`font-normal text-xl ml-3 ${playfair.className}`}>{card.tagline}</span></p>

                <hr className=' opacity-40 mt-1'></hr>
                <h3 className={`font-normal mt-3 ${playfair.className}`}>Popular Journeys</h3>
                <div className="flex space-x-4 pr-3 font-light text-[12px] mt-2">
                  {["Dubai", "Thailand", "Kenya", "Maldives", "Iceland"].map((destination, index) => (
                    <div key={index} className="  flex  ">
                      <span className="">{destination}</span></div>
                  ))}
                </div>
                <p className=" text-sm font-light mt-2 ">Our Signature Journeys are the essence of what we do—thoughtfully curated travel experiences that reflect our passion for conscious exploration, cultural connection, and sustainable luxury.</p>
                <div className="space-y-1 font-light text-sm mt-3 h-[15vh]  gap-x-3 overflow-y-auto  flex flex-col  ">
                  {["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys",].map((feature, index) => (
                    <div key={index} className=" text-white flex items-center">  <img src="/Icons/dot.svg" alt="dot" className="w-2 h-2" /> <p className=" ml-1">{feature}</p></div>
                  ))}
                </div>


                <div className=" w-full flex mt-3 text-[12px] items-center justify-between">
                  <button className="hover:bg-white/15 hover:ring-2 ring-white/80  bg-sky-blue-1 px-6 py-1.5 transition-all duration-700 ease-in-out  cursor-pointer  text-[12px]  rounded-sm  text-white w-fit h-fit">VIEW ALL</button>
                  <button  className="hover:bg-white/15 hover:ring-2 ring-white/80 flex items-center  bg-sky-blue-1 px-4 py-1.5 transition-all duration-700 ease-in-out  cursor-pointer  text-[12px] font-normal rounded-sm  text-white"><span className="mr-1"><img src='/Icons/filter.svg' className='size-4 '></img></span>Show Filters</button>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
   )
}