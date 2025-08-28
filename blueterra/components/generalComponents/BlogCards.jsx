import React from 'react'
import Image from 'next/image'
import { HiArrowLongRight } from "@/components/reactIcons"
import { playfair, rubik } from "@/app/fonts"
import { useRouter } from 'next/navigation';


const BlogCards = ({ outerConatainerClass, blog }) => {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/blog-single/${blog.slug}`)} className={`${outerConatainerClass}`}>
            <Image
                src={blog?.image_public_url}
                alt={blog?.title ? blog?.title : 'blog-image'}
                fill
                className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
            />

            <div className={`${rubik.className} text-white absolute rounded-2xl pointer-events-none justify-end flex flex-col  inset-0 bg-gradient-to-t  from-black/80 via-transparent to-transparent`} >
                <div className="  px-4 xl:px-10 max-sm:py-3 md:py-5 xl:space-y-5 md:space-y-3 space-y-1.5  ">
                    <div className="  overflow-hidden ">
                        <h2 className=" text-lg lg:text-xl 2xl:text-2xl  font-normal">{blog?.title}</h2>
                    </div>
                    <div className=" flex items-center  max-2xl:text-sm  justify-between  ">
                        <div className="">
                            <p className=" font-light flex  items-center "> <span className=""><img src="/Icons/calender.svg" alt="" className=" size-4 object-cover mr-2 " /></span>{blog?.created_at}</p>
                        </div>
                        <div className="  font-light flex items-center ">
                            <p className="">Read more</p>
                            <span className="  text-2xl font-light  ml-1 text-white"><HiArrowLongRight /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCards