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


export default function Collections() {

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fileInputRef = useRef(null)
    const [selectedIconImage, setSelectedIconImage] = useState(null);


    const [collections, setCollections] = useState([])
    const rowStyle = 'px-4 py-6  border-t order-gray-100/10'

    const [selectedCollection, setSelectedCollection] = useState(null)
    const [isEditPopup, setIsEditPopup] = useState(false)

    const [selectedBannerImage, setSelectedBannerImage] = useState(null)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        banner_image: null,
        icon: null,
    });

    const handleBannerFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedBannerImage(e.target.files[0]); // pass the new file to parent
            setFormData((prev) => ({
                ...prev,
                banner_image: e.target.files[0],
            }));
        }
    };


    const handleIconFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedIconImage(e.target.files[0]);
            setFormData((prev) => ({
                ...prev,
                icon: e.target.files[0],
            }));
        }
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleClearStates = () => {
        setFormData({
            title: "",
            description: "",
            banner_image: null,
            icon: null,
        })
        setSelectedBannerImage(null)
        setSelectedCollection(null)
        setIsEditPopup(false)
        setSelectedIconImage(null)
    }

    const editModalRef = useClickOutside(() => handleClearStates())


    const handleEditClick = (collection) => {
        if (isSubmitting) return

        setSelectedCollection(collection)
        setFormData({
            title: collection.title,
            description: collection.description,
            banner_image: collection.banner_image,
            icon: collection.icon,
        });
        setIsEditPopup(true)
    }


    const fetchCollections = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('collections/')
            console.log(response.data);
            setCollections(response.data)

        }
        catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setIsSubmitting(true)

        const formDataCoverted = new FormData();
        formDataCoverted.append("title", formData.title);
        formDataCoverted.append("description", formData.description);
        if (formData.banner_image instanceof File) {
            formDataCoverted.append("banner_image", formData.banner_image);
        }
        if (formData.icon instanceof File) {
            formDataCoverted.append("icon", formData.icon);
        }


        try {
            const response = await AXIOS_INSTANCE.patch(`collections/${selectedCollection.id}/`, formDataCoverted)
            handleClearStates()
            fetchCollections()
            toast.success('Collection has been updated')
        }
        catch (error) {
            console.log(error);
            toast.error('Something error happened, please try again')

        }
        finally {
            setIsSubmitting(false)
        }
    }



    useEffect(() => {
        fetchCollections()
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
                        <h2 className=" text-4xl font-medium text-dark-4B  ">Collections </h2>
                    </div>

                    {collections?.length > 0 ? (<div className={`${collections?.length > 0 ? 'border' : ''}  w-full overflow-hidden rounded-lg   mt-10  h-fit`}>

                        <table className="w-full text-lg  rounded-3xl text-left text-gray-700">
                            <thead className="bg-[#394C5D] rounded-3xl text-white  ">
                                <tr>
                                    <th className="px-4 py-5 font-normal ">Title</th>
                                    <th className="px-4 py-5 font-normal ">Description</th>
                                    <th className="px-4 py-5 font-normal text-nowrap">Banner image</th>
                                    <th className="px-4 py-5 text-center font-normal text-nowrap">Icon image</th>
                                    <th className="px-4 py-5 text-center font-normal text-nowrap"><button className="  cursor-pointer text-white rounded-sm px-6 py-1">Actions</button></th>
                                </tr>
                            </thead>


                            <tbody className=" bg-white ">
                                {collections?.map((item, index) => (
                                    <tr key={index} className=" rounded-3xl">

                                        <td className={rowStyle}>{item.title}</td>
                                        <td className={rowStyle}>{trimWords(item.description, 15)}</td>

                                        <td className={rowStyle}>
                                            <div className=" flex justify-center ">
                                                <a href={item.banner_image_public_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="">
                                                    <img src={item.banner_image_public_url} alt="icon" className=" cursor-pointer border w-16 h-10 rounded-sm shrink-0 " />
                                                </a>
                                            </div>
                                        </td>

                                        <td className={rowStyle}>
                                            <div className=" flex justify-center ">
                                                <a href={item.icon_public_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer" className="">
                                                    <img src={item.icon_public_url} alt="icon" className=" cursor-pointer rounded-sm border bg-[#394C5D] size-10 p-0.5 shrink-0 " />
                                                </a>
                                            </div>
                                        </td>

                                        <td className={rowStyle}>
                                            <div className=" flex justify-center space-x-10">
                                                <TooltipWrapper message="Edit">
                                                    <img onClick={() => handleEditClick(item)} src="/Icons/edit-black.svg" alt="edit" className=" size-4  cursor-pointer " />
                                                </TooltipWrapper>
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
                                <button className=" bg-custom-sky-blue cursor-pointer text-white rounded-sm px-6 py-1">Add</button>
                            </div>
                            <p className=" mt-10">No results found</p>
                        </div>
                    )}
                </div>


                {selectedCollection && isEditPopup && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <form onSubmit={handleSubmit} >

                        <div ref={editModalRef} className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-10 min-w-4xl ">
                            <div className=" flex  flex-col justify-center mt-4 space-y-8">

                                <div className=" w-full">
                                    <label htmlFor="text" className=" font-medium ">Title</label>
                                    <input type="text" name='title' onChange={handlechange} value={formData?.title} className="border mt-2 rounded-sm p-2 w-full outline-none " required />
                                </div>

                                <div className=" w-full">
                                    <label htmlFor="text" className=" font-medium">Description</label>
                                    <textarea name="description" onChange={handlechange} value={formData?.description} id="description" className="border rounded-sm  mt-2  p-2 w-full outline-none" required></textarea>
                                </div>

                                <div className=" w-full flex  space-x-6 items-center ">
                                    <div className=" space-x-6 flex flex-col">
                                        <label htmlFor="text" className=" font-medium">Banner image</label>

                                        <input
                                            type="file"
                                            id="bannerUpload"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleBannerFileChange}
                                        />

                                        <label
                                            htmlFor="bannerUpload"
                                            className="px-2 py-0 mt-1  border  w-fit bg-white cursor-pointer"
                                        >
                                            Browse
                                        </label>
                                    </div>

                                    {selectedBannerImage ? (
                                        <div className=" text-xs text-sky-blue-dark">{selectedBannerImage?.name}</div>
                                    ) : (
                                        <img src={selectedCollection?.banner_image_public_url} alt="banner image" className=" w-32 h-20 rounded-sm object-cover" />
                                    )}
                                </div>


                                <div className="w-full flex space-x-6 items-center">
                                    <div className="space-x-6 flex flex-col">
                                        <label htmlFor="iconUpload" className="font-medium">Icon image</label>

                                        <input
                                            type="file"
                                            id="iconUpload"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleIconFileChange}
                                        />

                                        <label
                                            htmlFor="iconUpload"
                                            className="px-2 py-0 mt-1 border w-fit bg-white cursor-pointer"
                                        >
                                            Browse
                                        </label>
                                    </div>

                                    {selectedIconImage ? (
                                        <div className="text-xs text-sky-blue-dark">{selectedIconImage?.name}</div>
                                    ) : (
                                        <img
                                            src={selectedCollection?.icon_public_url}
                                            alt="icon image"
                                            className="w-12 h-12 ml-10 bg-dark-4B rounded-sm object-cover border"
                                        />
                                    )}
                                </div>

                            </div>
                            <button type="submit" disabled={isSubmitting} className=" mt-10 cursor-pointer w-fit mx-auto rounded-sm font-medium  border bg- px-10 py-1.5 text-sm bg-sky-blue-dark text-white ">{isSubmitting ? <LoaderIcon className="text-white text-2xl animate-spin" /> : 'save'}</button>

                            <RxCross2 onClick={() => setIsEditPopup(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                        </div>
                    </form>
                </div>}

            </div>
        </div>
    )
}