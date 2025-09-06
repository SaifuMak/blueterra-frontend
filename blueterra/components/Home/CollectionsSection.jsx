import { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/lib/axios";
import { playfair, rubik } from "@/app/fonts"
import CollectionsList from "./Collections";

function CollectionsSection() {

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)
    const [collectionsData, setCollectionsData] = useState([])

    const fetchCollections = async () => {

        try {
            const response = await AXIOS_INSTANCE.get('get-collections/')
            setCollectionsData(response?.data)
        }
        catch (error) {

        }
        finally {
        }
    }

    useEffect(() => {
        fetchCollections()
    }, [])

    return (
        <div className="pb-10 ">
            <div className="w-full h-full px-4 md:px-10 bg-white">
                <div className=" bg-light-yellow flex flex-col items-center rounded-4xl space-y-6 xl:space-y-10  px-4 xl:py-24 py-10  2xl:px-10 2xl:py-32 ">
                    <h3 className={`${playfair.className} vertically-animated-element text-dark-4B heading-text`} >The BlueTerra Collecton</h3>
                    <p className={`xl:text-xl lg:text-lg font-light vertically-animated-element ${rubik.className} text-dark-28 w-full md:w-8/12  xl:w-6/12 text-center`}>Explore our handpicked collection of journeys, each created with intention and shaped to deliver timeless experiences you can trust.</p>

                    <div className=" 2xl:w-11/12 w-full   max-2xl:px-5 vertically-animated-element   mt-4 ">
                        {collectionsData?.length > 0 && <CollectionsList Data={collectionsData} setCurrent={setCurrentCollection} setCount={setCollectionCount} />}
                    </div>

                    <div className=" flex-center w-full h-full">
                        {collectionsData?.map((_, index) => (
                            <span key={index} className={` h-2 rounded-full translate-all duration-500 ease-in-out  mx-1 ${currentCollection === index + 1 ? '  bg-sky-blue-1 w-10' : 'bg-sky-blue-1/30 w-2'}`}  ></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionsSection