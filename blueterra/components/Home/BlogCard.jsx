import React from 'react'
import JournalsCardOverlay from '../HomePage/JournalsCardOverlay'
import { rubik } from '@/app/fonts'
import Button from '../generalComponents/Button'
import Image from 'next/image'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'
import { useRouter } from 'next/navigation'



function BlogCard({ outerClass, data }) {

    const router = useRouter()

    // const journalRef = useGsapOpacity(0, {})

    const handleGetBlog = (slug) => {
        router.push(`/blog/${slug}`);
    };

    return (
        // <div onClick={() => handleGetBlog(data.slug)} ref={journalRef} className={outerClass}>
        <div onClick={() => handleGetBlog(data.slug)}  className={outerClass}>

            <Image
                src={data.image_public_url}
                alt={data.title}
                fill
                priority 
                className=" object-cover group-hover:scale-110 delay-100 rounded-xl transition-all duration-1000 ease-in-out"
            />
            <div className={` ${rubik.className}  pointer-events-none absolute cursor-pointer  w-full bg-gradient-to-t rounded-xl from-black/60 to-transparent  flex  items-end bottom-0 right-0 inset-0 `}>
                <div className=" pointer-events-auto group-hover:translate-y-0 delay-100  transition-all duration-1000 ease-in-out flex flex-col  pb-10 xl:px-10 px-7 space-y-8  translate-y-22">
                    <p className=" text-lg xl:text-[21px] 2xl:text-[23px] text-white md:leading-9 2xl:leading-10">{data.title}</p>
                    <Button text='LEARN MORE' buttonStyle='px-7 py-2   opacity-0 group-hover:opacity-100' />
                    {/* <button className=" px-7 py-2 text-white   transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 font-medium rounded-sm bg-sky-blue-1 w-fit">LEARN MORE</button> */}
                </div>
            </div>
        </div>

    )
}

export default BlogCard