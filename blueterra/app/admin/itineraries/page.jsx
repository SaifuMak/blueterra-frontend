'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import AXIOS_INSTANCE from "@/lib/axios";
import Pagination from "@/components/generalComponents/Pagination";
import { getPageNumber ,getTotalPagesCount} from "@/app/utils/paginationHelpers";
import Loader from "@/components/generalComponents/Loader";
import TooltipWrapper from "@/components/generalComponents/TooltipWrapper";
import { IoEyeOutline, IoEyeOffOutline, RxCross2, AiOutlineCheck } from '@/components/reactIcons'
import { toast } from "sonner";



export default function Itinerary() {

    const [Itineraries, setItineraries] = useState()

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const [requestedStatusChange, setRequestedStatusChange] = useState('draft')
    const [requestedItineraryForStatusChange, setRequestedItineraryForStatusChange] = useState(null)
    const [isStatusChangeModel, setIsStatusChangeModel] = useState(false)

    const [isDeleteItineraryModal, setIsDeleteItineraryModal] = useState(false)
    const [requestedItineraryForDeletion, setRequestedItineraryForDeletion] = useState(null)



    const [selectedItineraryStatus, setSelectedItineraryStatus] = useState('Published')


    const rowStyle = 'px-4 py-6  border-t order-gray-100/10'
    const router = useRouter()

    const handleAddItineraray = (page = 1, status = 'Published', loading = false) => {
        router.push('/admin/itineraries/create')
    }


    const getItineraries = async (page = 1, status = 'Published', loading = false) => {
        loading === true ? setIsLoading(true) : ''

        try {
            const response = await AXIOS_INSTANCE.get(`itineraries/?page=${page}&status=${status}`)
            setItineraries(response?.data?.results)
            setCurrentPage(page)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)

            const totalPages = getTotalPagesCount(response.data.count, 5)
            setTotalPages(totalPages)

        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    const toggleStatus = (status) => {
        setSelectedItineraryStatus(status)
        getItineraries(1, status, true)
    }


    const confirmItineraryStatus = async () => {
        setIsLoading(true)

        const data = {
            id: requestedItineraryForStatusChange,
            status: requestedStatusChange
        }

        try {
            const response = await AXIOS_INSTANCE.patch(`itineraries/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setIsStatusChangeModel(false)
            toast.success(requestedStatusChange === 'draft' ? " Itinerary unpublished successfully!" : "Itinerary published successfully!");
            requestedStatusChange === 'draft' ? getItineraries(currentPage, 'Published') : getItineraries(currentPage, 'Drafted')

        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleEditClick = (id) => {
        router.push(`/admin/itineraries/edit/${id}`);
    };


    const handleDeleteJournal = (id) => {
        if (isLoading) return
        setRequestedItineraryForDeletion(id)
        setIsDeleteItineraryModal(true)
    }


    const confirmDeleteItinerary = async () => {
        setIsLoading(true)

        const id = requestedItineraryForDeletion

        try {
            const response = await AXIOS_INSTANCE.delete(`itinerary/${id}/`)
            selectedItineraryStatus === 'Published' ? getItineraries(currentPage, 'Published') : getItineraries(currentPage, 'Drafted')
            toast.success(response.data.message)
            setIsDeleteItineraryModal(false)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleChangeStatus = (status, id) => {

        setRequestedItineraryForStatusChange(id)

        if (status === true) {
            //    unpublish the journal 
            setRequestedStatusChange('draft')
        }
        else {
            // publish the journal
            setRequestedStatusChange('publish')
        }
        // open the modal for changing the status 
        setIsStatusChangeModel(true)
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

                <div className=" flex-1 flex-col  ml-4   mr-8 mb-0 p-10 rounded-xl bg-[#F7FBFD] relative w-full flex   h-[97vh] z-50">
                    {isLoading && <Loader />}

                    <div className=" flex justify-between items-center">
                        <h2 className=" text-4xl font-medium text-dark-4B  ">Itinerary </h2>

                        <div className=" flex items-center space-x-4 text-dark-4B ">

                            <div onClick={() => toggleStatus('Published')} className=" flex items-center space-x-1 font-medium cursor-pointer ">
                                <div className={`${selectedItineraryStatus === 'Published' ? 'bg-[#394C5D]' : 'bg-transparent'} size-4 rounded-full  border-dark-4B/80 border`} ></div>
                                <p className="">Published</p>
                            </div>
                            <div onClick={() => toggleStatus('Drafted')} className=" flex items-center space-x-1  font-medium cursor-pointer ">
                                <div className={`${selectedItineraryStatus === 'Drafted' ? 'bg-[#394C5D]' : 'bg-transparent'} size-4 rounded-full  border-dark-4B/80 border`} ></div>
                                <p className="">Drafted</p>
                            </div>
                        </div>
                    </div>

                    {Itineraries?.length > 0 ? (<div className={`${Itineraries?.length > 0 ? 'border' : ''}  w-full overflow-hidden rounded-lg   mt-10  h-fit`}>

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
                                            <div className=" flex justify-center space-x-10">
                                                <TooltipWrapper message="Edit">
                                                    <img onClick={() => handleEditClick(item.id)} src="/Icons/edit-black.svg" alt="edit" className=" size-4  cursor-pointer " />
                                                </TooltipWrapper>

                                                <TooltipWrapper message="Delete">
                                                    <img onClick={() => handleDeleteJournal(item.id)} src="/Icons/delete.svg" alt="edit" className=" size-4 cursor-pointer " />
                                                </TooltipWrapper>

                                                <TooltipWrapper message={item.is_published ? "Unpublish" : "Publish"}>
                                                    <div onClick={() => handleChangeStatus(item.is_published, item.id)} className="cursor-pointer">
                                                        {item.is_published ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                                    </div>
                                                </TooltipWrapper>
                                            </div>
                                        </td>

                                        <td className={rowStyle}>
                                            <div onClick={handleAddItineraray} className=" flex justify-center ">
                                                <img src="/Icons/add.svg" alt="edit" className=" cursor-pointer size-5 " />
                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                    ) : (
                        <div className=" w-full mt-10 text-xl text-dark-4B  font-medium text-center">
                            <div className=" flex justify-end w-full">
                                <button onClick={handleAddItineraray} className=" bg-custom-sky-blue cursor-pointer text-white rounded-sm px-6 py-1">Add</button>
                            </div>
                            <p className=" mt-10">No results found</p>
                        </div>
                    )}

                    {Itineraries?.length > 0 && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={getItineraries}
                        currentPage={currentPage}
                        TotalPages={totalPages}
                        queryParameter={selectedItineraryStatus}
                        buttonColor='bg-[#394C5D]'
                    />)}

                </div>


                {isStatusChangeModel && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                        <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to {requestedStatusChange === 'draft' ? 'unpublish' : 'publish'} this Itinerary ?</h2>
                        <div className=" flex justify-center mt-4">
                            <button onClick={confirmItineraryStatus} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                        </div>
                        <RxCross2 onClick={() => setIsStatusChangeModel(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                    </div>
                </div>}

                {isDeleteItineraryModal && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                        <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to delete this Itinerary ?</h2>
                        <div className=" flex justify-center mt-4">
                            <button onClick={confirmDeleteItinerary} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                        </div>
                        <RxCross2 onClick={() => setIsDeleteItineraryModal(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                    </div>
                </div>}

            </div>
        </div>
    )
}