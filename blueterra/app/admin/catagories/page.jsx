'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useEffect, useRef } from "react";
import Dropdown from "@/components/admin/Itinerary/DropDown";
import AXIOS_INSTANCE from "@/lib/axios";
import { toast } from "sonner";
import TooltipWrapper from "@/components/generalComponents/TooltipWrapper";
import { RxCross2 } from '@/components/reactIcons'
import BasicDropDown from "@/components/admin/Itinerary/BasicDropDown";



export default function Categories() {

     const [loading, setLoading] = useState(true); // loading state

    const [categoryTitle, setCategoryTitle] = useState('')
    const [categoryTitleForEditing, setCategoryTitleForEditing] = useState('')

    const [categoryData, setCategoryData] = useState([])

    const [collection, setCollection] = useState("");
    const [collectionForEditing, setCollectionForEditing] = useState("")

    const [collectionOptions, setCollectionOptions] = useState([])
    const [isCollectionDropDownOpen, setIsCollectionDropDownOpen] = useState(false)
    const [isCollectionDropDownOpenForEditing, setIsCollectionDropDownOpenForEditing] = useState(false)

    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [itemToBeDeleted, setItemToBeDeleted] = useState(null)

    const [isEditModal, setIsEditModal] = useState(false)
    const [itemToBeEdited, setItemToBeEdited] = useState(null)

    const rowStyle = 'px-4 py-6 border-t border-gray-100/10'
    const tableRef = useRef()


    const handleDeleteCategory = (id) => {
        setIsDeleteModal(true)
        setItemToBeDeleted(id)
    }

    const handleEditCategory = (item) => {
        setIsEditModal(true)
        setItemToBeEdited(item.id)
        setCollectionForEditing(item?.collection?.title)
        setCategoryTitleForEditing(item?.title)
    }

    const scrollDownTable = () => {
        if (tableRef.current) {
            tableRef.current.scrollTo({
                top: tableRef.current.scrollHeight,
                behavior: "smooth", // smooth scroll
            });
        }
    };


    const fetchCollections = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('collections-list/')
            setCollectionOptions(response.data)
        } catch (error) {
            console.error(error)
        }
        
    }

    const fetchCategories = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('categories/')
            setCategoryData(response.data)
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }

    const HandleEditCategory = async (e) => {
        toast.dismiss()
        e.preventDefault()

        if (!collectionForEditing) {
            toast.error('Please select a collection')
            return
        }

        const data = {
            "title": categoryTitleForEditing,
            "collection": collectionForEditing
        }

        try {
            const response = await AXIOS_INSTANCE.patch(`category/${itemToBeEdited}/`, data)
            setCollectionForEditing('')
            setCategoryTitleForEditing('')
            setIsEditModal(false)
            toast.success(response?.data?.message)
            fetchCategories()
        } catch (error) {
            console.error(error)
        }
    }

    const HandleAddCategory = async (e) => {
        toast.dismiss()
        e.preventDefault()

        if (!collection) {
            toast.error('Please select a collection')
            return
        }

        const data = {
            "title": categoryTitle,
            "collection": collection
        }

        try {
            const response = await AXIOS_INSTANCE.post('categories/', data)
            setCollection('')
            setCategoryTitle('')
            toast.success(response?.data?.message)
            fetchCategories()

            setTimeout(() => {
                scrollDownTable()
            }, 500);

        } catch (error) {
            console.error(error)
        }
    }

    const confirmDeleteCategory = async () => {
        try {
            const response = await AXIOS_INSTANCE.delete(`category/${itemToBeDeleted}/`)
            toast.success(response?.data?.message)
            setIsDeleteModal(false)
            setItemToBeDeleted(null)
            fetchCategories()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCollections()
        fetchCategories()
    }, [])



    return (
        <div className="h-screen w-full">
            <Navbar />
            <div className="w-full h-full flex">
                {/* sidebar */}
                <Sidebar />

                <div className="flex-1 flex-col ml-4 mr-8 mb-0 rounded-xl bg-[#F7FBFD] w-full flex p-10 h-[97vh] z-50">
                    <div className="flex">
                        <h2 className="text-4xl font-medium text-dark-4B">Categories</h2>
                    </div>

                    <div className="w-full flex mt-10">
                        {/* Add Category */}
                        <form onSubmit={HandleAddCategory} className="w-1/3 shrink-0">
                            <div className="flex flex-col items-center p-10 rounded-2xl bg-white border">
                                <h2 className="text-2xl text-center font-medium text-dark-28">Add</h2>
                                <div className="w-full mt-8 space-y-6">
                                    <div>
                                        <label className="font-medium">Category Name</label>
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={(e) => setCategoryTitle(e.target.value)}
                                            value={categoryTitle}
                                            className="border mt-2 rounded-sm p-2 w-full outline-none"
                                            placeholder="Category"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="font-medium">Parent Collection</label>
                                        <BasicDropDown
                                            value={collection}
                                            onChange={setCollection}
                                            options={collectionOptions}
                                            placeholder="Select Collection"
                                            isOpen={isCollectionDropDownOpen}
                                            onToggle={(isOpen) => setIsCollectionDropDownOpen(isOpen)}
                                            className="w-full mt-2 border-stone-200"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="px-6 cursor-pointer py-1.5 mt-8 rounded-sm  bg-admin-button text-white">
                                    Save
                                </button>
                            </div>
                        </form>

                        {/* Category Table */}
                        <div ref={tableRef} className="w-2/3 ml-20 rounded-lg max-h-96 overflow-y-auto ">
                            <table className="w-full text-lg text-left text-gray-700">
                                <thead className="bg-[#394C5D] sticky top-0 text-white">
                                    <tr>
                                        <th className="px-4 py-5 font-normal">sno</th>

                                        <th className="px-4 py-5 font-normal">Category</th>
                                        <th className="px-4 py-5 font-normal">Collection</th>
                                        <th className="px-4 py-5 text-center font-normal text-nowrap">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {
                                        loading ? (
                                            <tr>
                                                <td colSpan={4} className="text-center py-20">
                                                    <div className="flex items-center justify-center space-x-3">
                                                        <span className="text-gray-600">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) :
                                            categoryData?.length > 0 ? (
                                                categoryData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className={rowStyle}>{index + 1}</td>

                                                        <td className={rowStyle}>{item?.title}</td>
                                                        <td className={rowStyle}>{item?.collection?.title}</td>
                                                        <td className={rowStyle}>
                                                            <div className="flex justify-center space-x-10">
                                                                <TooltipWrapper message="Edit">
                                                                    <img
                                                                        onClick={() => handleEditCategory(item)}
                                                                        src="/Icons/edit-black.svg"
                                                                        alt="edit"
                                                                        className="size-4 cursor-pointer"
                                                                    />
                                                                </TooltipWrapper>
                                                                <TooltipWrapper message="Delete">
                                                                    <img
                                                                        onClick={() => handleDeleteCategory(item.id)}
                                                                        src="/Icons/delete.svg"
                                                                        alt="delete"
                                                                        className="size-4 cursor-pointer"
                                                                    />
                                                                </TooltipWrapper>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (

                                                <tr>
                                                    <td colSpan={3} className="text-center py-6 text-gray-500">
                                                        No results found
                                                    </td>
                                                </tr>
                                            )}

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* Delete Modal */}
                {isDeleteModal && (
                    <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                        <div className="bg-white relative rounded-lg flex flex-col justify-center shadow-xl p-6 w-100">
                            <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center">
                                Are you sure to delete this category?
                            </h2>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={confirmDeleteCategory}
                                    className="mt-1 cursor-pointer rounded-sm font-medium border px-4 py-1 text-sm bg-[#F7FBFD]"
                                >
                                    Okay
                                </button>
                            </div>
                            <RxCross2
                                onClick={() => setIsDeleteModal(false)}
                                className="text-dark-4B cursor-pointer absolute text-xl top-3 right-3"
                            />
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {isEditModal && (
                    <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                        <div className="bg-white relative rounded-lg flex flex-col justify-center shadow-xl p-10">
                            <form onSubmit={HandleEditCategory} className="w-full shrink-0">
                                <div className="flex flex-col items-center p-6 rounded-2xl bg-white border">
                                    <h2 className="text-2xl text-center font-medium text-dark-28">Edit</h2>
                                    <div className="w-full mt-8 space-y-6">
                                        <div>
                                            <label className="font-medium">Category Name</label>
                                            <input
                                                type="text"
                                                name="title"
                                                onChange={(e) => setCategoryTitleForEditing(e.target.value)}
                                                value={categoryTitleForEditing}
                                                className="border mt-2 rounded-sm p-2 w-full outline-none"
                                                placeholder="Category"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">Parent Collection</label>
                                            <BasicDropDown
                                                value={collectionForEditing}
                                                onChange={setCollectionForEditing}
                                                options={collectionOptions}
                                                placeholder="Select Collection"
                                                isOpen={isCollectionDropDownOpenForEditing}
                                                onToggle={(isOpen) => setIsCollectionDropDownOpenForEditing(isOpen)}
                                                className="w-full mt-2 border-stone-200"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="px-6 cursor-pointer py-1.5 mt-8 rounded-sm bg-admin-button text-white">
                                        Save
                                    </button>
                                </div>
                            </form>
                            <RxCross2
                                onClick={() => setIsEditModal(false)}
                                className="text-dark-4B cursor-pointer absolute text-xl top-3 right-3"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
