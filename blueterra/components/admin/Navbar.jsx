'use client'

import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineKeyboardArrowDown } from '../reactIcons'
import { SIDEBAR_ITEMS } from '../../constants/admin'
import { useState, useEffect } from "react";
import Link from "next/link";
import useClickOutside from "@/app/hooks/useClickOutside";
import AXIOS_INSTANCE from "@/lib/axios";


const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [itemName, setItemName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropDownRef = useClickOutside(() => setDropdownOpen(false))


    useEffect(() => {
        const item = SIDEBAR_ITEMS.find(item => item.path === pathname)
        if (item) setItemName(item.name)
    }, [pathname])


    const handleLogout = async () => {
        try {
            const response = await AXIOS_INSTANCE.post(`logout/`, {});
            router.replace("/login");

        } catch (error) {
            toast.error(error?.response?.data?.error)

        } finally {
            // setIsLoading(false);
        }

    }

    return (
        <div className=" w-full flex  h-[70px] lg:h-[75px] justify-end pl-10 bg-brand-blue">

            <div className=" w-full flex   px-6 items-center justify-between bg-white  rounded-bl-4xl">
                <Link href='/'>
                    <div className=" relative w-[120px] h-[30px] lg:w-[160px] lg:h-[40px] shrink-0 ">
                        <Image
                            src="/images/login/logo-2.png"
                            alt="nature background"
                            fill
                            className=" object-contain z-0"
                        />
                    </div>
                </Link>
                <div className=" w-10/12 flex items-center justify-between ">
                    <p className=" text-lg lg:text-xl font-normal">{itemName}</p>

                    <div className=" flex space-x-4  items-center relative">
                        <div className=" p-3 rounded-md bg-[#F3F3F3] flex-center">
                            <img src="/Icons/bell.svg" alt="bell" className=" w-full h-full" />
                        </div>

                        {/* Profile + Dropdown */}
                        <div
                            ref={dropDownRef}
                            className=" ml-4 relative flex items-center cursor-pointer select-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="relative rounded-xl size-12 ">
                                <Image
                                    src="/images/static/profile.png"
                                    alt="profile"
                                    fill
                                    className=" object-contain rounded-xl z-0"
                                />
                            </div>
                            <div className=" ml-3 flex flex-col justify-between">
                                <h4 className="  font-medium">Jerald Jacob</h4>
                                <p className="  text-[#4C4C4C] font-light">Admin</p>
                            </div>
                            <div className="ml-3">
                                <MdOutlineKeyboardArrowDown className={`text-brand-blue text-2xl transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                            </div>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute z-[999] right-0 top-16 w-48 bg-white shadow-lg rounded-lg py-2 border">

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm  hover:bg-gray-100"
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm  hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
