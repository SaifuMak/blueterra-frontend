'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react";
// import { HiMenuAlt3 } from '../reactIcons'
// import { IoSearchOutline } from "react-icons/io5";
import MobileNavbar from "../generalComponents/mobileNavbar";
import { usePathname } from "next/navigation";
import Button from "../generalComponents/Button";
import { rubik } from "@/app/fonts"
import ZohoFormModal from "../Forms/ZohoFormModal";
import { gsap } from "gsap";


export default function Navbar({ isfixed = false, onNavClick }) {

  const pathname = usePathname()
  const navRef = useRef(null);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

   const lastScrollY = useRef(0);

  const [isMenuOpened, setIsMenuOpened] = useState(false)


  const MenuItems = [

    { nav: 'Our Story', link: '/our-story', url: '/our-story' },
    { nav: 'The BlueTerra Collection', link: '/collections', url: '/collections' },
    { nav: 'Destinations', link: '/destinations', url: '/destinations' },
    { nav: 'Cruise', link: '/cruise', url: '/cruise' },
    { nav: 'MICE', link: '/corporate-mice', url: '/corporate-mice' },
    { nav: 'Journal', link: '/journal', url: '/journal' },

  ]

  useEffect(() => {
    if (isfixed) {
      return
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = lastScrollY.current - currentScrollY; // positive if scrolling up

      if (window.scrollY > lastScrollY.current + 15) {
        // scrolling down → hide navbar
        gsap.to(navRef.current, {
          y: isMenuOpened ? "0%" : "-100%",
          // y:  "-100%",
          duration: 0.8,
          ease: "power3.out",
        });
      } else if (diff > 15) {
        // scrolling up → show navbar
        gsap.to(navRef.current, {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
        });
      }
      // setLastScrollY(window.scrollY);
      lastScrollY.current = window.scrollY
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {/* <div className={` ${rubik.className} w-full ${isfixed ? ' z-50 fixed top-0' : ''}  bg-white max-xl:text-sm  h-[50px]  lg:h-[70px] flex justify-center `}> */}
      <div ref={navRef} className={` ${rubik.className} w-full  z-[999]  fixed top-0 bg-white max-xl:text-sm  h-[50px]  lg:h-[70px] flex justify-center `}>

        <div className="xl:w-11/12 w-full max-xl:pr-4 max-lg:hidden  flex  overflow-hidden max-2xl:text-sm  items-center justify-between">
          {/* <div className="xl:w-[200px] relative xl:h-[200px] h-[160px]  w-[160px] "> */}
          <Link href='/'>
            <div className="w-[180px] relative h-[45px] shrink-0 ">

              <Image
                src="/images/general/logo.png"
                alt="logo"
                fill
                className="object-contain" // -z-10 sends it behind other content
                quality={100}
              />

            </div>
          </Link>


          <div className=" 2xl:space-x-10 xl:space-x-6 space-x-4 text-nowrap">
            {MenuItems.map((items, index) => (

              <Link key={index}
                href={items.link}
                onClick={() => {
                  if (onNavClick) onNavClick(items.link);
                }}
                className={`${items.url === pathname ? ' text-sky-blue-dark' : ' text-dark-28'}`}>{items.nav}</Link>

            ))}
          </div>

          <div className=" flex xl:space-x-5  space-x-3 items-center   ">
            <a href="tel:+971585412123" className="ml-2  hover:opacity-80 transition">
              <p className=" text-dark-28 text-nowrap">+971 58 541 2123</p>

            </a>

            <Button text='PLAN YOUR EXPERIENCE' buttonStyle='text-nowrap max-md:text-sm px-4 lg:px-2 xl:px-6 py-1.5 lg:py-2 text-xs 2xl:text-sm' isHoverWhiteApplied={false} onClickFunction={() => setFormOpen(true)} />

            {/* <button className="xl:px-8 px-4 text-xs  xl:text-sm py-[6px] cursor-pointer  rounded-full bg-brand-blue text-white  ">CONTACT US</button>
          <img src="/Icons/search.svg" alt="search" className="cursor-pointer" />
          <img src="/Icons/whatsapp.svg" alt="search" className="cursor-pointer" /> */}

          </div>

        </div>

        <div className="w-full  lg:hidden bg-white">
          <MobileNavbar MenuItems={MenuItems} isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
        </div>

      </div>

      <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

    </>
  )
}
