'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import AXIOS_INSTANCE from "@/lib/axios";


export default function AdminItinerary() {



    const ItineraryData = [
        { name: '11 Days Iceland Nature & Northern Lights', days: '03', collection: 'Lorem Ipsum', action: ' ', add: ' ' },
        { name: '10 Days Iceland Nature & Northern Lights', days: '12', collection: 'Lorem Ipsum', action: ' ', add: ' ' },
        { name: '11 Days Iceland Nature & Northern Lights', days: '03', collection: 'Lorem Ipsum', action: ' ', add: ' ' },
        { name: '12 Days Iceland Nature & Northern Lights', days: '07', collection: 'Lorem Ipsum', action: ' ', add: ' ' },
        { name: '5 Days Iceland Nature & Northern Lights', days: '03', collection: 'Lorem Ipsum', action: ' ', add: ' ' },
    ]

    const [Itineraries, setItineraries] = useState()

    const rowStyle = 'px-4 py-6  border-t order-gray-100/10'
    const router = useRouter()

    const handleAddItineraray = () => {
        router.push('/admin-create-itinerary')
    }

    const getItineraries = async () => {

        try {
            const response = await AXIOS_INSTANCE.get(`itineraries/`)
            setItineraries(response?.data?.results)

        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getItineraries()
    }, [])


    return (
        <div className=" h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1  ml-4  mr-8 mb-0 p-10 rounded-xl bg-[#F7FBFD] w-full flex justify-center  h-[97vh] z-50">

                    <div className=" w-full overflow-hidden rounded-lg  border  h-fit">
                        <table className="w-full text-lg  rounded-3xl text-left text-gray-700">
                            <thead className="bg-[#394C5D] rounded-3xl text-white  ">
                                <tr>
                                    <th className="px-4 py-5 font-normal ">Itinerary name</th>
                                    <th className="px-4 py-5 font-normal ">Days</th>
                                    <th className="px-4 py-5 font-normal">Collections name</th>
                                    <th className="px-4 py-5 text-center font-normal">Actions</th>
                                    <th onClick={handleAddItineraray} className="px-4 py-5 text-center font-normal"><button className=" bg-custom-sky-blue cursor-pointer text-white rounded-sm px-6 py-1">Add</button></th>
                                </tr>
                            </thead>
                            <tbody className=" bg-white ">
                                {Itineraries?.map((item, index) => (
                                    <tr key={index} className=" rounded-3xl">

                                        <td className={rowStyle}>{item.title}</td>
                                        <td className={rowStyle}>{item.days.length}</td>
                                        <td className={rowStyle}>{item.collection}</td>

                                       
                                        <td className={rowStyle}>
                                            <div className=" flex  justify-between">
                                                <img src="/Icons/edit-black.svg" alt="edit" className=" size-4  cursor-pointer " />
                                                <img src="/Icons/delete.svg" alt="edit" className=" size-4 cursor-pointer " />
                                                <img src="/Icons/hide.svg" alt="edit" className=" size-4 cursor-pointer " />
                                            </div>
                                        </td>
                                        <td className={rowStyle}>
                                            <div className=" flex justify-center ">
                                                <img src="/Icons/add.svg" alt="edit" className=" cursor-pointer size-5 " />
                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}