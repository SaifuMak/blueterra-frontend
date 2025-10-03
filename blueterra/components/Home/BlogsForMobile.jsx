import { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/lib/axios";
import { playfair, rubik } from "@/app/fonts"
import CollectionsList from "./Collections";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import LoaderIcon from "../generalComponents/LoaderIcon";
import { useRouter } from "next/navigation";
import BlogsList from "./BlogsList";
import Button from "../generalComponents/Button";



function BlogsForMobile() {

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [journals, setJournals] = useState([])

    const collectionContainer = useGsapFadeIn()
    const titleRef = useGsapFadeIn()
    const descriptionRef = useGsapFadeIn()

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


    // const navigateToCollections = () => {
    //     router.push('/journals')
    // }


    const handleGetBlog = (slug) => {
        router.push(`/blog/${slug}`);
    };


    useEffect(() => {
        fetchJournals()
    }, [])


    return (
        <div className="2xl:pb-20 pb-12 mt-12 ">
            <div className="w-full h-full  px-4 md:px-10 bg-white">
                <div className=" bg-light-yellow flex flex-col items-center rounded-4xl space-y-6 2xl:space-y-10 xl:space-y-6  px-4 xl:py-16 py-10  2xl:px-10 2xl:py-28 ">
                    <h3 ref={titleRef} className={`${playfair.className}  text-dark-4B heading-text`} >BlueTerra Journal</h3>

                    <div className=" 2xl:w-11/12 w-full   max-2xl:px-5  rounded-2xl overflow-hidden  mt-4 ">
                        {journals?.length > 0 && <BlogsList Data={journals} setCurrent={setCurrentCollection} setCount={setCollectionCount} onclickEvent={handleGetBlog} />}
                    </div>

                    <div className=" flex-center w-full h-full">
                        {journals?.map((_, index) => (
                            <span key={index} className={` h-2 rounded-full translate-all duration-500 ease-in-out  mx-1 ${currentCollection === index + 1 ? '  bg-sky-blue-1 w-10' : 'bg-sky-blue-1/30 w-2'}`}  ></span>
                        ))}
                    </div>
                </div >
                <div className=" flex-center mt-10">
                    <Button text='VIEW ALL' buttonStyle='px-16 py-2 ' isHoverWhiteApplied={false} onClickFunction={() => router.push('/journal')} />
                </div>

            </div >

        </div >
    )
}

export default BlogsForMobile