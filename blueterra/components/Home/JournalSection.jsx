import React from 'react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { rubik, playfair } from '@/app/fonts'
import JournalsCardOverlay from '../HomePage/JournalsCardOverlay'
import Button from '../generalComponents/Button'
import BlogCard from './BlogCard'
import AXIOS_INSTANCE from '@/lib/axios'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'

function JournalSection() {

    const [journals, setJournals] = useState([])

    const blogTitleRef = useGsapFadeIn(0,{})
    const blogButtonRef = useGsapFadeIn(0,{})


    const fetchJournals = async (category = 'View All', page = 1) => {
        try {
            const response = await AXIOS_INSTANCE.get(`get-journals/?page=${page}&category=${category}`)
            setJournals(response.data.results)

        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchJournals()
    }, [])


    // if (journals?.length === 0) {
    //     return null
    // }

    return (
        <div className=" relative w-full flex  flex-col  items-center h-[120vh]   py-10 xl:py-16 2xl:py-20 space-y-12 xl:space-y-20   max-lg:hidden ">
            <div className=" w-[30%]   absolute left-0 top-0    ">
                <Image
                    src='/images/home/journal-left-path.png'
                    alt="pattern"
                    width={300}
                    height={400}
                    className=" object-cover"
                />
            </div>

            <div className=" w-fit absolute  right-0  bottom-0">
                <Image
                    src='/images/home/journal-right-path.png'
                    alt="pattern"
                    width={500}
                    height={500}
                    className=" object-cover"
                />
            </div>

            <div className=" w-full flex justify-center text-dark-4B">
                <h3 ref={blogTitleRef} className={`${playfair.className} text-[50px]`}>BlueTerra Journal</h3>
            </div>

            <div className=" flex h-[100%] space-x-7  2xl:space-x-10 w-11/12">

                {journals?.length > 0 && <BlogCard
                    outerClass='w-1/3 group overflow-hidden h-full cursor-pointer rounded-xl  relative '
                    data={journals[0]}
                />}
              
                <div className=" flex flex-col h-full w-1/3 space-y-7  2xl:space-y-10 ">

                    {journals?.length > 1 && <BlogCard
                        outerClass='w-full group overflow-hidden cursor-pointer h-[50%]  rounded-xl relative '
                        data={journals[1]}
                    />}
                    {journals?.length > 2 && <BlogCard
                        outerClass=' w-full group overflow-hidden cursor-pointer h-[50%]  rounded-xl relative '
                        data={journals[2]}
                    />}

                </div>

                {journals?.length > 3 && <BlogCard
                    outerClass='  w-1/3 h-full group overflow-hidden cursor-pointer  rounded-xl bg-red-50 relative animate-journals'
                    data={journals[3]}
                />}


            </div>

            <div ref={blogButtonRef} className="">
                <Button text='VIEW ALL' buttonStyle='px-16 py-2  ' isHoverWhiteApplied={false} />
            </div>

        </div>
    )
}

export default JournalSection