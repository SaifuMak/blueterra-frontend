
import Image from "next/image"
import Link from "next/link"


export default function Footer() {

    const IconsStyle = 'w-6 h-6 cursor-pointer '
    const RatingStarStyle = 'md:w-6 md:h-6 w-4 h-4 '


    const contactItems = [
        { name: '+ 91 123 456 7890', icon: '/Icons/phone.svg' },
        { name: 'info@yourdomain.com', icon: '/Icons/email.svg' },
        { name: '123 Sheikh Zayed Road,downtown Dubai', icon: '/Icons/map.svg' },
        { name: 'Mon - Sat: 9AM - 6PM', icon: '/Icons/clock.svg' },
    ]

    const footerLinks = {
        "Quick Link": {
            "Home": "#",
            "Our Story": "#",
            "The Blueterra Collection": "#",
            "Destinations": "#",
            "Corporate & MICE": "#"
        },
        "Destinations": {
            "Dubai": "#",
            "Thailand": "#",
            "Kenya": "#",
            "Maldives": "#",
            "Iceland": "#"
        },
        "Features": {
            "Signature Journeys": "#",
            "Explore by Landscape": "#",
            "Adventures in Motion": "#",
            "Mindful Escapes": "#",
            "Unforgettable Editions": "#"
        }
    }


    return (
        <div className="w-full flex justify-center  text-white text-sm xl:text-base items-center bg-[#002846] ">
            <div className="xl:w-10/12 w-full max-xl:px-8 py-10 xl:py-20  flex flex-col space-y-5">

                <div className="flex max-lg:flex-col justify-between max-lg:space-y-2  lg:items-center">
                    <div className=" flex items-center space-x-5">
                        <p className=" text-white text-2xl 2xl:text-3xl">Let’s Connect</p>

                        <div className=" flex space-x-2 xl:space-x-4 ">
                            <img src="/Icons/instagram.svg" alt="instagram" className={`${IconsStyle}`} />
                            <img src="/Icons/facebook.svg" alt="facebook" className={`${IconsStyle}`} />
                            <img src="/Icons/whatsapp-white.svg" alt="whatsapp" className={`${IconsStyle}`} />
                            <img src="/Icons/twitter.svg" alt="twitter" className={`${IconsStyle}`} />
                            <img src="/Icons/linkedin.svg" alt="linkedin" className={`${IconsStyle}`} />
                        </div>
                    </div>

                    <div className="flex   items-center space-x-3">
                        <p className=" text-white text-2xl  2xl:text-3xl">Excellent</p>

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
                    </div>
                </div>



                <div className=" flex justify-between max-lg:flex-col max-lg:space-y-5  py-5 xl:py-10 border-white/30 border-t border-b ">

                    <div className="">
                        <div className="w-[180px] relative h-[45px]  shrink-0 ">
                            <Image
                                src="/images/general/footer-logo.png"
                                alt="logo"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                        <p className=" lg:ml-2 lg:w-56 mt-2 lg:mt-4 ">We are a boutique, founder-led travel
                            brand based in the UAE, dedicated to
                            crafting thoughtful and personalized
                            journeys.</p>
                    </div>

                    <div className=" flex max-md:flex-col  2xl:space-x-28 xl:space-x-10 space-x-5">
                        {Object.entries(footerLinks).map(([section, links]) => (
                            <div key={section} className=" flex flex-col ">
                                <h6 className=" text-lg  font-medium md:mb-5  max-md:mt-5 max-md:mb-2">{section}</h6>
                                <ul className=" md:space-y-2 space-y-3">
                                    {Object.entries(links).map(([LinkText, link]) => (
                                        <li key={LinkText}>
                                            <Link href={link} className="text-nowrap">{LinkText}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className=" max-md:mt-6">

                            <ul className="space-y-2">
                                <h6 className=" text-lg  font-medium mb-3">Contact</h6>

                                {contactItems.map((data, index) => (

                                    <div key={index} className=" flex  items-center">
                                        <img src={data.icon} alt={data.name} className="" />
                                        <p className=" ml-2">{data.name}</p>
                                    </div>

                                ))}
                            </ul>

                        </div>

                    </div>

                </div>

                <div className=" flex max-md:flex-col max-md:space-y-2 items-center max-lg:text-xs justify-between">
                    <p className="">© 2025 BlueTerra All Rights Reserved. Design by MakTal</p>
                    <p className="">Terms & Conditions | Privacy Policy | FAQ's </p>
                </div>

            </div>

        </div>
    )

}