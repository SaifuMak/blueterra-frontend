import React from 'react'
import Image from 'next/image'
import { rubik, playfair } from '@/app/fonts'
import Button from '../generalComponents/Button'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'

function PlanningCardSection({ setFormOpen }) {

    const firstImageCard = useGsapOpacity(0, {})
    const secondImageCard = useGsapOpacity(0, {})

    return (


        <div className=" lg:h-[50vh] xl:h-[60vh]  2xl:h-[70vh]  max-lg:mb-10  w-full flex flex-col items-center relative py-5 md:py-12  2xl:py-20 ">


            <div className=" w-fit  absolute  right-0  bottom-0    ">
                {/* <Image
                    src='/images/home/newsletter-right-path.png'
                    alt="pattern"
                    width={500}
                    height={500}
                    className=" object-cover"
                /> */}
            </div>

            <div className={`flex max-lg:flex-col w-10/12 lg:w-11/12  lg:h-screen  max-lg:space-y-10 lg:space-x-10  xl:space-x-16 ${rubik.className}`}>
                <div ref={firstImageCard} className=" w-full lg:w-1/2 max-lg:h-[40vh]  relative group overflow-hidden rounded-4xl ">
                    <Image
                        src='/images/home/three-friends.jpg'
                        alt="three-friends"
                        fill
                        className="object-cover scalling-group-110 rounded-4xl "
                    />
                    <div className=" absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black/20 cursor-pointer rounded-4xl">
                        <h3 className={`2xl:text-[50px] text-3xl xl:text-[45px]  lg:text-4xl ${playfair.className}  text-center max-sm:px-4  font-normal text-white`}>Where Will You Go Next ?</h3>
                        <Button text='PLAN YOUR JOURNEY' buttonStyle='xl:px-12 px-6 py-2 xl:py-2.5 mt-8 max-md:text-xs  ' onClickFunction={() => setFormOpen(true)} />

                    </div>
                </div>
                <div ref={secondImageCard} className=" w-full lg:w-1/2 max-lg:h-[40vh] group overflow-hidden  relative rounded-4xl">
                    <Image
                        src='/images/home/join-our-community.jpg'
                        alt="join-our-community"
                        fill
                        className={`object-cover scalling-group-110 rounded-4xl`}
                    />

                    <div className=" absolute overflow-hidden inset-0 w-full h-full flex flex-col justify-center text-center items-center bg-black/20 cursor-pointer rounded-4xl">

                        <div className="">
                            <h3 className={`2xl:text-[50px] xl:text-[45px] text-3xl lg:text-4xl ${playfair.className}   font-normal text-white`}>Join Our Community</h3>
                            <p className=" xl:text-[23px] lg:text-xl max-md:px-4  xl:w-10/12 mb-3  mx-auto 2xl:text-[23px] text-white font-light md:mt-7 mt-3  tracking-wide ">Exclusive travel ideas, tips, and stories to inspire your next journey</p>
                            {/* <div className="w-11/12 mt-3 flex-center h-[90px]  lg:h-[200px] overflow-hidden" >
                            <iframe
                                title="Zoho Form"
                                src="https://forms.zohopublic.com/blueterra/form/JoinOurCommunity1/formperma/tq1z2CAalSFUwdWkL0eLA_mkzm2nXum54WsJjuA1SzA"
                                style={{ width: '100%', height: '80%', border: 'none', objectFit: 'cover' }}
                                allowFullScreen
                            />
                        </div> */}
                            <iframe
                                title="Zoho Form"
                                src="https://forms.zohopublic.com/blueterra/form/JoinOurCommunity1/formperma/tq1z2CAalSFUwdWkL0eLA_mkzm2nXum54WsJjuA1SzA"
                                style={{ width: '100%', height: '80%', border: 'none', objectFit: 'cover' }}
                                allowFullScreen
                            />

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default PlanningCardSection