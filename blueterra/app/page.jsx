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

import CollectionsList from "@/components/Home/Collections";



export default function Home() {

  const [currentCollection, setCurrentCollection] = useState(0)
  const [CollectionCount, setCollectionCount] = useState(0)

  return (

    <SmoothScroll>
      <div className={`w-full h-full `}>

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
              <button className=" bg-sky-blue-1 font-medium px-10 py-2.5 rounded-sm ">PLAN YOUR TRIP</button>
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


        <div className=" w-full mt-20 h-screen relative">
          <Image
            src='/images/static/air-ballon-in-sky.png'
            alt='air balloon'
            fill
            priority
            className=" object-fill -scale-x-100"
          />
          <div className=" w-full h-full text-white absolute flex flex-col justify-center items-end inset-0 bg-[#0E518199]/60 ">

            <div className={`w-11/12 h-[80vh] border  border-white ${playfair.className} `}>


              <h2 className=" text-[50px]  ">Our Destination Highlights</h2>
              <p className={`${rubik.className}  mt-4 leading-8 font-light w-5/12 border  text-2xl`}>Discover the Unique Charm and Unforgettable Experiences Each Destination Has to Offer</p>

              <div className=" border border-white mt-20  w-full ">
                <h3 className=" text-[70px] font-semibold ">DUBAI</h3>
                <p className={`w-3/12 ${rubik.className} leading-8 font-extralight text-xl`} >The Burj Khalifa is the tallest building in the world, standing at an incredible height of 828 meters. Located in the heart of Downtown Dubai, this architectural marvel is not only a symbol of Dubai’s rapid development and ambition but also a global icon of innovation and modern design.</p>
              </div>


            </div>

          </div>
        </div>

        <div className=" w-full h-screen"></div>


      </div>
    </SmoothScroll>
  )


}