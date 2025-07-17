'use client'
import Image from "next/image"
import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"
import Button from "@/components/generalComponents/Button"
import Navbar from "@/components/Navbar/page"
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath"
import SmoothScroll from "@/components/SmoothScroll"
import Footer from "@/components/Footer/page"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCards from "@/components/generalComponents/BlogCards"
import { Dummy_Blog } from "@/constants/dummy-blog"
import { useEffect, useState } from "react"


export default function BlogSingle() {


    const [isClient, setIsClient] = useState(false);
    const [blogTitle, setBlogTitle] = useState('')


    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = Dummy_Blog;

        const h1 = tempDiv.querySelector('h1');
        setBlogTitle(h1?.textContent)
    }, [])

    if (!isClient) {
        return null; // or a loading placeholder
    }


    const BlogList = [
        { "image": "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg", "date": "10 May 2025", "description": "Top Stargazing Spots around the World for Unforgettable Views" },
        { "image": "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg", "date": "10 May 2025", "description": "Hidden Villages That Are Truly Worth Discovering and Exploring" },
        { "image": "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg", "date": "10 May 2025", "description": "Best Destinations for Wellness and Mindfulness" },
    ]




    const socialIconsStyle = 'cursor-pointer object-cover size-6 xl:size-7 2xl:size-8'


    return (
        <SmoothScroll>
            <Navbar />

            <div className={` ${rubik.className} w-full text-dark-28 h-full flex flex-col justify-center items-center`} >

                <div className="w-full h-[600px] relative">
                    <Image
                        src='/images/blog-single/banner.jpg'
                        alt='quote'
                        fill
                        priority
                        className=" object-cover "
                    />
                </div>


                <div className=" w-11/12 2xl:w-10/12 mt-10 md:mt-20  flex max-lg:flex-col   ">
                    <div className="  w-full pr-3  xl:pr-10 mt-4   h-full" >
                        <div className=" min-h-10 ">
                            <h1 className={`2xl:text-[50px] text-4xl max-xl:leading-12 text-dark-4B  ${playfair.className}`}>{blogTitle}</h1>
                        </div>

                        <div className=" w-full flex max-xl:space-y-2  max-xl:flex-col  min-h-10  2xl:text-lg justify-between  my-5 xl:my-8">
                            <div className=" flex max-lg:flex-wrap space-x-3 xl:space-x-5 items-center text-sky-blue-dark  ">
                                <div className=" flex "> <p className=" ">Posted on: <span className=" text-dark-46"> 22 May 2025</span></p></div>
                                <div className=" flex "> <p className="">In: <span className="text-dark-46"> Travel Tips</span></p></div>
                                <div className=" flex "> <p className="">Read Time: <span className="text-dark-46">5 Minutes</span></p></div>
                            </div>
                            <div className=" flex space-x-1.5 xl:space-x-3 items-center  ">
                                <img src="/Icons/single-blog/insta.svg" alt="instagram" className={`${socialIconsStyle}`} />
                                <img src="/Icons/single-blog/fb.svg" alt="facebook" className={`${socialIconsStyle}`} />
                                <img src="/Icons/single-blog/x.svg" alt="x" className={`${socialIconsStyle}`} />
                                <img src="/Icons/single-blog/whatsapp.svg" alt="whatsapp" className={`${socialIconsStyle}`} />
                                <img src="/Icons/single-blog/linkdn.svg" alt="linkedin" className={`${socialIconsStyle}`} />
                            </div>
                        </div>
                        <div className=" w-full h-full blog-content" dangerouslySetInnerHTML={{ __html: Dummy_Blog }}>

                        </div>

                    </div>

                    <div className=" w-full lg:w-6/12 xl:w-5/12 py-5 space-y-10 h-full border-l px-4 2xl:px-10 ">

                        <div className="">
                            <p className=" text-xl ml-1">Search</p>
                            <div className=" w-full h-10 mt-2 border rounded-full border-[#2A282880]/50 px-4 flex  justify-between items-center ">
                                <input type="text" className="w-[120px] outline-none placeholder:text-sm md:placeholder:text-base" placeholder="Search journal..." />
                                <img src="/Icons/search.svg" alt="search icon " className=" size-4" />
                            </div>
                        </div>

                        <div className="bg-light-beige rounded-2xl px-5 pb-4 pt-7">
                            <h3 className=" text-[24px] mb-5 ">More Blogs</h3>

                            <div className=" max-lg:flex max-lg:flex-wrap">
                                {BlogList?.map((blog, index) => (
                                    <div key={index} className=" flex my-3 lg:my-6 space-x-3">
                                        <div className=" w-[130px] shrink-0 rounded-lg overflow-hidden h-[120px] 2xl:h-[130px] relative">
                                            <Image
                                                src={blog.image}
                                                alt='blog'
                                                fill
                                                priority
                                                className=" object-cover "
                                            />
                                        </div>
                                        <div className="font-light mt-1 max-xl:text-sm ">
                                            <p className=" flex items-center "><img src="/Icons/calender-dark.svg" alt="" className=" size-4 mr-2" /> 10 May 2025</p>
                                            <p className=" xl:leading-7 mt-1">{blog.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className=" w-full h-[600px] rounded-2xl overflow-hidden relative">
                            <Image
                                src='/images/blog-single/mountain-in-sea.png'
                                alt='beach'
                                fill
                                priority
                                className=" object-cover "
                            />
                            <div className=" w-full h-full flex items-end  bg-gradient-to-t from-black via-black/30 to-transparent  absolute inset-0">
                                <div className=" flex flex-col p-5  space-y-3">
                                    <h3 className={`md:text-[30px] text-2xl xl:pr-7 leading-11  text-white ${playfair.className}`}>Turning your travel dreams into real Adventures.</h3>
                                    <Button text='PLAN YOUR TRIP' buttonStyle={` transition-all mb-3 vertically-animated-element  max-sm:text-sm duration-500 w-full py-2.5  ease-in-out font-medium  `} />

                                </div>

                            </div>
                        </div>


                        <div className="  space-y-6 w-full h-full pb-6 pt-10 px-5 text-center rounded-2xl bg-dark-beige">
                            <h5 className={`${playfair.className} font-medium text-2xl`}>Join Our Community Today!</h5>
                            <p className=" px-4 lg:px-7 font-light">Get started for free and receive instant notifications about updates.</p>
                            <input type="text" className=" text-dark-28 outline-none w-full py-2 pl-4 rounded-md border-2 border-[#979797]/50" placeholder="Enter your email" />
                            <Button text='SUBSCRIBE' buttonStyle={` transition-all mb-3 vertically-animated-element duration-500  w-full py-2.5  max-sm:text-sm ease-in-out font-medium  `} />
                        </div>

                    </div>
                </div>

                <div className=" w-11/12  my-10 lg:my-20 rounded-3xl py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden flex justify-center  bg-sky-blue-light  md:min-h-[85vh] h-full   relative  ">
                    <ResponsiveClipPath outerClass='absolute z-30 w-full  h-4/12   lg:w-7/12 md:w-9/12 md:h-7/12 lg:h-6/12 xl:w-9/12  2xl:w-8/12 left-0 top-0 xl:h-8/12' ImagePath='/images/blog-single/related-blogs-clip-path.png' />
                    <ResponsiveClipPath outerClass='absolute z-30 md:w-2/12 w-9/12 h-3/12 right-0 bottom-0 md:h-4/12' ImagePath='/images/blog-single/related-blogs-clip-bottom.png' />


                    <div className=" xl:w-10/12  w-11/12  h-full">
                        <h2 className={`${playfair.className}  text-3xl md:text-4xl xl:text-[50px] font-semibold text-dark-4B`}>Related Posts</h2>

                        <div className=" w-full flex max-sm:flex-col  mt-5 lg:mt-10 space-y-6 md:space-x-10 h-[400px] md:h-[300px] lg:h-[400px] xl:h-[400px] 2xl:h-[480px]">

                            <BlogCards
                                outerConatainerClass="relative group cursor-pointer  z-30 h-full  w-full md:w-5/12  rounded-2xl overflow-hidden"
                                imageUrl="/images/home/girrafe-in-grassland.jpg"
                                title="Top Stargazing Spots Around the World for Unforgettable" />
                            <BlogCards
                                outerConatainerClass="relative group cursor-pointer  z-30 w-full h-full  md:w-7/12  rounded-2xl overflow-hidden"
                                imageUrl="/images/home/zebras-in-grasslands.jpg"
                                title="Best Destinations for Wellness and Mindfulness" />
                        </div>

                    </div>


                </div>

            </div>
            <Footer />

        </SmoothScroll>

    )
}

