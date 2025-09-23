'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import AXIOS_INSTANCE from "@/lib/axios";
import Pagination from "@/components/generalComponents/Pagination";
import { getPageNumber, getTotalPagesCount } from "@/app/utils/paginationHelpers";
import Loader from "@/components/generalComponents/Loader";
import TooltipWrapper from "@/components/generalComponents/TooltipWrapper";
import { IoEyeOutline, IoEyeOffOutline, RxCross2, AiOutlineCheck } from '@/components/reactIcons'
import { toast } from "sonner";
import { trimWords } from "@/app/utils/textHelpers";
import { useRef } from "react";
import LoaderIcon from "@/components/generalComponents/LoaderIcon";
import useClickOutside from "@/app/hooks/useClickOutside";



export default function Cruise() {

    const rowStyle = 'px-4 py-6  border-t border-gray-100/10'


    const [deals, setDeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [selectedDealForEditing, setSelectedDealForEditing] = useState(null)
    const [selectedItemForStatusToggle, setSelectedItemForStatusToggle] = useState(null)
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null)


    const [isCreateDealsOpened, setIsCreateDealsOpened] = useState(false)
    const [isEditDealOpened, setIsEditDealOpened] = useState(false)
    const [isToggleStatusOpened, setIsToggleStatusOpened] = useState(false)
    const [isDeleteDealOpened, setIsDeleteDealOpened] = useState(false)



    const [selectedBannerImage, setSelectedBannerImage] = useState(null)

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        banner_image: null,
        image_url: null
    });

    const clearFields = () => {
        setFormData({
            title: "",
            description: "",
            banner_image: null,
            image_url: null
        });
        setSelectedBannerImage(null)
        setSelectedDealForEditing(null)
    }

    const handleEditClick = (id) => {
        fetchDeal(id)
        setSelectedDealForEditing(id)

    }

    const handleDeleteJournal = (item) => {
        setSelectedItemForDelete(item)
        setIsDeleteDealOpened(true)

    }

    const handleCloseEditModal = () => {
        setIsEditDealOpened(false)
        clearFields()
    }

    const handleToggleStatus = (item) => {
        setSelectedItemForStatusToggle(item)
        setIsToggleStatusOpened(true)
    }

    const handleCloseTogglePopup = () => {
        setIsToggleStatusOpened(false)
        setSelectedItemForStatusToggle(null)
    }

    const handleCloseDeletePopup = () => {
       setSelectedItemForDelete(null)
        setIsDeleteDealOpened(false)
    }


    

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleBannerFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedBannerImage(e.target.files[0]); // pass the new file to parent
            setFormData((prev) => ({
                ...prev,
                banner_image: e.target.files[0],
            }));
        }
    };

    const fetchDeal = async (id) => {
        setIsLoading(true)

        try {
            const response = await AXIOS_INSTANCE.get(`cruise-deal-details/${id}`)
            console.log(response.data);
            // setSelectedDealForEditing(response?.data)
            setFormData({
                title: response?.data?.title || '',
                description: response?.data?.description || '',
                image_url: response?.data?.image_public_url || null
            });
            setIsEditDealOpened(true)

        }
        catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }


    const fetchDeals = async (page = 1,) => {


        try {

            const response = await AXIOS_INSTANCE.get(`cruise-deals/?page=${page}`)
            setDeals(response.data?.results)

            setCurrentPage(page)

            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)

            const totalPages = getTotalPagesCount(response.data.count, 5)

            setTotalPages(totalPages)

        }
        catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }


    const confirmCreateDeal = async (e) => {
        toast.dismiss()

        e.preventDefault()
        if (!formData.banner_image) {
            toast.error('please upload a image')
            return
        }
        setIsSubmitting(true)

        const newFormData = new FormData();
        newFormData.append("title", formData.title);
        newFormData.append("description", formData.description);
        newFormData.append("image", formData.banner_image);

        try {
            const response = await AXIOS_INSTANCE.post(`cruise-deals/`, newFormData)
            fetchDeals()
            clearFields()
            setIsCreateDealsOpened(false)

        }
        catch (err) {
            console.log(err)

        }
        finally {
            setIsSubmitting(false)
        }
    }


    const confirmEditDeal = async (e) => {

        e.preventDefault();
        setIsSubmitting(true)

        const newFormData = new FormData();
        newFormData.append("title", formData.title);
        newFormData.append("description", formData.description);
        if (formData.banner_image) {
            newFormData.append("image", formData.banner_image);
        }

        try {
            const response = await AXIOS_INSTANCE.patch(`cruise-deal/${selectedDealForEditing}/`, newFormData)
            fetchDeals()
            handleCloseEditModal()

        }
        catch (err) {
            console.log(err)

        }
        finally {
            setIsSubmitting(false)
        }
    }

    const confirmToggleStatus = async (e) => {

        e.preventDefault()

        setIsSubmitting(true)

        try {
            const response = await AXIOS_INSTANCE.patch(`cruise-deal-toggle-publish-status/${selectedItemForStatusToggle.id}/`)
            fetchDeals()
            handleCloseTogglePopup()
            toast.success(response?.data?.message)

        }
        catch (err) {
            console.log(err)

        }
        finally {
            setIsSubmitting(false)
        }
    }


     const confirmDeleteDeal = async (e) => {

        e.preventDefault()
        

        setIsSubmitting(true)

        try {
            const response = await AXIOS_INSTANCE.delete(`cruise-deal/${selectedItemForDelete.id}/`)
            fetchDeals()
            handleCloseDeletePopup()
            toast.success(response?.data?.message)

        }
        catch (err) {
            console.log(err)

        }
        finally {
            setIsSubmitting(false)
        }
    }


    useEffect(() => {
        fetchDeals()
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
                        <h2 className=" text-4xl font-medium text-dark-4B  ">Cruise Deals </h2>
                    </div>

                    {deals?.length > 0 ? (<div className={`${deals?.length > 0 ? 'border' : ''}  w-full overflow-hidden rounded-lg   mt-10  h-fit`}>
                        <div className="max-h-[600px] overflow-y-auto">
                            <table className="w-full text-lg  rounded-3xl text-left text-gray-700">
                                <thead className="bg-[#394C5D] sticky top-0 rounded-3xl text-white  ">
                                    <tr>
                                        <th className="px-4 py-5 font-normal ">Title</th>
                                        <th className="px-4 py-5 font-normal ">Description</th>
                                        <th className="px-4 py-5 font-normal text-nowrap">Banner image</th>
                                        <th className="px-4 py-5 text-center font-normal text-nowrap"><button className="  cursor-pointer text-white rounded-sm px-6 py-1">Actions</button></th>
                                        <th onClick={() => setIsCreateDealsOpened(true)} className="px-4 py-5 text-center font-normal"><button className=" bg-custom-sky-blue cursor-pointer text-white rounded-sm px-6 py-1">Add</button></th>


                                    </tr>
                                </thead>


                                <tbody className="  bg-white  ">
                                    {deals?.map((item, index) => (
                                        <tr key={index} className=" rounded-3xl">

                                            <td className={rowStyle}>{item.title}</td>
                                            <td className={rowStyle}>{trimWords(item.description, 15)}</td>

                                            <td className={rowStyle}>
                                                <div className=" flex  ">
                                                    <a href={item.image_public_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="">
                                                        <img src={item.image_public_url} alt="icon" className=" cursor-pointer border w-16 h-10 rounded-sm shrink-0 " />
                                                    </a>
                                                </div>
                                            </td>


                                            <td className={rowStyle}>
                                                <div className=" flex justify-center space-x-10">
                                                    <TooltipWrapper message="Edit">
                                                        <img onClick={() => handleEditClick(item.id)} src="/Icons/edit-black.svg" alt="edit" className=" size-4  cursor-pointer " />
                                                    </TooltipWrapper>

                                                    <TooltipWrapper message="Delete">
                                                        <img onClick={() => handleDeleteJournal(item)} src="/Icons/delete.svg" alt="edit" className=" size-4 cursor-pointer " />
                                                    </TooltipWrapper>

                                                    <TooltipWrapper message={item.is_published ? "Unpublish" : "Publish"}>
                                                        <div onClick={() => handleToggleStatus(item)} className="cursor-pointer">
                                                            {item.is_published ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                                        </div>
                                                    </TooltipWrapper>
                                                </div>
                                            </td>

                                            <td className={rowStyle}>
                                                {/* <div onClick={() => setIsCreateDealsOpened(true)} className=" flex justify-center ">
                                                    <img src="/Icons/add.svg" alt="edit" className=" cursor-pointer text-dark-28 size-5 " />
                                                </div> */}

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>

                    </div>
                    ) : (
                        <div className=" w-full mt-10 text-xl text-dark-4B  font-medium text-center">
                            <div className=" flex justify-end w-full">
                                <button onClick={() => setIsCreateDealsOpened(true)} className=" bg-custom-sky-blue cursor-pointer text-white rounded-sm px-6 py-1">Add</button>
                            </div>
                            <p className=" mt-10">No deals found</p>
                        </div>
                    )}

                    {deals?.length > 0 && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={fetchDeals}
                        currentPage={currentPage}
                        TotalPages={totalPages}
                        buttonColor='bg-[#394C5D]'
                    />)}

                </div>
            </div>

            {(isCreateDealsOpened || isEditDealOpened) && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                <form onSubmit={isCreateDealsOpened ? confirmCreateDeal : confirmEditDeal} >

                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-10 min-w-4xl ">
                        <div className=" flex  flex-col justify-center mt-4 space-y-8">

                            <div className=" w-full">
                                <label htmlFor="text" className=" font-medium ">Title</label>
                                <input type="text" name='title' onChange={handlechange} value={formData?.title} className="border mt-2 rounded-sm p-2 w-full outline-none " required />
                            </div>

                            <div className=" w-full">
                                <label htmlFor="text" className=" font-medium">Description</label>
                                <textarea name="description" onChange={handlechange} value={formData?.description} id="description" rows={5} className="border rounded-sm  mt-2  p-2 w-full outline-none" required></textarea>
                            </div>

                            <div className=" w-full flex  space-x-6 items-center ">
                                <div className=" space-x-6 flex flex-col">
                                    <label htmlFor="text" className=" font-medium">Banner/Card Image</label>

                                    <input
                                        type="file"
                                        id="bannerUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleBannerFileChange}
                                    />

                                    <label
                                        htmlFor="bannerUpload"
                                        className="px-2 py-0 mt-1  border  w-fit bg-stone-100 cursor-pointer"
                                    >
                                        Browse
                                    </label>
                                </div>

                                {selectedBannerImage && (
                                    <div className=" text-xs text-sky-blue-dark">{selectedBannerImage?.name}</div>
                                )}
                            </div>

                            {formData.image_url && !formData.banner_image && <div className=" space-y-2">
                                <p className="">Uploaded Image</p>

                                <img src={formData?.image_url} alt={formData?.title} className=" w-44 h-24 rounded-sm object-contain" />

                            </div>}

                        </div>
                        <button type="submit" disabled={isSubmitting} className=" mt-10 cursor-pointer w-fit mx-auto rounded-sm font-medium  border bg- px-10 py-1.5  bg-admin-button text-white ">{isSubmitting ? <LoaderIcon className="text-white text-xl animate-spin" /> : 'Save'}</button>

                        {isCreateDealsOpened && <RxCross2 onClick={() => setIsCreateDealsOpened(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />}
                        {isEditDealOpened && <RxCross2 onClick={handleCloseEditModal} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />}

                    </div>
                </form>
            </div>}

            {isToggleStatusOpened && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                    <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to {selectedItemForStatusToggle?.is_published ? 'unpublish' : 'publish'} this deal ?</h2>
                    <div className=" flex justify-center mt-4">
                        <button onClick={confirmToggleStatus} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                    </div>
                    <RxCross2 onClick={handleCloseTogglePopup} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                </div>
            </div>}

            {isDeleteDealOpened && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                    <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to delete this deal ?</h2>
                    <div className=" flex justify-center mt-4">
                        <button onClick={confirmDeleteDeal} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                    </div>
                    <RxCross2 onClick={handleCloseDeletePopup} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                </div>
            </div>}
        </div>
    )
}