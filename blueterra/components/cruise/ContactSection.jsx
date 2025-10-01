import React from 'react'
import ResponsiveClipPath from '../generalComponents/ResponsiveClipPath'
import { playfair } from '@/app/fonts'
import { forwardRef } from 'react'


const ContactSection = () => {

    const CONTACT_DETAILS = [
        { "title": "Call:", "details": "+971 58 541 2123", "icon": "/Icons/phone-blue.svg" },
        { "title": "Email:", "details": "cruise@myblueterra.com", "icon": "/Icons/email-blue.svg" },
        // { "title": "Business Hours:", "details": "Mon - Sat: 9AM - 6PM", "icon": "/Icons/clock-blue.svg" },
        // { "title": "Address:", "details": "Meydan Freezone,", "subDetails": "Dubai - U.A.E", "icon": "/Icons/location-blue.svg" },
    ]


    return (
        <div className=" w-full h-full max-md:pb-4 pt-2 md:pt-12    text-dark-28  flex-center relative">

          
            <div className="2xl:w-11/12 lg:w-full w-11/12 max-sm:mt-10  max-lg:space-y-10  lg:space-x-10 flex max-lg:flex-col  justify-center">

                <div className="xl:w-4/12  lg:w-3/12   w-full flex flex-col max-sm:pl-3  xl:space-y-6 2xl:space-y-8 ">
                    <h4 className={`${playfair.className} vertically-animated-element font-medium max-md:text-2xl text-[42px] xl:text-[50px]`} >Send Enquiry</h4>
                    {/* <p className=" text-xl xl:text-2xl vertically-animated-element max-sm:mt-2 font-light">Have questions or need assistance?</p> */}

                    <div className="vertically-animated-element  lg:ml-4 lg:space-y-4 max-sm:space-y-3 space-y-5 xl:space-y-6 max-sm:mt-7 mt-2">
                        {CONTACT_DETAILS?.map((data, index) => {
                            const isPhone = data.title.toLowerCase().includes("call");
                            const isEmail = data.title.toLowerCase().includes("email");

                            // Build href based on type
                            const href = isPhone
                                ? `tel:${data.details.replace(/\s+/g, '')}` // remove spaces for tel link
                                : isEmail
                                    ? `mailto:${data.details}`
                                    : null;

                            const Wrapper = href ? 'a' : 'div';

                            return (
                                <div
                                    key={index}
                                    className="flex items-center font-light space-x-3 xl:space-x-5"
                                >
                                    <img
                                        src={data.icon}
                                        alt={`${data.title} icon`}
                                        className="object-cover shrink-0 size-7 lg:size-8 xl:size-8"
                                    />

                                    <div className="text-lg xl:text-lg max-sm:text-base">
                                        <p className="font-normal">{data.title}</p>

                                        <Wrapper
                                            href={href || undefined}
                                            className={`opacity-90 mt-1 ${href ? " hover:underline cursor-pointer" : ""}`}
                                        >
                                            {data.details}
                                        </Wrapper>
                                        {/* 
                                        {data?.subDetails && (
                                            <p className="opacity-90">{data?.subDetails}</p>
                                        )} */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className="xl:w-6/12 lg:w-7/12   w-full  h-full overflow-hidden  ">
                    <div className="w-full   h-[800px]    md:h-[500px] lg:h-[500px] xl:h-[500px] 2xl:h-[540px] ">

                        <iframe
                            title="Zoho Form"
                            src="https://forms.zohopublic.com/blueterra/form/SendusanEnquiryCruise/formperma/dwn1DHQ4chbuTZF4BBdl2h3Tv6ophUTf9GV-_6iAjrg"
                            frameBorder="0"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allowFullScreen
                        />
                    </div>

                </div>

            </div>
        </div>

    )
}
export default ContactSection