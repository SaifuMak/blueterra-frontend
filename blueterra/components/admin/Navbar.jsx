'use client'

import Image from "next/image"
import { usePathname } from 'next/navigation';
import { MdOutlineKeyboardArrowDown } from '../reactIcons'
import { SIDEBAR_ITEMS } from '../../constants/admin'
import { useState, useEffect } from "react";


const Navbar = () => {

    const pathname = usePathname()
    const [itemName, setItemName] = useState('');


    useEffect(() => {

        const item = SIDEBAR_ITEMS.find(item => item.path === pathname)
        if (item) setItemName(item.name)

    }, [pathname])


    return (
        <div className=" w-full flex  h-[70px] lg:h-[75px] justify-end pl-10 bg-brand-blue">

            <div className=" w-full flex   px-6 items-center justify-between bg-white  rounded-bl-4xl">
                <div className=" relative w-[120px] h-[30px] lg:w-[160px] lg:h-[40px] shrink-0 ">
                    <Image
                        src="/images/login/logo-2.png"
                        alt="nature background"
                        fill
                        className=" object-contain z-0"
                    />
                </div>
                <div className=" w-10/12 flex items-center justify-between ">
                    <p className=" text-lg lg:text-xl font-normal">{itemName}</p>

                    <div className=" flex space-x-4  items-center">
                        <div className=" p-3 rounded-md bg-[#F3F3F3] flex-center">
                            <img src="/Icons/bell.svg" alt="bell" className=" w-full h-full" />
                        </div>
                        <div className=" ml-4 flex items-center ">
                            <div className="relative rounded-xl size-12 ">
                                <Image
                                    src="/images/static/profile.png"
                                    alt="profle"
                                    fill
                                    className=" object-contain rounded-xl z-0"
                                />
                            </div>
                            <div className=" ml-3 flex flex-col justify-between">
                                <h4 className="  font-medium">Jerald Jacob</h4>
                                <p className="  text-[#4C4C4C] font-light">Admin</p>
                            </div>
                            <div className="ml-3"><MdOutlineKeyboardArrowDown className="text-brand-blue text-2xl lg:text-2xl" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar