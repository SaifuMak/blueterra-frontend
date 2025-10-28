import React from 'react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { rubik, playfair } from '@/app/fonts'
import JournalsCardOverlay from '../HomePage/JournalsCardOverlay'
import Button from '../generalComponents/Button'
import BlogCard from './BlogCard'
import AXIOS_INSTANCE from '@/lib/axios'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import ResponsiveClipPath from '../generalComponents/ResponsiveClipPath'
import { useRouter } from 'next/navigation'


function JournalSection() {


    const [journals, setJournals] = useState([])

    const blogTitleRef = useGsapFadeIn()
    const blogButtonRef = useGsapFadeIn()
    const blogContentRef = useGsapFadeIn()

    const [isLoading, setIsLoading] = useState(true)


    const router = useRouter()

    const fetchJournals = async (category = 'View All', page = 1) => {
        try {
            const response = await AXIOS_INSTANCE.get(`get-journals/?page=${page}&category=${category}`)
            setJournals(response.data.results)

        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJournals()
    }, [])


    // if (journals?.length === 0) {
    //     return null
    // }

    return (
        <div className=" relative w-full flex  flex-col  items-center lg:h-[120vh] py-10 xl:py-16 2xl:py-20 space-y-12 xl:space-y-20   ">
            <div className=" w-[30%]   absolute left-0 top-0    ">

            </div>
            <ResponsiveClipPath
                outerClass='md:w-[30%] w-[50%]   absolute left-0 top-0 '
                ImagePath='/images/home/patterns/journal-top-left.png'
                width={600}
            />


            <div ref={blogTitleRef}  className="   w-full flex justify-center max-sm:mt-5 text-dark-4B">
                <h2 className={`${playfair.className} heading-text`}>BlueTerra Journal</h2>
            </div>


            <div className="  vertically-animated-element lg:flex lg:h-[100%]  md:space-x-7  max-lg:space-y-10 2xl:space-x-10 w-11/12 will-change-transform">

                {journals?.length > 0 && <BlogCard
                    outerClass='lg:w-1/3  w-full group overflow-hidden max-lg:h-[400px] cursor-pointer rounded-xl  relative '
                    data={journals[0]}
                />}

                <div className=" flex flex-col h-full lg:w-1/3 w-full space-y-10 md:space-y-7  2xl:space-y-10 ">

                    {journals?.length > 1 && <BlogCard
                        outerClass='w-full group overflow-hidden cursor-pointer lg:h-[50%] max-lg:h-[400px]  rounded-xl relative '
                        data={journals[1]}
                    />}
                    {journals?.length > 2 && <BlogCard
                        outerClass=' w-full group overflow-hidden cursor-pointer lg:h-[50%] max-lg:h-[400px]  rounded-xl relative '
                        data={journals[2]}
                    />}

                </div>

                {journals?.length > 3 && <BlogCard
                    outerClass=' w-full   lg:w-1/3 h-full  max-lg:h-[400px]  group overflow-hidden cursor-pointer  rounded-xl bg-red-50 relative '
                    data={journals[3]}
                />}
            </div>



            <div  className="">
                <Button text='VIEW ALL' buttonStyle='px-16 py-2 ' isHoverWhiteApplied={false} onClickFunction={() => router.push('/journal')} />
            </div>

        </div >
    )
}

export default JournalSection