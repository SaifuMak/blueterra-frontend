'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { trimWords } from "../utils/textHelpers";
import AXIOS_INSTANCE from "@/lib/axios";
import { useEffect, useState } from "react";
import Pagination from "@/components/generalComponents/Pagination";
import { getPageNumber, getTotalPagesCount } from "../utils/paginationHelpers";
import { IoEyeOutline, IoEyeOffOutline, RxCross2, AiOutlineCheck } from '@/components/reactIcons'
import { toast } from 'sonner';
import TooltipWrapper from "@/components/generalComponents/TooltipWrapper";

export default function AdminBlogs() {



    const rowStyle = 'px-4 py-6  border-t order-gray-100/10'
    const router = useRouter()

    const [journals, setJournals] = useState([])

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)


    const handleAddJournal = () => {
        router.push('admin-journals/create')
    }

    const [selectedJournalStatus, setSelectedJournalStatus] = useState('Published')

    const [requestedStatusChange, setRequestedStatusChange] = useState('draft')
    const [requestedJournalForStatusChange, setRequestedJournalForStatusChange] = useState(null)
    const [isStatusChangeModel, setIsStatusChangeModel] = useState(false)

    const [isDeleteJournalModel, setIsDeleteJournalModel] = useState(false)
    const [requestedJournalForDeletion, setRequestedJournalForDeletion] = useState(null)


    const fetchJournals = async (page = 1, status = 'Published') => {

        try {
            const response = await AXIOS_INSTANCE.get(`journals/?page=${page}&status=${status}`)
            setJournals(response.data?.results)
            setCurrentPage(page)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)

            const totalPages = getTotalPagesCount(response.data.count, 5)
            setTotalPages(totalPages)
        }
        catch (e) {
            console.log(e);
        }
    }


    const toggleJournalCategory = (status) => {
        setSelectedJournalStatus(status)
        fetchJournals(1, status)
    }


    const handleChangeStatus = (status, id) => {
        // the status is a bolean value if true that journal is currently published 
        setRequestedJournalForStatusChange(id)
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



    const confirmJournalStatus = async () => {
        const data = {
            id: requestedJournalForStatusChange,
            status: requestedStatusChange
        }

        try {
            const response = await AXIOS_INSTANCE.patch(`journals/`, data)
            setIsStatusChangeModel(false)
            toast.success(requestedStatusChange === 'draft' ? " Blog post unpublished successfully!" : "Blog post published successfully!");
            requestedStatusChange === 'draft' ? fetchJournals(currentPage, 'Published') : fetchJournals(currentPage, 'Drafted')

            // setJournals(response.data?.results)
            // setCurrentPage(page)
            // const nextpage = getPageNumber(response.data.next)
            // const previous = getPageNumber(response.data.previous)
            // setNextPage(nextpage)
            // setPrevPage(previous)

            // const totalPages = getTotalPagesCount(response.data.count, 5)
            // setTotalPages(totalPages)
        }
        catch (e) {
            console.log(e);
        }
    }


    const confirmFeaturedStatus = async (blogId, status) => {
        toast.dismiss()

        const data = {
            id: blogId,
            featured_status: status
        }

        try {
            const response = await AXIOS_INSTANCE.patch(`journals/`, data)
            toast.success(status === true ? "Added to featured" : "Removed from featured");
            fetchJournals(currentPage, 'Published')
        }
        catch (e) {
            console.log(e);
        }

    }

    const handleEditClick = (id) => {
        router.push(`/admin-journals/edit/${id}`);
    };


    const handleDeleteJournal = (id) => {
        setRequestedJournalForDeletion(id)
        setIsDeleteJournalModel(true)
    }


    const confirmDeleteJournal = async () => {
        const id = requestedJournalForDeletion
        try {
            const response = await AXIOS_INSTANCE.delete(`journals/${id}/`)
            selectedJournalStatus === 'Published' ? fetchJournals(currentPage, 'Published') : fetchJournals(currentPage, 'Drafted')
            toast.success(response.data.message)
            setIsDeleteJournalModel(false)

        }
        catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {

        fetchJournals()

    }, [])


    return (
        <div className=" min-h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full relative  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1  flex-col  ml-4  mr-8 mb-0 p-10 rounded-xl bg-[#F7FBFD] w-full flex  min-h-[97vh] z-50">
                    <div className=" flex justify-between items-center">
                        <h2 className=" text-4xl font-medium text-dark-4B  ">Journals </h2>

                        <div className=" flex items-center space-x-4 text-dark-4B ">

                            <div onClick={() => toggleJournalCategory('Published')} className=" flex items-center space-x-1 font-medium cursor-pointer ">
                                <div className={`${selectedJournalStatus === 'Published' ? 'bg-[#394C5D]' : 'bg-transparent'} size-4 rounded-full  border-dark-4B/80 border`} ></div>
                                <p className="">Published</p>
                            </div>
                            <div onClick={() => toggleJournalCategory('Drafted')} className=" flex items-center space-x-1  font-medium cursor-pointer ">
                                <div className={`${selectedJournalStatus === 'Drafted' ? 'bg-[#394C5D]' : 'bg-transparent'} size-4 rounded-full  border-dark-4B/80 border`} ></div>
                                <p className="">Drafted</p>
                            </div>
                        </div>
                    </div>

                    <div className=" w-full overflow-hidden rounded-lg  border mt-5  h-fit">
                        <table className="w-full text-lg  rounded-3xl text-left text-gray-700">
                            <thead className="bg-[#394C5D] rounded-3xl text-white  ">
                                <tr>
                                    <th className="px-4 py-5 font-normal ">Title</th>
                                    <th className="px-4 py-5 font-normal ">Category</th>
                                    <th className="px-4 py-5 font-normal">Published on</th>
                                    <th className="px-4 py-5 font-normal">Featured</th>

                                    <th className="px-4 py-5 text-center font-normal">Actions</th>
                                    <th onClick={handleAddJournal} className="px-4 py-5 text-center font-normal"><button className=" bg-custom-sky-blue cursor-pointer text-white rounded-sm px-6 py-1">Add</button></th>
                                </tr>
                            </thead>

                            <tbody className=" bg-white  border">
                                {journals?.map((item, index) => (
                                    <tr key={index} className=" rounded-3xl">

                                        <td className={rowStyle}>{trimWords(item.title, 8)}</td>
                                        <td className={rowStyle}>{item.category_name}</td>
                                        <td className={rowStyle}>{item.created_at}</td>
                                        <td className={rowStyle}>

                                            <TooltipWrapper message={item.is_featured ? "Remove form Featured" : "Add to Featured"}>
                                                <div onClick={()=>confirmFeaturedStatus(item.id, !item.is_featured )} className=" border size-5 2xl:size-5 cursor-pointer transition-all duration-500 ease-in-out  border-sky-blue-1 ml-4 flex-center inline-flex rounded-full  ">
                                                    {item.is_featured && <AiOutlineCheck className=" text-sm 2xl:text-base text-sky-blue-dark " />}
                                                </div>
                                            </TooltipWrapper>

                                        </td>

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
                                            <div className=" flex justify-center ">
                                                {item.is_published ? "published" : "drafted"}
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                    <Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={fetchJournals}
                        currentPage={currentPage}
                        TotalPages={totalPages}
                        queryParameter={selectedJournalStatus}
                    />
                </div>


                {isStatusChangeModel && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                        <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to {requestedStatusChange === 'draft' ? 'unpublish' : 'publish'} this journal ?</h2>
                        <div className=" flex justify-center mt-4">
                            <button onClick={confirmJournalStatus} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                        </div>
                        <RxCross2 onClick={() => setIsStatusChangeModel(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                    </div>
                </div>}


                {isDeleteJournalModel && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                        <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to delete this journal ?</h2>
                        <div className=" flex justify-center mt-4">
                            <button onClick={confirmDeleteJournal} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                        </div>
                        <RxCross2 onClick={() => setIsDeleteJournalModel(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                    </div>
                </div>}

            </div>
        </div>
    )
}