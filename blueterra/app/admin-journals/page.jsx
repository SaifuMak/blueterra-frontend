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
import { IoEyeOutline, IoEyeOffOutline } from '@/components/reactIcons'

export default function AdminBlogs() {



    const rowStyle = 'px-4 py-6  border-t order-gray-100/10'
    const router = useRouter()

    const [journals, setJournals] = useState([])

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)


    const handleAddJournal = () => {
        router.push('/admin-create-journal')
    }
    const [selectedJournalStatus, setSelectedJournalStatus] = useState('Published')



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


    useEffect(() => {


        fetchJournals()

    }, [])


    return (
        <div className=" min-h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

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
                                            <div className=" flex justify-center space-x-10">
                                                <img src="/Icons/edit-black.svg" alt="edit" className=" size-4  cursor-pointer " />
                                                <div className="">
                                                    {item.is_published ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                                </div>
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

            </div>
        </div>
    )
}