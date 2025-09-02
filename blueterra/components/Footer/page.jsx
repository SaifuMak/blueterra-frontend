
import Image from "next/image"
import Link from "next/link"
import { rubik } from "@/app/fonts"
import ReviewWidget from "./ReviewWidget"

export default function Footer() {

    const IconsStyle = 'w-6 h-6 cursor-pointer shrink-0 '
    const RatingStarStyle = 'md:w-6 md:h-6 w-4 h-4 '

    const footerLinks = {
        "Useful Information": {
            "About us": "#",
            "Privacy Policy": "/privacy-policy",
            "Terms & conditions": "/terms-and-condition",
            "Careers": "#"
        },
        "Quick Links": {
            "Home": "/",
            "Our Story": "/our-story",
            "The Blueterra Collection": "/collections",
            "Destinations": "/destinations",
            "Cruise": "#",
            "MICE": "/corporate-mice"
        },
        "Popular Destinations": {
            "United Arab Emirates": "#",
            "Kenya": "#",
            "South Africa": "#",
            "Norway": "#",
            "Iceland": "#"
        },
        "Featured": {
            "Cruise Deals": "#",

            "Signature Journey": "#",
            "Explore by Landscape": "#",
            "Adventures in Motions": "#",
            "Mindfull Escapes": "#",
        }
    }


    return (
        <div className={`  ${rubik.className}w-full flex justify-center  text-white text-sm font-light xl:text-base items-center bg-[#002846] `}>
            <div className="xl:w-11/12 w-full max-xl:px-8 py-10 xl:py-10  flex flex-col space-y-5">

                <div className="flex max-lg:flex-col justify-between max-lg:space-y-2  lg:items-center">
                    <div className=" flex items-center space-x-5">
                        <p className=" text-white text-2xl font-normal 2xl:text-3xl">Let’s Connect</p>

                        <div className="flex  space-x-2 xl:space-x-4">
                            <a href="https://www.instagram.com/blueterra_travel/" target="_blank" rel="noopener noreferrer">
                                <img src="/Icons/instagram.svg" alt="Instagram" className={IconsStyle} />
                            </a>

                            <a href="https://www.facebook.com/profile.php?id=61576702785702" target="_blank" rel="noopener noreferrer">
                                <img src="/Icons/facebook.svg" alt="Facebook" className={IconsStyle} />
                            </a>

                            <a href="https://wa.me/971585412123" target="_blank" rel="noopener noreferrer">
                                <img src="/Icons/what.png" alt="WhatsApp" className={IconsStyle} />
                            </a>

                            <a href="https://www.linkedin.com/company/myblueterra/" target="_blank" rel="noopener noreferrer">
                                <img src="/Icons/linkedin.svg" alt="LinkedIn" className={IconsStyle} />
                            </a>

                            <a href="https://www.tiktok.com/@blueterra_travel?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
                                <img src="/Icons/tiktok.png" alt="TikTok" className={IconsStyle} />
                            </a>

                            <a href="https://www.youtube.com/@My_BlueTerra" target="_blank" rel="noopener noreferrer">
                                <img src="/Icons/youtube.png" alt="YouTube" className={IconsStyle} />
                            </a>
                        </div>

                    </div>

                    <ReviewWidget />



                    {/* <div className="flex   items-center space-x-3">
                        <p className=" text-white text-2xl font-normal 2xl:text-3xl">Excellent</p>

                        <div className=" flex space-x-0.5 ">
                            <img src="/Icons/white-star-in-yellow-background.svg" alt="star" className={`${RatingStarStyle}`} />
                            <img src="/Icons/white-star-in-yellow-background.svg" alt="star" className={`${RatingStarStyle}`} />
                            <img src="/Icons/white-star-in-yellow-background.svg" alt="star" className={`${RatingStarStyle}`} />
                            <img src="/Icons/white-star-in-yellow-background.svg" alt="star" className={`${RatingStarStyle}`} />
                            <img src="/Icons/white-star-in-yellow-background.svg" alt="star" className={`${RatingStarStyle}`} />
                        </div>

                        <div className=" max-md:w-[100px] ">
                            <img src="/Icons/trust-badge.svg" alt="trust badge" className={`w-full h-full`} />
                        </div>
                    </div> */}
                </div>



                <div className=" flex justify-between max-lg:flex-col max-lg:space-y-5  py-5 xl:py-10 border-white/30 border-t border-b ">

                    <div className=" ">
                        <div className="w-[180px] relative h-[45px]  shrink-0 ">
                            <Image
                                src="/images/general/footer-logo.png"
                                alt="logo"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                        <p className=" lg:ml-2 mt-2 lg:mt-4 lg:w-84 xl:w-72 2xl:w-96 ">A boutique travel company based in Dubai, curating premium journeys and bespoke events.
                            We design meaningful experiences across the world, blending luxury with a lighter footprint.
                            Trusted partners, seamless planning, and stories you’ll carry long after the journey ends.</p>
                    </div>

                    <div className=" flex max-md:flex-col  2xl:space-x-10 xl:space-x-10 space-x-5  ">
                        {Object.entries(footerLinks).map(([section, links]) => (
                            <div key={section} className=" flex flex-col ">
                                <h6 className=" text-lg  font-normal md:mb-5  max-md:mt-5 max-md:mb-2">{section}</h6>
                                <ul className=" md:space-y-2 space-y-3">
                                    {Object.entries(links).map(([LinkText, link]) => (
                                        <li key={LinkText}>
                                            {LinkText === "Careers" ? (
                                                <a href="mailto:connect@myblueterra.com" className="text-nowrap hover:opacity-80 transition">
                                                    {LinkText}
                                                </a>
                                            ) : (
                                                <Link href={link} className="text-nowrap hover:opacity-80 transition">
                                                    {LinkText}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className=" max-md:mt-6">

                            <ul className="space-y-2">
                                <h6 className=" text-lg  font-normal mb-3">Contact</h6>

                                <div className="flex max-w-sm items-center">
                                    <img src="/Icons/phone.svg" alt="Phone" className="shrink-0" />
                                    <a href="tel:+971585412123" className="ml-2  hover:opacity-80 transition">
                                        +971 58 541 2123
                                    </a>
                                </div>

                                <div className="flex max-w-sm items-center">
                                    <img src="/Icons/email.svg" alt="Email" className="shrink-0" />
                                    <a href="mailto:connect@myblueterra.com" className="ml-2 transition  hover:opacity-80 ">
                                        connect@myblueterra.com
                                    </a>
                                </div>

                                <div className="flex max-w-sm items-center">
                                    <img src="/Icons/map.svg" alt="Location" className="shrink-0" />
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Meydan+Grandstand,+6th+floor,+Meydan+Road,+Nad+Al+Sheba,+Dubai,+UAE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 transition  hover:opacity-80"
                                    >
                                        Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
                                    </a>
                                </div>

                                <div className="flex max-w-sm items-center">
                                    <img src="/Icons/clock.svg" alt="Working Hours" className="shrink-0" />
                                    <p className="ml-2">Monday to Friday: 9:00 AM – 5:30 PM GST (UAE)</p>
                                </div>

                            </ul>

                        </div>

                    </div>

                </div>

                <div className=" flex max-md:flex-col max-md:space-y-2 items-center max-lg:text-xs justify-between">
                    <p className=""> <span className=" text-[#45A5FF] mr-0.5">©</span>
                        BlueTerra L.L.C-FZ | License No. 2533928.01 | All Rights Reserved  </p>

                    <p className=" group"><a href="https://maktalseo.com/" target="_blank" rel="noopener noreferrer" className=" hover:cursor-pointer">Website designed by <span className=" transition-all duration-700">MakTal</span></a></p>
                </div>

            </div>

        </div>
    )

}