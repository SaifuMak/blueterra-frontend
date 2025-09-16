'use client'

import { useState, useEffect, useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import { playfair, rubik, mrsSaint } from "@/app/fonts"
import { testimonials } from "@/constants/testimonials";
import gsap from "gsap";
import Button from "@/components/generalComponents/Button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ZohoFormModal from "@/components/Forms/ZohoFormModal";
import JournalSection from "@/components/Home/JournalSection";
import PlanningCardSection from "@/components/Home/PlanningCardSection";
import PartnerCompaniesSection from "@/components/Home/PartnerCompaniesSection";
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath";
import CollectionsSection from "@/components/Home/CollectionsSection";
import DestinationSection from "@/components/Home/DestinationSection";
import DestinationSectionMediumDevice from "@/components/Home/DestinationSectionMediumDevice";
import DestinationSectionMobile from "@/components/Home/DestinationSectionMobile";
import { useMediaQuery } from 'react-responsive'
import LoaderIcon from "@/components/generalComponents/LoaderIcon";
import useGsapFadeIn from "./hooks/Gsap/useGsapFadeIn";
import { useLenis } from "@/components/SmoothScroll";
import { useGSAP } from "@gsap/react";
import TestimonialsForMobile from "@/components/Home/TestimonialsForMobile";

gsap.registerPlugin(ScrollTrigger)


export default function Home() {

  const lenis = useLenis();

  const isMobile = useMediaQuery({ query: "(max-width: 644px)" });
  const isMediumDevice = useMediaQuery({
    query: "(min-width: 645px) and (max-width: 1279px)",
  });
  const isLargeDevice = useMediaQuery({ query: "(min-width: 1280px)" });

  // zoho form 
  const [formOpen, setFormOpen] = useState(false);

  const [isBannerVideoLoaded, setIsBannerVideoLoaded] = useState(false)

  const welcomeContainerRef = useRef()

  const messageContainerRef = useGsapFadeIn()

  const testimonialsContainerRef = useGsapFadeIn()

  const cardRefs = useRef([]);

  const testimonialContainer = useRef(null);
  const scaleTrackerContainer = useRef(null);

  const scrollSpeed = isMobile ? 0.5 : 1.5; // pixels per frame

  // Duplicate the testimonials for seamless looping
  const extendedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {

    if (isMobile) {
      return
    }

    const container = testimonialContainer.current;
    if (!container) return;

    let animationFrameId;

    const scroll = () => {
      if (!container) return;

      container.scrollLeft += scrollSpeed;

      // Reset when reaching half the scroll width (since it's duplicated)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  useEffect(() => {


    if (isMobile) {
      return
    }
    let animationFrameId;

    const checkCards = () => {
      const triggerRect = scaleTrackerContainer.current.getBoundingClientRect();

      cardRefs.current.forEach((card) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        // const isInside =
        //   cardRect.left < triggerRect.right &&
        //   cardRect.right > triggerRect.left;

        const isInside =
          cardCenter < triggerRect.right &&
          cardRect.right > triggerRect.left;


        if (isInside) {
          card.classList.add("scale-in");
          card.classList.remove("scale-reset");
        } else {
          card.classList.add("scale-reset");
          card.classList.remove("scale-in");
        }

      });

      animationFrameId = requestAnimationFrame(checkCards);
    };

    animationFrameId = requestAnimationFrame(checkCards);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  const videoRef = useRef(null);


  useEffect(() => {
    if (videoRef.current?.readyState >= 3) { // 3 = HAVE_FUTURE_DATA
      // console.log("Video already loaded (readyState:", videoRef.current.readyState, ")");
      setIsBannerVideoLoaded(true);
    }
  }, []);

  useGSAP(() => {
    const elements = gsap.utils.toArray(".vertically-animated-element");

    elements.forEach((box) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "sine.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );
    });
  });



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  // useEffect(() => {
  //   setTimeout(() => {
  //         window.scrollTo(0, 0);
  //     // window.scrollTo({ top: 0, behavior: "smooth" });

  //   }, 500);
  // }, [])

  return (

    <SmoothScroll>
      <Navbar />
      <div ref={welcomeContainerRef} className={`w-full h-full  `}>

        <div className="w-full relative  h-screen">
          {!isBannerVideoLoaded && (
            <div className="absolute inset-0 w-full h-full flex-center bg-white"><LoaderIcon /></div>
          )}
          {/* src="https://pub-2f61254cf9024766800653136dfffd58.r2.dev/freecompress-5186163_Aerial_Lovatnet_1920x1080.mp4" */}
          {/* <video ref={videoRef} src="https://pub-2f61254cf9024766800653136dfffd58.r2.dev/freecompress-5186163_Aerial_Lovatnet_1920x1080.mp4" */}

          <video ref={videoRef} src="https://res.cloudinary.com/dbmsyy9mx/video/upload/v1756462732/Home_page_Opening_video_2_ehpv1l.mp4"
            className=" w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => {
              console.log("Can play");
              setIsBannerVideoLoaded(true);
            }}
            onError={(e) => console.error("Video error", e)}
          ></video>


          <div className=" w-full h-full absolute bg-black/10  inset-0 flex-center flex-col text-white ">
            <div className="flex-center flex-col space-y-5 lg:space-y-8 ">
              <h1 className={` ${playfair.className}  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'} translate-all duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-semibold `}>Travel Beyond Ordinary</h1>
              <p className={` ${rubik.className} ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'} translate-all font-light duration-700 ease-in-out px-5  text-center lg:text-xl xl:text-2xl 2xl:text-[30px] `}>Soulful journeys and bespoke celebrations,  curated with passion and care.</p>
              <Button text='PLAN YOUR JOURNEY' buttonStyle={`  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'}  translate-all duration-1000 ease-in-out max-md:text-sm px-4 lg:px-8 xl:px-10 py-1.5 lg:py-2.5 `} onClickFunction={() => setFormOpen(true)} />

            </div>
          </div>
        </div>


        <div className=" w-full h-auto    flex flex-col justify-center  relative overflow-hidden ">

          <ResponsiveClipPath
            outerClass='absolute w-[35%] left-0  bottom-0 h-fit'
            ImagePath='/images/home/patterns/welcome-bottom-left.png'
            width={600}
          />

          <ResponsiveClipPath
            outerClass='absolute md:w-[15%] w-[25%] -right-10 top-1/2 -translate-y-1/2  h-fit'
            ImagePath='/images/home/patterns/welcome-right.png'
            width={300}
            height={200}
          />

          <div className={` w-full py-16 md:py-16 xl:py-36  2xl:py-44 flex justify-center bg-white  text-center`}>
            <div ref={messageContainerRef} className={`${rubik.className}  md:px-10 px-10 text-dark-28  w-full lg:w-10/12  xl:w-8/12 space-y-6 2xl:space-y-8`}>
              <h2 className={`${playfair.className} text-3xl     lg:text-4xl xl:text-[48px] text-dark-4B`}>Discover BlueTerra</h2>
              <p className=" 2xl:text-[23px]   max-sm:text-base text-xl font-light leading-8 xl:leading-10 ">BlueTerra is more than a boutique travel company. It is a dream nurtured for years and brought to life with love</p>
              <p className="2xl:text-xl lg:text-lg  text-sm  font-light leading-8 2xl:leading-10 lg:px-6  ">What began as a simple thought has grown into something far more meaningful. Every time we see someone set out on a journey and return with a smile, renewed and inspired, it reminds us why BlueTerra exists. We believe travel is not about taking a holiday simply to go somewhere.
                It is about what you wish to feel, experience, and become. That is why every retreat,
                every celebration, and every journey we design is imagined with soul and crafted with care,
                so that when you return you carry not just memories but a new part of yourself.
                BlueTerra was created from passion and joy for like minded individuals who believe travel can change us for the better.</p>
              <p className="  2xl:text-xl lg:text-lg  text-sm  font-light leading-8 2xl:leading-10 lg:px-6">With BlueTerra, we help you discover a way of travel where luxury and meaning meet, and where every journey becomes a story worth remembering</p>

              <p className={` text-lg lg:text-3xl 2xl:text-4xl ${mrsSaint.className}`}> <span className={` ${rubik.className} font-extralight opacity-55 mr-2 `}>-</span>Jerald Jacob</p>
            </div>
          </div>

        </div>

        {/* our featured collections  */}
        <CollectionsSection />

        {isLargeDevice && <DestinationSection />}

        {isMediumDevice && <DestinationSectionMediumDevice />}

        {isMobile && <DestinationSectionMobile />}

        {!isMobile && <div className=" w-full  flex-center max-sm:py-16 relative min-h-[100vh] bg-sky-blue-light ">

          <div className={` h-fit    flex flex-col   items-center bg-white justify-between z-10 w-11/12 xl:w-9/12 text-dark-28 rounded-3xl  ${rubik.className}`}>

            <div className="flex flex-col vertically-animated-element mt-10 lg:mt-16 2xl:mt-20">
              <h2 className={`${playfair.className}   text-center heading-text max-sm:px-2`}>Trusted By Customers</h2>
              <p className=" text-center mt-7 lg:text-lg  xl:text-2xl font-light max-sm:px-5">Experiences Shared by Our Travelers</p>
            </div>


            {/* for the larger screens  */}
            <div className="   z-30  w-full h-fit  mt-10 max-md:hidden overflow-x-auto ">
              <div ref={scaleTrackerContainer} className=" absolute   z-0 w-[1vh] lg:w-[1vh] h-[100px] left-[73%] md:left-[67%] lg:left-[62%] xl:left-[59%] 2xl:left-[59%] top-0 -translate-x-1/2 "></div>

              <div ref={testimonialContainer} style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                scrollBehavior: 'auto',
              }} className="    flex py-10 no-scroll-bar  overflow-x-scroll  ">
                {extendedTestimonials?.map((testimonial, index) => (
                  <div key={index} ref={(el) => (cardRefs.current[index] = el)} className=" lg:min-w-[320px] min-w-[280px] overflow-hidden testimonial-card mx-5 lg:mx-10 z-20 bg-white  min-h-[50%] h-fit px-5 lg:px-10 py-10  rounded-2xl " style={{ boxShadow: '0 0 25px 1px rgba(153, 189, 188, 0.3)', }}>
                    <p className=" font-light md:leading-8 leading-7 ">{testimonial.message}</p>
                    <p className=" text-sky-blue-dark mt-5">{testimonial.name}</p>
                    <p className=" font-light mt-2">{testimonial.country}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>}



        {isMobile && <div className=" md:hidden">
          <TestimonialsForMobile />
        </div>}

        <JournalSection />
        <PartnerCompaniesSection />

        <PlanningCardSection setFormOpen={setFormOpen} />

        <Footer />
        <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

      </div>
    </SmoothScroll>
  )


}