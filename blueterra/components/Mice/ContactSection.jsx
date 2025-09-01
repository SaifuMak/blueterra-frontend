import React from 'react'
import ResponsiveClipPath from '../generalComponents/ResponsiveClipPath'
import { playfair } from '@/app/fonts'
import { forwardRef } from 'react'


const ContactSection = forwardRef((props, ref) => {

    const CONTACT_DETAILS = [
        { "title": "Call:", "details": "+971 58 541 2123", "icon": "/Icons/phone-blue.svg" },
        { "title": "Email:", "details": "connect@myblueterra.com", "icon": "/Icons/email-blue.svg" },
        { "title": "Business Hours:", "details": "Mon - Sat: 9AM - 6PM", "icon": "/Icons/clock-blue.svg" },
        { "title": "Address:", "details": "Meydan Freezone,", "subDetails": "Dubai - U.A.E", "icon": "/Icons/location-blue.svg" },

    ]


    return (
        <div ref={ref} className=" w-full h-full py-7 md:py-20   text-dark-28  flex-center relative">

            <ResponsiveClipPath
                outerClass='absolute md:w-[28%] w-[45%]  -bottom-12 right-0 h-fit'
                ImagePath='/images/corporate/patterns/contact-bottom.png'
                width={600}
            />
            <div className="2xl:w-11/12 lg:w-full w-11/12 max-sm:my-10  max-lg:space-y-10  lg:space-x-10 flex max-lg:flex-col items-center  justify-center">

                <div className="lg:w-4/12  w-full flex flex-col max-sm:pl-3  xl:space-y-6 2xl:space-y-8 ">
                    <h4 className={`${playfair.className} vertically-animated-element font-medium max-md:text-3xl text-[42px] xl:text-[50px]`} >Get in Touch</h4>
                    {/* <p className=" text-xl xl:text-2xl vertically-animated-element max-sm:mt-2 font-light">Have questions or need assistance?</p> */}

                    <div className=" vertically-animated-element  lg:space-y-4 max-sm:space-y-3 space-y-5 xl:space-y-6 mt-2">
                        {CONTACT_DETAILS?.map((data, index) => (
                            <div key={index} className=" flex items-center font-light space-x-3 xl:space-x-5">
                                <img src={data.icon} alt="search icon " className=" object-cover shrink-0 size-7 lg:size-8 xl:size-9" />
                                <div className=" text-lg xl:text-xl max-sm:text-base ">
                                    <p className=" font-normal">{data.title}</p>
                                    <p className=" opacity-90 mt-3   ">{data.details}</p>
                                    {data.subDetails && <p className="opacity-90  ">{data.subDetails}</p>}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                <div className="lg:w-6/12  w-full  h-full overflow-hidden  ">
                    <div className="w-full max-sm:h-[640px]  md:h-[500px] lg:h-[460px] 2xl:h-[460px] ">
                        <iframe
                            title="Zoho Form"
                            src="https://forms.zohopublic.com/blueterra/form/Sendusadirectmessage/formperma/LH1SC9iQKsMbkmNpCxnvw8TsFKPf79BaLG-GgDCVlFw"
                            frameBorder="0"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allowFullScreen
                        />
                    </div>

                </div>

            </div>
        </div>

    )
})
export default ContactSection