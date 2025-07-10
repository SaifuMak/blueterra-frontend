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
gsap.registerPlugin(useGSAP, ScrollTrigger)


export default function Home() {

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

  const currentDestinationTitleRef = useRef()
  const prevDestinationTitleRef = useRef()

  const currentDestinationDescriptionRef = useRef()
  const prevDestinationDescriptionRef = useRef()


  const boxData = [
    { id: 1, title: 'Box 1', color: 'bg-red-400' },
    { id: 2, title: 'Box 2', color: 'bg-green-400' },
    { id: 3, title: 'Box 3', color: 'bg-blue-400' },
    { id: 4, title: 'Box 4', color: 'bg-yellow-400' },
    { id: 5, title: 'Box 5', color: 'bg-purple-400' },
    { id: 6, title: 'Box 1', color: 'bg-red-400' },
    { id: 7, title: 'Box 2', color: 'bg-green-400' },
    { id: 8, title: 'Box 3', color: 'bg-blue-400' },
    { id: 9, title: 'Box 4', color: 'bg-yellow-400' },
    { id: 10, title: 'Box 5', color: 'bg-purple-400' },
  ];
  const cardRefs = useRef([]);

  const testimonialContainer = useRef(null);
  const scaleTrackerContainer = useRef(null);
  const destinationBannerRef = useRef(null);


  const scrollSpeed = 2; // pixels per frame

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

        const isInside =
          cardRect.left < triggerRect.right &&
          cardRect.right > triggerRect.left;

        // if (isInside) {
        //   card.classList.add("scale-in");
        // } else {
        //   card.classList.add("scale-reset");
        // }

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
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, { scope: welcomeContainerRef });


  useGSAP(() => {
    const elements = gsap.utils.toArray(".scale-opacity-animate");

    elements.forEach((box) => {
      gsap.fromTo(
        box,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, { scope: welcomeContainerRef });


  const videoRef = useRef(null);


  useEffect(() => {
    if (videoRef.current?.readyState >= 3) { // 3 = HAVE_FUTURE_DATA
      console.log("Video already loaded (readyState:", videoRef.current.readyState, ")");
      setIsBannerVideoLoaded(true);
    }
  }, []);


  useEffect(() => {
    if (!messageContainerRef.current) return

    gsap.fromTo(
      videoRef.current,
      { scale: 1 }, // Starting value
      {
        scale: 1.09, // Ending value
        duration: 2,
        ease: "power3.out", // 👈 Easing added
        scrollTrigger: {
          trigger: messageContainerRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
          // markers: true,
        },
      }
    );

  }, [])



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
            preload="auto"
            // onLoadStart={() => console.log("Loading started")}
            // onLoadedData={() => {
            //   console.log("First frame loaded");
            //   setIsBannerVideoLoaded(true);
            // }}
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
              <Button text='PLAN YOUR TRIP' buttonStyle={`  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'}  translate-all duration-1000 ease-in-out max-md:text-sm px-4 lg:px-8 xl:px-10 py-1.5 lg:py-2.5 `} />

            </div>
          </div>

        </div>


        <div ref={messageContainerRef} className=" w-full h-full max-md:py-8 lg:h-[90vh]   flex flex-col justify-center  relative overflow-hidden ">

          <div className="absolute w-[25%] left-0  bottom-0 h-fit">

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
              className=" "
              style={{ objectFit: 'cover' }}
            />
          </div>


          <div className={` w-full  flex justify-center bg-white  text-center`}>
            <div className={`${rubik.className}  md:px-10 px-5 text-dark-28  w-full lg:w-10/12  xl:w-8/12 space-y-6 2xl:space-y-8`}>
              <h2 className={`${playfair.className} text-3xl vertically-animated-element  lg:text-4xl xl:text-[48px] text-dark-4B`}>Welcome To BlueTerra</h2>
              <p className=" vertically-animated-element 2xl:text-2xl max-sm:text-base text-lg lg:text-xl font-light leading-8 xl:leading-10 ">We are a boutique, founder-led travel brand based in the UAE, dedicated to crafting thoughtful and personalized journeys. </p>
              <p className=" vertically-animated-element 2xl:text-xl text-sm lg:text-lg font-light leading-8 xl:leading-10 lg:px-6  ">With a strong commitment to sustainability, we design travel experiences that honor local cultures and reduce environmental impact. Each itinerary reflects a deep understanding of conscious travel, offering unique adventures tailored for the modern explorer. Our mission is to redefine luxury through purpose-driven travel.</p>
              <p className=" vertically-animated-element 2xl:text-xl lg:text-lg text-sm -mt-3  font-light leading-8 xl:leading-10 ">Every journey we curate is rooted in authenticity, blending meaningful experiences with comfort and style. We partner with local communities, artisans, and guides to ensure that our travelers connect deeply with the places they visit, beyond the surface. </p>

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

              <div className=" 2xl:w-11/12 w-full max-2xl:px-5   mt-4 ">
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
        <div className=" w-full mt-12 2xl:mt-20 z-0 h-[110vh] overflow-hidden relative max-lg:hidden ">

          <Image
            ref={destinationBannerRef}
            src={DESTINATIONS_COLLECTIONS[currentDestination].bannerImage}
            alt="air balloon"
            fill
            priority
            className="object-fill"
          />
          <div className=" w-full h-full text-white absolute flex flex-col translate-all duration-1000 ease-in-out  items-end inset-0 bg-[#0E518199]/80 ">

            <div className={`2xl:w-11/12 w-full max-2xl:pl-10 h-[70vh] xl:h-[80vh]  mt-[10vh] ${playfair.className} `}>

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

                <div className=" flex items-center w-10/12 overflow-hidden justify-center  space-x-8 ">

                  <div className=" w-11/12   mt-4 ">
                    <DestinationCarousal Data={DESTINATIONS_COLLECTIONS} setCurrent={setCurrentDestination} setCount={setDestinationCount} currentDestination={currentDestination} />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>


        <div className=" w-full flex-center relative h-[100vh] bg-sky-blue-light ">

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

          <div className={`xl:h-[80%] 2xl:h-[80%] md:h-[83%] h-[80%]   flex flex-col relative items-center justify-between z-10 w-11/12 xl:w-9/12 text-dark-28 rounded-3xl bg-white ${rubik.className}`}>

            <div className="flex flex-col mt-10 lg:mt-16 2xl:mt-20">
              <h2 className={`${playfair.className} vertically-animated-element text-center heading-text max-sm:px-2`}>Trusted By Customers</h2>
              <p className=" text-center vertically-animated-element mt-7 lg:text-lg xl:text-2xl font-light max-sm:px-5">Genuine Experiences Shared by Our Happy Travelers Worldwide</p>
            </div>


            <div className="  absolute z-30 -bottom-10 w-full h-fit   overflow-x-auto scrollbar-hide">
              <div ref={scaleTrackerContainer} className=" absolute      z-0 w-[1vh] lg:w-[3vh] h-[100px] left-[50%] lg:left-[47%] top-0 -translate-x-1/2 "></div>

              <div ref={testimonialContainer} style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                scrollBehavior: 'auto',
              }} className="    flex py-10 vertically-animated-element  overflow-x-scroll scrollbar-hide ">
                {extendedTestimonials?.map((testimonial, index) => (
                  <div key={index} ref={(el) => (cardRefs.current[index] = el)} className=" lg:min-w-[320px] min-w-[280px] overflow-hidden testimonial-card mx-10 z-20 bg-white  min-h-[50%] h-fit px-5 lg:px-10 py-10  rounded-2xl " style={{ boxShadow: '0 0 25px 1px rgba(153, 189, 188, 0.3)', }}>
                    <p className=" font-light md:leading-8 leading-7 ">{testimonial.message}</p>
                    <p className=" text-sky-blue-dark mt-5">{testimonial.name}</p>
                    <p className=" font-light mt-2">{testimonial.country}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>


        <div className=" relative w-full flex  flex-col  items-center h-[130vh]  bg-white   max-lg:hidden ">
          <div className=" w-[30%]   absolute left-0 top-0    ">
            <Image
              src='/images/home/journal-left-path.png'
              alt="pattern"
              width={300}
              height={400}
              className=" object-cover"
            />
          </div>

          <div className=" w-fit absolute  right-0  bottom-0">
            <Image
              src='/images/home/journal-right-path.png'
              alt="pattern"
              width={500}
              height={500}
              className=" object-cover"
            />
          </div>

          <div className=" w-full flex justify-center text-dark-4B mt-20 mb-16">
            <h3 className={`${playfair.className} vertically-animated-element heading-text`}>BlueTerra Journal</h3>
          </div>

          <div className=" flex  space-x-7  2xl:space-x-10 w-11/12">
            <div className=" w-1/3 group overflow-hidden h-[90vh] cursor-pointer rounded-xl  relative scale-opacity-animate">
              <Image
                src='/images/home/zebras-in-grasslands.jpg'
                alt="zebra"
                fill
                className=" object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
              />
              <JournalsCardOverlay text='Best Destinations for Wellness and Mindfulness' />
            </div>

            <div className=" flex flex-col h-[90vh] w-1/3 space-y-7  2xl:space-y-10 ">
              <div className=" w-full group overflow-hidden cursor-pointer h-[45vh]  rounded-xl relative scale-opacity-animate">
                <Image
                  src='/images/home/rock-in-river.jpg'
                  alt="rock in river "
                  fill
                  className="object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
                />
                <JournalsCardOverlay text='Why Boutique Travel is Shapingthe Future of Personalized' />

              </div>
              <div className=" w-full group overflow-hidden cursor-pointer h-[45vh]  rounded-xl relative scale-opacity-animate">
                <Image
                  src='/images/home/zebras-in-grasslands.jpg'
                  alt="zebra"
                  fill
                  className="object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
                />
                <JournalsCardOverlay text='Most Instagrammable Villages Around the Globe' />

              </div>

            </div>

            <div className=" w-1/3 h-[90vh] group overflow-hidden cursor-pointer  rounded-xl bg-red-50 relative scale-opacity-animate">
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
            <Button text='VIEW ALL' buttonStyle='px-16 py-2 vertically-animated-element  ' isHoverWhiteApplied={false} />
          </div>

        </div>


        <div className=" w-full flex-center pb-10 mt-16 ">
          <div className=" 2xl:w-10/12 w-full lg:w-11/12 flex px-10    lg:space-x-20">
            <Marquee pauseOnHover>
              {boxData?.map((data, index) => (
                <div key={index} className=" lg:w-[150px] w-[120px] h-[60px]  group cursor-pointer relative mx-5 lg:mx-10">
                  <Image
                    src='/images/partner-company/logo-1.png'
                    alt="pattern"
                    width={600}
                    height={500}
                    className=" object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <div className="  lg:h-[70vh] max-lg:mb-10  w-full flex flex-col items-center relative mt-5 xl:mt-10 2xl:mt-16 ">

          <div className=" w-[30%]  absolute left-0  bottom-0    ">
            <Image
              src='/images/home/newsletter-left-path.png'
              alt="pattern"
              width={500}
              height={500}
              className=" object-cover"
            />
          </div>

          <div className=" w-fit  absolute  right-0  bottom-0    ">
            <Image
              src='/images/home/newsletter-right-path.png'
              alt="pattern"
              width={500}
              height={500}
              className=" object-cover"
            />
          </div>

          <div className={`flex max-lg:flex-col w-10/12 lg:w-11/12  max-lg:space-y-10 lg:space-x-10  xl:space-x-16 ${rubik.className}`}>
            <div className=" w-full lg:w-1/2 h-[45vh] lg:h-[55vh] relative group overflow-hidden rounded-4xl scale-opacity-animate">
              <Image
                src='/images/home/three-friends.jpg'
                alt="three-friends"
                fill
                className="object-cover scalling-group-110 rounded-4xl "
              />
              <div className=" absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black/20 cursor-pointer rounded-4xl">
                <h3 className={`xl:text-[50px] text-3xl lg:text-4xl ${playfair.className} vertically-animated-element text-center  font-normal text-white`}>Book Your Next Trip</h3>
                <Button text='PLAN YOUR TRIP' buttonStyle='xl:px-12 px-6 py-2 xl:py-2.5 mt-8 max-md:text-sm  vertically-animated-element' />

              </div>
            </div>
            <div className=" w-full lg:w-1/2 group overflow-hidden h-[45vh] lg:h-[55vh] relative rounded-4xl scale-opacity-animate">
              <Image
                src='/images/home/beautiful-sea.jpeg'
                alt="beautiful-sea"
                fill
                className={`object-cover scalling-group-110 rounded-4xl`}
              />
              <div className=" absolute inset-0 w-full h-full flex flex-col justify-center text-center items-center bg-black/20 cursor-pointer rounded-4xl">
                <h3 className={`xl:text-[50px] text-3xl lg:text-4xl ${playfair.className} vertically-animated-element  font-normal text-white`}>Join Our Community</h3>
                <p className=" xl:text-[23px] lg:text-xl max-md:px-4  2xl:text-[23px] text-white font-light mt-7 vertically-animated-element tracking-wide ">Get expert travel tips straight to your inbox.</p>

              </div>
            </div>
          </div>

        </div>


        <Footer />




      </div>
    </SmoothScroll>
  )


}