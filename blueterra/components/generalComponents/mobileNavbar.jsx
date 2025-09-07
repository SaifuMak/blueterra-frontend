'use client'

import Link from "next/link"
import Image from "next/image"
import { HiMenuAlt3, RxCross2 } from '../reactIcons'
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { rubik } from '@/app/fonts'
import Button from "./Button";
import { usePathname } from "next/navigation";
import ZohoFormModal from "../Forms/ZohoFormModal";


export default function mobileNavbar({ MenuItems, isMenuOpened, setIsMenuOpened }) {

    const pathname = usePathname()

    const [formOpen, setFormOpen] = useState(false);



    return (
        <>

            <div className={` ${rubik.className} w-full flex flex-col relative   z-50 justify-center`}>

                <div className="flex justify-between w-full  h-[50px] items-center pr-5 ">
                    <Link href='/'>

                        <div className="w-[140px] relative h-[35px]  shrink-0 ">
                            <Image
                                src="/images/general/logo.png"
                                alt="logo"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                    </Link>


                    <div className=" flex space-x-6 justify-center items-center ">
                        {/* <IoSearchOutline className="text-2xl text-brand-blue font-semibold" /> */}
                        <HiMenuAlt3 onClick={() => setIsMenuOpened(!isMenuOpened)} className="text-3xl text-brand-blue cursor-pointer " />
                    </div>

                </div>
                {/* 
                <div className={` shadow-lg bg-white  overflow-hidden  pb-10 flex px-4 py-4  flex-col transition-all duration-1000 ease-in-out     ${isMenuOpened ? 'max-h-[580px] opacity-100  z-50 ' : 'max-h-0 opacity-0 z-0'}`}>
                    <div className=" flex flex-col space-y-6 font-extralight ">
                        {MenuItems.map((items, index) => (
                            <Link key={index} href={items.link} className={`${index === 1 ? ' text-brand-blue' : ' text-dark-28'}`}>{items.nav}</Link>
                        ))}
                    </div>
                    <Link href="/" className=" mt-6  px-4 rounded-sm  bg-brand-blue  text-white w-fit py-1">Contact us</Link>
                </div> */}


                <div className={`w-full h-[120vh]  z-[999px] inset-0 absolute transform duration-1000 ease-in-out  transition-transform ${isMenuOpened ? 'translate-x-0' : 'md:-translate-x-[1000px] -translate-x-[800px]'}  `}>
                    <div className={` shadow-lg bg-white  overflow-hidden  px-5 py-3  flex  flex-col  h-screen`}>

                        <div className="  min-h-[50px] flex justify-end ">
                            <RxCross2 onClick={() => setIsMenuOpened(false)} className="text-3xl mt-5 text-sky-blue-1 cursor-pointer " />
                        </div>

                        {/* <div className=" w-full h-[40px] flex border-b border-sky-blue-1/50  mt-5 space-x-1 items-center ">
                            <input type="text" placeholder="Search" className=" placeholder:text-base px-2 w-full h-full caret-text-sky-blue-1  outline-none" />
                            <IoSearchOutline className="text-2xl  text-sky-blue-1 font-semibold" />
                        </div> */}

                        <div className=" flex flex-col space-y-5 mt-5  font-extralight ">
                            {MenuItems.map((items, index) => (
                                <Link key={index} href={items.link} className={`${items.url === pathname ? ' text-brand-blue' : ' text-dark-28'} text-base`}>{items.nav}</Link>
                            ))}
                            <Button text='PLAN YOUR EXPERIENCE' buttonStyle='text-nowrap max-md:text-[12px] px-4 lg:px-2 xl:px-6 py-2 lg:py-2 ' isHoverWhiteApplied={false} onClickFunction={() => setFormOpen(true)} />

                            {/* <Link href="/" className="   px-4 rounded-sm   bg-sky-blue-1  text-white w-fit py-1">Contact us</Link> */}

                        </div>
                    </div>
                </div>

            </div>
            <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

        </>
    )
}