'use client'
import Link from "next/link"
import Image from "next/image"
import { HiMenuAlt3 } from '../reactIcons'
import { IoSearchOutline } from "react-icons/io5";
import MobileNavbar from "../GeneralComponents/mobileNavbar";
import { usePathname } from "next/navigation";
import Button from "../generalComponents/Button";
import { rubik } from "@/app/fonts"

export default function Navbar() {

  const pathname = usePathname()

  const isHome = pathname === '/'

  const MenuItems = [
    { nav: 'Our Story', link: '#' },
    { nav: 'The Blueterra Collection', link: '#' },
    { nav: 'Destinations', link: '#' },
    { nav: 'Corporate & MICE', link: '#' },
    { nav: 'BlueTerra Journal', link: '#' },
  ]


  return (
    <div className={` ${rubik.className} w-full ${isHome ? ' z-50 fixed top-0' : ''}  bg-white max-xl:text-sm  h-[50px]  lg:h-[70px] flex justify-center `}>

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
            <Link key={index} href={items.link} className={`${index === 1 ? ' text-brand-blue' : ' text-dark-28'}`}>{items.nav}</Link>
          ))}
        </div>

        <div className=" flex xl:space-x-5  space-x-3 items-center   ">
          <p className=" text-dark-28 text-nowrap">+ 123 456 7890</p>

              <Button text='PLAN YOUR EXPERIENCE' buttonStyle='text-nowrap max-md:text-sm px-4 lg:px-2 xl:px-6 py-1.5 lg:py-2 text-xs 2xl:text-sm' isHoverWhiteApplied={false} />

          {/* <button className="xl:px-8 px-4 text-xs  xl:text-sm py-[6px] cursor-pointer  rounded-full bg-brand-blue text-white  ">CONTACT US</button>
          <img src="/Icons/search.svg" alt="search" className="cursor-pointer" />
          <img src="/Icons/whatsapp.svg" alt="search" className="cursor-pointer" /> */}

        </div>

      </div>

      <div className="w-full lg:hidden">
        <MobileNavbar MenuItems={MenuItems} />
      </div>

    </div>

  )
}
