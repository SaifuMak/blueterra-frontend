'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"
import { HOME_COLLECTIONS } from "@/constants/home-collections";
import { DESTINATIONS_COLLECTIONS } from '@/constants/home-destinations'
import CollectionsList from "@/components/Home/Collections";
import { testimonials } from "@/constants/testimonials";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import JournalsCardOverlay from "@/components/HomePage/JournalsCardOverlay";
import Button from "@/components/generalComponents/Button";
import Marquee from "react-fast-marquee";
import DestinationCarousal from "@/components/Home/DestinationCarousal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ZohoFormModal from "@/components/Forms/ZohoFormModal";
import JournalSection from "@/components/Home/JournalSection";
import useGsapFadeIn from "./hooks/Gsap/useGsapFadeIn";
import PlanningCardSection from "@/components/Home/PlanningCardSection";
import PartnerCompaniesSection from "@/components/Home/PartnerCompaniesSection";
import useGsapOpacity from "./hooks/Gsap/useGsapOpacity";
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath";
import { useIsMobile } from "./hooks/useIsMobile";
import ReviewWidget from "@/components/Footer/ReviewWidget";

gsap.registerPlugin(ScrollTrigger)


export default function Home() {

  const cardRef = useGsapOpacity(0, {})

  const isMobile = useIsMobile()

  // zoho form 
  const [formOpen, setFormOpen] = useState(false);

  const [currentCollection, setCurrentCollection] = useState(0)
  const [CollectionCount, setCollectionCount] = useState(0)
  const [isBannerVideoLoaded, setIsBannerVideoLoaded] = useState(false)

  const [currentDestination, setCurrentDestination] = useState(0)
  const [DestinationCount, setDestinationCount] = useState(0)

  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS_COLLECTIONS[0])


  const welcomeContainerRef = useRef()
  const featuredCollectionsContainerRef = useRef()

  const messageContainerRef = useRef()

  const titleRef = useRef()
  const descRef = useRef()

  const cardOne = useGsapFadeIn(0, {})

  const currentDestinationTitleRef = useRef()
  const prevDestinationTitleRef = useRef()

  const currentDestinationDescriptionRef = useRef()
  const prevDestinationDescriptionRef = useRef()


  const cardRefs = useRef([]);

  const testimonialContainer = useRef(null);
  const scaleTrackerContainer = useRef(null);
  const destinationBannerRef = useRef(null);


  const scrollSpeed = isMobile ? 0.5 : 1.5; // pixels per frame

  // Duplicate the testimonials for seamless looping
  const extendedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
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


  const prevDestination =
    (currentDestination - 1 + DESTINATIONS_COLLECTIONS.length) % DESTINATIONS_COLLECTIONS.length

  useEffect(() => {
    const tl = gsap.timeline()
    const t2 = gsap.timeline()


    tl.fromTo(prevDestinationTitleRef.current, { yPercent: 0 }, { yPercent: -100, duration: 0.8 })
    t2.fromTo(prevDestinationDescriptionRef.current, { yPercent: 0 }, { yPercent: -100, duration: 1.3 })


    // Animate current title to center
    tl.from(currentDestinationTitleRef.current, {
      yPercent: 90,
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
    }, '-=0.7') // slight overlap
    t2.from(currentDestinationDescriptionRef.current, {
      yPercent: 170,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
    }, '-=1') // slight overlap

  }, [currentDestination])



  useEffect(() => {
    gsap.fromTo(
      destinationBannerRef.current,
      { opacity: 0.5, scale: 1 },
      { opacity: 1, duration: 3, scale: 1.15, ease: "power1.out" }
    );
  }, [currentDestination]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  useGSAP(() => {
    const elements = gsap.utils.toArray(".vertically-animated-element");

    elements.forEach((box) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: welcomeContainerRef });


  // useGSAP(() => {
  //   const elements = gsap.utils.toArray(".scale-opacity-animate");

  //   elements.forEach((box) => {
  //     gsap.fromTo(
  //       box,
  //       { opacity: 0, scale: 0.9 },
  //       {
  //         opacity: 1,
  //         scale: 1,
  //         duration: 0.7,
  //         ease: "sine.out",
  //         scrollTrigger: {
  //           trigger: box,
  //           start: "top 90%",
  //           toggleActions: "play none none reverse",
  //         },
  //       }
  //     );
  //   });
  // }, { scope: welcomeContainerRef });


  const videoRef = useRef(null);


  useEffect(() => {
    if (videoRef.current?.readyState >= 3) { // 3 = HAVE_FUTURE_DATA
      console.log("Video already loaded (readyState:", videoRef.current.readyState, ")");
      setIsBannerVideoLoaded(true);
    }
  }, []);


  // video  player 

  // useEffect(() => {


  //   if (!messageContainerRef.current) return

  //   gsap.fromTo(
  //     videoRef.current,
  //     { scale: 1 }, // Starting value
  //     {
  //       scale: 1.09, // Ending value
  //       duration: 2,
  //       ease: "power3.out", // 
  //       scrollTrigger: {
  //         trigger: messageContainerRef.current,
  //         start: "top 90%",
  //         toggleActions: "play reverse play reverse",
  //         // markers: true,
  //       },
  //     }
  //   );

  // }, [])



  // useGSAP(() => {
  //   if (!isBannerVideoLoaded) return;

  //   const elements = gsap.utils.toArray(".video-animated-element");

  //   elements.forEach((box) => {
  //     gsap.fromTo(
  //       box,
  //       { opacity: 0, y: 100 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.7,
  //         ease: "power3.out",
  //       }
  //     );
  //   });
  // }, {
  //   scope: welcomeContainerRef,
  //   dependencies: [isBannerVideoLoaded] // Add dependency here
  // });



  return (

    <SmoothScroll>
      <Navbar />
      <div ref={welcomeContainerRef} className={`w-full h-full  `}>

        <div className="w-full relative h-[50vh] md:h-screen">
          <video ref={videoRef} src="https://pub-2f61254cf9024766800653136dfffd58.r2.dev/freecompress-5186163_Aerial_Lovatnet_1920x1080.mp4"
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

          <div className=" w-full h-full absolute  inset-0 flex-center flex-col text-white ">
            <div className="flex-center flex-col space-y-5 lg:space-y-8 ">
              <h1 className={` ${playfair.className}  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'} translate-all duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-semibold `}>Curated Travel. Crafted for You.</h1>
              <p className={` ${rubik.className} ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'} translate-all font-light duration-700 ease-in-out lg:text-xl xl:text-2xl 2xl:text-[30px] `}>Bespoke journeys. No compromises.</p>
              {/* <button className=" bg-sky-blue-1 font-medium px-10 py-2.5 rounded-sm ">PLAN YOUR TRIP</button> */}
              <Button text='PLAN YOUR TRIP' buttonStyle={`  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'}  translate-all duration-1000 ease-in-out max-md:text-sm px-4 lg:px-8 xl:px-10 py-1.5 lg:py-2.5 `} onClickFunction={() => setFormOpen(true)} />

            </div>
          </div>

        </div>


        <div ref={messageContainerRef} className=" w-full h-auto    flex flex-col justify-center  relative overflow-hidden ">

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

          <div className={` w-full py-10 md:py-16 xl:py-36  2xl:py-44 flex justify-center bg-white  text-center`}>
            <div className={`${rubik.className}  md:px-10 px-10 text-dark-28  w-full lg:w-10/12  xl:w-8/12 space-y-6 2xl:space-y-8`}>
              <h2 className={`${playfair.className} text-3xl vertically-animated-element  max-sm:opacity-0  lg:text-4xl xl:text-[48px] text-dark-4B`}>Welcome To BlueTerra</h2>
              <p className=" vertically-animated-element max-sm:opacity-0 2xl:text-2xl max-sm:text-base text-lg lg:text-xl font-light leading-8 xl:leading-10 ">We are a boutique, founder-led travel brand based in the UAE, dedicated to crafting thoughtful and personalized journeys. </p>
              <p className=" vertically-animated-element max-sm:opacity-0 2xl:text-xl text-sm lg:text-lg font-light leading-8 xl:leading-10 lg:px-6  ">With a strong commitment to sustainability, we design travel experiences that honor local cultures and reduce environmental impact. Each itinerary reflects a deep understanding of conscious travel, offering unique adventures tailored for the modern explorer. Our mission is to redefine luxury through purpose-driven travel.</p>
              <p className=" vertically-animated-element max-sm:opacity-0 2xl:text-xl lg:text-lg text-sm -mt-3  font-light leading-8 xl:leading-10 ">Every journey we curate is rooted in authenticity, blending meaningful experiences with comfort and style. We partner with local communities, artisans, and guides to ensure that our travelers connect deeply with the places they visit, beyond the surface. </p>

              <p className={`vertically-animated-element text-lg lg:text-3xl 2xl:text-4xl ${mrsSaint.className}`}> <span className={` ${rubik.className} font-extralight opacity-55 mr-2 `}>-</span>Jerald Jacob</p>
            </div>
          </div>

        </div>



        {/* our featured collections  */}
        <div className="pb-10 ">
          <div className="w-full h-full px-4 md:px-10 bg-white">
            <div className=" bg-light-yellow flex flex-col items-center rounded-4xl space-y-6 xl:space-y-10  px-4 xl:py-24 py-10  2xl:px-10 2xl:py-32 ">
              <h3 className={`${playfair.className} vertically-animated-element text-dark-4B heading-text`} >Our Featured Collections</h3>
              <p className={`xl:text-xl lg:text-lg font-light vertically-animated-element ${rubik.className} text-dark-28 w-full md:w-8/12  xl:w-6/12 text-center`}>Discover a handpicked selection of our most iconic journeys—each crafted with care, intention, and an eye for timeless experiences.</p>

              <div ref={cardRef} className=" 2xl:w-11/12 w-full max-2xl:px-5   mt-4 ">
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


        {/* destinations section  */}
        <div className=" w-full mt-12 2xl:mt-20 z-0 h-[100dvh] overflow-hidden relative max-lg:hidden ">

          <Image
            ref={destinationBannerRef}
            src={DESTINATIONS_COLLECTIONS[currentDestination].bannerImage}
            alt="air balloon"
            fill
            priority
            className="object-fill"
          />
          <div className=" w-full h-full text-white absolute flex flex-col translate-all duration-1000 ease-in-out  items-end inset-0 bg-[#0E5181]/60 ">

            <div className={`2xl:w-11/12 w-full max-2xl:pl-10 h-[60vh] xl:h-[60vh]   mt-[10vh] ${playfair.className} `}>

              <h2 className=" vertically-animated-element text-[45px] xl:text-[50px]  ">Our Destination Highlights</h2>
              <p className={`${rubik.className} vertically-animated-element  mt-4 leading-8 font-light w-7/12 xl:w-6/12 2xl:w-5/12  text-xl  xl:text-2xl`}>Discover the Unique Charm and Unforgettable Experiences Each Destination Has to Offer</p>

              <div className="  flex  h-full    w-full ">

                <div className="w-4/12 max-2xl:w-5/12 flex flex-col justify-center">
                  <div className=" h-[50px] xl:h-[80px] flex items-center  relative  overflow-hidden">
                    <h3 ref={currentDestinationTitleRef} className=" text-5xl xl:text-[70px] absolute text-nowrap  font-semibold ">{DESTINATIONS_COLLECTIONS[currentDestination].titile}</h3>
                    <h3 ref={prevDestinationTitleRef} className={` ${currentDestination === 0 ? ' opacity-50' : 'opacity-100'} text-5xl  xl:text-[70px] absolute  text-nowrap  font-semibold `} >{DESTINATIONS_COLLECTIONS[prevDestination].titile}</h3>
                  </div>

                  <div className=" md:h-[120px] xl:h-[140px] 2xl:h-[150px] relative   overflow-hidden mt-5">
                    <p ref={currentDestinationDescriptionRef} className={`w-full ${rubik.className} 2xl:leading-8 2xl:pr-10 absolute  font-extralight xl:text-lg`} >{DESTINATIONS_COLLECTIONS[currentDestination].description}</p>
                    <p ref={prevDestinationDescriptionRef} className={`w-full ${rubik.className} 2xl:leading-8 2xl:pr-10  absolute font-extralight xl:text-lg`} >{DESTINATIONS_COLLECTIONS[prevDestination].description}</p>
                  </div>

                  <Button text='EXPLORE' buttonStyle={`px-12 mt-4 text-sm tracking-wider ${jost.className} py-2`} />
                </div>


                <div className=" flex items-center  w-10/12 justify-end overflow-hidden     space-x-8 ">

                  <div className=" w-full   pl-5   ">
                    <DestinationCarousal Data={DESTINATIONS_COLLECTIONS} setCurrent={setCurrentDestination} setCount={setDestinationCount} currentDestination={currentDestination} />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>


        <div className=" w-full flex-center relative h-[100vh] bg-sky-blue-light ">

          <div className={` h-fit   flex flex-col  items-center bg-white justify-between z-10 w-11/12 xl:w-9/12 text-dark-28 rounded-3xl  ${rubik.className}`}>

            <div className="flex flex-col mt-10 lg:mt-16 2xl:mt-20">
              <h2 className={`${playfair.className} vertically-animated-element text-center heading-text max-sm:px-2`}>Trusted By Customers</h2>
              <p className=" text-center vertically-animated-element mt-7 lg:text-lg xl:text-2xl font-light max-sm:px-5">Genuine Experiences Shared by Our Happy Travelers Worldwide</p>
            </div>


            <div className="   z-30  w-full h-fit  mt-10  overflow-x-auto scrollbar-hide">
              <div ref={scaleTrackerContainer} className=" absolute   z-0 w-[1vh] lg:w-[1vh] h-[100px] left-[73%] md:left-[67%] lg:left-[62%] xl:left-[59%] 2xl:left-[59%] top-0 -translate-x-1/2 "></div>

              <div ref={testimonialContainer} style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                scrollBehavior: 'auto',
              }} className="    flex py-10 vertically-animated-element  overflow-x-scroll scrollbar-hide ">
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

        </div>

        <JournalSection />
        <PartnerCompaniesSection />

        <PlanningCardSection />

        <Footer />
        <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

      </div>
    </SmoothScroll>
  )


}