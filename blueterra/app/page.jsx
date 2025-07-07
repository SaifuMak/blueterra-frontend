'use client'

import BannerAnimation from "@/components/Home/BannerAnimation";
import DestinationCards from "@/components/DestinationsView/DestinationCards";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Filter from "@/components/Filter";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import CardData from "@/components/datas/Destinations";
import { playfair, rubik, mrsSaint } from "@/app/fonts"
import { HOME_COLLECTIONS } from "@/constants/home-collections";
import { DESTINATIONS_COLLECTIONS } from '@/constants/home-destinations'
import CollectionsList from "@/components/Home/Collections";
import { testimonials } from "@/constants/testimonials";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import JournalsCardOverlay from "@/components/HomePage/JournalsCardOverlay";
import Button from "@/components/GeneralComponents/Button";
gsap.registerPlugin(useGSAP)


export default function Home() {

  const [currentCollection, setCurrentCollection] = useState(0)
  const [CollectionCount, setCollectionCount] = useState(0)

  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS_COLLECTIONS[0])

  const testimonialContainer = useRef(null)

  useGSAP(() => {
    const content = testimonialContainer.current;
    const cards = content.querySelectorAll('.testimonial-card');

    const animation = gsap.to(content, {
      x: () => `-=${content.scrollWidth / 4}`,
      duration: 50,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (content.scrollWidth / 2)),
      },
    });

    const containerCenter = window.innerWidth / 2;

    const updateScale = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        // Scale based on distance from center (tweak threshold and scale as needed)
        const maxDistance = 150; // only scale if within this px from center

        gsap.to(card, {
          scale: distance < maxDistance ? 1.09 : 1,
          duration: 0.15,
          ease: "power3.inOut"

          // overwrite: 'auto',
        });
      });

      requestAnimationFrame(updateScale);
    };

    requestAnimationFrame(updateScale);
  });


  return (

    <SmoothScroll>
      <div className={`w-full h-full  `}>

        <div className="w-full relative h-screen">
          <video src="https://pub-2f61254cf9024766800653136dfffd58.r2.dev/freecompress-5186163_Aerial_Lovatnet_1920x1080.mp4"
            className=" w-full h-full object-cover"
            autoPlay
            muted
            loop
          ></video>

          <div className=" w-full h-full absolute  inset-0 flex-center flex-col text-white ">
            <div className="flex-center flex-col space-y-8">
              <h1 className={` ${playfair.className} text-[80px] font-semibold `}>Curated Travel. Crafted for You.</h1>
              <p className={` ${rubik.className} text-[30px] `}>Bespoke journeys. No compromises.</p>
              {/* <button className=" bg-sky-blue-1 font-medium px-10 py-2.5 rounded-sm ">PLAN YOUR TRIP</button> */}
              <Button text='PLAN YOUR TRIP' buttonStyle='px-10 py-2.5' />

            </div>
          </div>

        </div>


        <div className=" w-full h-[80vh] flex flex-col bg-white  relative overflow-hidden ">

          <div className="absolute w-[25%] left-0 border bottom-0 h-fit">

            <Image
              src='/images/general/clip-path-one.png'
              alt='clip path'
              width={500}
              height={1000}
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>


          <div className="absolute w-[30%] right-0 bottom-0 h-full">

            <Image
              src='/images/general/double-clip-path.png'
              alt='clip path'
              fill
              priority
              className=" border"
              style={{ objectFit: 'cover' }}
            />
          </div>


          <div className={`absolute inset-0  w-full mt-32  flex justify-center  text-center`}>
            <div className={`${rubik.className} border px-10 text-dark-28  w-8/12 space-y-8`}>
              <h2 className={`${playfair.className} text-[48px] text-dark-4B`}>Welcome To BlueTerra</h2>
              <p className=" text-2xl font-light leading-10 ">We are a boutique, founder-led travel brand based in the UAE, dedicated to crafting thoughtful and personalized journeys. </p>
              <p className=" text-xl font-light leading-10 px-6  ">With a strong commitment to sustainability, we design travel experiences that honor local cultures and reduce environmental impact. Each itinerary reflects a deep understanding of conscious travel, offering unique adventures tailored for the modern explorer. Our mission is to redefine luxury through purpose-driven travel.</p>
              <p className=" text-xl -mt-3  font-light leading-10 ">Every journey we curate is rooted in authenticity, blending meaningful experiences with comfort and style. We partner with local communities, artisans, and guides to ensure that our travelers connect deeply with the places they visit, beyond the surface. </p>

              <p className={` text-4xl ${mrsSaint.className}`}> <span className={` ${rubik.className} font-extralight opacity-55 mr-2 `}>-</span>Jerald Jacob</p>
            </div>
          </div>

        </div>

        <div className="pb-10 border">
          <div className="w-full h-full px-10 bg-white">
            <div className=" bg-light-yellow flex flex-col items-center rounded-4xl space-y-10  px-10 py-32 ">
              <h3 className={`${playfair.className} text-dark-4B  text-5xl`} >Our Featured Collections</h3>
              <p className={`text-xl font-light ${rubik.className} text-dark-28  w-6/12 text-center`}>Discover a handpicked selection of our most iconic journeys—each crafted with care, intention, and an eye for timeless experiences.</p>

              <div className=" w-11/12   mt-4 ">
                <CollectionsList Data={HOME_COLLECTIONS} setCurrent={setCurrentCollection} setCount={setCollectionCount} />
              </div>

              <div className=" flex-center w-full h-full">
                {HOME_COLLECTIONS?.map((_, index) => (
                  <span key={index} className={` h-2 rounded-full translate-all duration-500 ease-in-out  mx-1 ${currentCollection === index + 1 ? '  bg-sky-blue-1 w-10' : 'bg-sky-blue-1/30 w-2'}`}  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className=" w-full mt-20 h-[130vh] relative ">
          <Image
            src={selectedDestination.bannerImage}
            alt='air balloon'
            fill
            priority
            className=" object-fill -scale-x-100  "
          />
          <div className=" w-full h-full text-white absolute flex flex-col justify-center items-end inset-0 bg-[#0E518199]/60 ">

            <div className={`w-11/12 h-[80vh] border  border-white ${playfair.className} `}>

              <h2 className=" text-[50px]  ">Our Destination Highlights</h2>
              <p className={`${rubik.className}  mt-4 leading-8 font-light w-5/12 border  text-2xl`}>Discover the Unique Charm and Unforgettable Experiences Each Destination Has to Offer</p>

              <div className=" border flex  h-full border-white   w-full ">

                <div className="w-4/12 flex flex-col justify-center">
                  <h3 className=" text-[70px] font-semibold ">DUBAI</h3>
                  <p className={`w-full ${rubik.className} leading-8 pr-10 font-extralight text-lg`} >The Burj Khalifa is the tallest building in the world, standing at an incredible height of 828 meters. Located in the heart of Downtown Dubai, this architectural marvel is not only a symbol of Dubai’s rapid development and ambition but also a global icon of innovation and modern design.</p>
                </div>

                <div className=" flex items-center  w-10/12 overflow-hidden justify-center border space-x-8 ">
                  <div className="relative h-[500px] w-[400px] transition-all duration-500 ease-in-out">
                    <Image
                      src={selectedDestination.image}
                      alt={selectedDestination.alt}
                      fill
                      className=" object-center rounded-2xl"
                    />
                    <div className=" absolute cursor-pointer inset-0  bg-gradient-to-t from-black/10  to-transparent flex justify-center items-end w-full h-full ">
                      <p className={` ${rubik.className} pb-3 font-light `}>{selectedDestination.subTitle}</p>
                    </div>
                  </div>
                  {DESTINATIONS_COLLECTIONS?.map((destination, index) => (
                    <div key={index} onClick={() => setSelectedDestination(destination)} className={`relative  transition-all duration-500 ease-in-out  rounded-2xl w-[300px] h-[400px]  `}>
                      <Image
                        src={destination.image}
                        alt={destination.alt}
                        fill
                        className=" object-center rounded-2xl"
                      />
                      <div className=" absolute cursor-pointer inset-0  bg-gradient-to-t from-black/10  to-transparent flex justify-center items-end w-full h-full ">
                        <p className={` ${rubik.className} pb-3 font-light `}>{destination.subTitle}{destination.index}</p>
                      </div>
                    </div>
                  ))}


                </div>

              </div>


            </div>
          </div>
        </div>


        <div className=" w-full flex-center relative h-[90vh] bg-sky-blue-light">

          <div className=" w-[30%]  absolute left-0 top-0    ">
            <Image
              src='/images/home/testimonial-left-pattern.png'
              alt="pattern"
              width={400}
              height={500}
              className=" object-cover"
            />
          </div>
          <div className=" w-[20%] absolute right-0 bottom-0    ">
            <Image
              src='/images/home/testimonial-right-pattern.png'
              alt="pattern"
              width={400}
              height={500}
              className=" object-cover "
            />
          </div>

          <div className={`h-[70vh] p-5 relative flex flex-col justify-between z-10 w-9/12 text-dark-28 rounded-3xl bg-white ${rubik.className}`}>

            <div className="flex flex-col mt-10">
              <h2 className={`${playfair.className} text-center text-4xl`}>Trusted By Customers</h2>
              <p className=" text-center mt-5 text-2xl font-light">Genuine Experiences Shared by Our Happy Travelers Worldwide</p>
            </div>

            <div className="w-full border  pt-20  pb-20  overflow-x-hidden">
              <div ref={testimonialContainer} className="  border w-full flex space-x-28 ">
                {testimonials?.map((testimonial, index) => (
                  <div key={index} className=" min-w-[320px] overflow-hidden testimonial-card z-20 bg-white  min-h-[400px] h-fit px-10 py-10  rounded-2xl " style={{ boxShadow: '0 0 25px 1px rgba(153, 189, 188, 0.3)', }}>
                    <p className=" font-light leading-9 ">{testimonial.message}</p>
                    <p className=" text-sky-blue-dark mt-5">{testimonial.name}</p>
                    <p className=" font-light mt-2">{testimonial.country}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>


        <div className=" relative w-full flex  flex-col  items-center h-[130vh]  bg-white border ">
          <div className=" w-[30%]   absolute left-0 top-0    ">
            <Image
              src='/images/home/journal-left-path.png'
              alt="pattern"
              width={300}
              height={400}
              className=" object-cover"
            />
          </div>

          <div className=" w-fit absolute  right-0 border bottom-0">
            <Image
              src='/images/home/journal-right-path.png'
              alt="pattern"
              width={500}
              height={500}
              className=" object-cover"
            />
          </div>

          <div className=" w-full flex justify-center text-dark-4B mt-20 mb-16">
            <h3 className={`${playfair.className} text-5xl`}>BlueTerra Journal</h3>
          </div>

          <div className=" flex  space-x-10 w-11/12">
            <div className=" w-1/3 group overflow-hidden h-[90vh] cursor-pointer rounded-xl  relative">
              <Image
                src='/images/home/zebras-in-grasslands.jpg'
                alt="zebra"
                fill
                className=" object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
              />
              <JournalsCardOverlay text='Best Destinations for Wellness and Mindfulness' />
            </div>

            <div className=" flex flex-col h-[90vh] w-1/3 space-y-10 ">
              <div className=" w-full group overflow-hidden cursor-pointer h-[45vh]  rounded-xl relative">
                <Image
                  src='/images/home/rock-in-river.jpg'
                  alt="rock in river "
                  fill
                  className="object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
                />
                <JournalsCardOverlay text='Why Boutique Travel is Shapingthe Future of Personalized' />

              </div>
              <div className=" w-full group overflow-hidden cursor-pointer h-[45vh]  rounded-xl relative">
                <Image
                  src='/images/home/zebras-in-grasslands.jpg'
                  alt="zebra"
                  fill
                  className="object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
                />
                <JournalsCardOverlay text='Most Instagrammable Villages Around the Globe' />

              </div>

            </div>

            <div className=" w-1/3 h-[90vh] group overflow-hidden cursor-pointer  rounded-xl bg-red-50 relative">
              <Image
                src='/images/home/girrafe-in-grassland.jpg'
                alt="zebra"
                fill
                className="object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
              />
              <JournalsCardOverlay text='Top Stargazing Spots Around the World for Unforgettable' />
            </div>

          </div>

          <div className=" mt-20">
            <Button text='VIEW ALL' buttonStyle='px-16 py-2 ' isHoverWhiteApplied={false} />
          </div>

        </div>

        <div className="  h-[70vh] border w-full flex flex-col items-center relative ">

          <div className=" w-[70%]  absolute left-0  bottom-0    ">
            <Image
              src='/images/home/newsletter-left-path.png'
              alt="pattern"
              width={600}
              height={500}
              className=" object-cover"
            />
          </div>

          <div className=" w-fit  absolute  right-0  bottom-0    ">
            <Image
              src='/images/home/newsletter-right-path.png'
              alt="pattern"
              width={600}
              height={500}
              className=" object-cover"
            />
          </div>

          <div className={`flex w-11/12   space-x-16 ${rubik.className}`}>
            <div className=" w-1/2 h-[55vh] relative group overflow-hidden rounded-4xl">
              <Image
                src='/images/home/three-friends.jpg'
                alt="three-friends"
                fill
                className="object-cover scalling-group-110 rounded-4xl "
              />
              <div className=" absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black/20 cursor-pointer rounded-4xl">
                <h3 className={`text-[50px] ${playfair.className} font-medium text-white`}>Book Your Next Trip</h3>
                <Button text='PLAN YOUR TRIP' buttonStyle='px-12 py-2.5 mt-8 ' />

              </div>
            </div>
            <div className=" w-1/2 group overflow-hidden h-[55vh] relative rounded-4xl">
              <Image
                src='/images/home/beautiful-sea.jpeg'
                alt="beautiful-sea"
                fill
                className={`object-cover scalling-group-110 rounded-4xl`}
              />
              <div className=" absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black/20 cursor-pointer rounded-4xl">
                <h3 className={`text-[50px] ${playfair.className} font-medium text-white`}>Join Our Community</h3>
                <p className="  text-[25px] text-white font-light mt-7 tracking-wide ">Get expert travel tips straight to your inbox.</p>

              </div>
            </div>
          </div>




        </div>


        <div className=" w-full h-screen">

        </div>


      </div>
    </SmoothScroll>
  )


}