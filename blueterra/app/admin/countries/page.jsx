'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useEffect, useRef } from "react";
import Dropdown from "@/components/admin/Itinerary/DropDown";
import AXIOS_INSTANCE from "@/lib/axios";
import { toast } from "sonner";
import TooltipWrapper from "@/components/generalComponents/TooltipWrapper";
import { IoEyeOutline, IoEyeOffOutline, RxCross2, AiOutlineCheck } from '@/components/reactIcons'
import BasicDropDown from "@/components/admin/Itinerary/BasicDropDown";


export default function Countries() {

    const [countryTitle, setCountryTitle] = useState('')
    const [countryTitleForEditing, setCountryTitleForEditing] = useState('')

    const tableRef = useRef()
     const [loading, setLoading] = useState(true); // loading state



    const [countryData, setCountryData] = useState([])

    const [country, setCountry] = useState("");

    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [itemToBeDeleted, setItemToBeDeleted] = useState(null)


    const [isEditModal, setIsEditModal] = useState(false)
    const [itemToBeEdited, setItemToBeEdited] = useState(null)

    const [destination, setDestination] = useState('')
    const [destinationForEditing, setDestinationForEditing] = useState('')


    const [destinationOptions, setDestinationOptions] = useState([])
    const [isDestinationDropDownOpen, setIsDestinationDropDownOpen] = useState(false)
    const [isDestinationDropDownOpenForEditing, setIsDestinationDropDownOpenForEditing] = useState(false)


    const rowStyle = 'px-4 py-6  border-t order-gray-100/10'

    const handleDeleteCountry = (id) => {
        setIsDeleteModal(true)
        setItemToBeDeleted(id)
    }

    const handleEditCountry = (item) => {
        setIsEditModal(true)
        setItemToBeEdited(item.id)
        setDestinationForEditing(item?.destination?.title)
        setCountryTitleForEditing(item?.title)
    }

    const scrollDownTable = () => {
        if (tableRef.current) {
            tableRef.current.scrollTo({
                top: tableRef.current.scrollHeight,
                behavior: "smooth", // smooth scroll
            });
        }
    };


    const fetchDestinations = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('destinations-list/')
            console.log(response.data);
            setDestinationOptions(response.data)

        }
        catch (error) {

        }
        finally {
        }
    }





    const fetchCountries = async () => {
        try {
            const response = await AXIOS_INSTANCE.get('countries/')
            console.log(response.data);
            setCountryData(response.data)

        }
        catch (error) {

        }
        finally {
            setLoading(false)
        }
    }


    const HandleEditCountry = async (e) => {
        toast.dismiss()

        e.preventDefault();
        if (!destinationForEditing) {
            toast.error('Please select a destination')
            return
        }

        const data = {
            "title": countryTitleForEditing,
            "destination": destinationForEditing
        }
        try {
            const response = await AXIOS_INSTANCE.patch(`country/${itemToBeEdited}/`, data)
            setDestinationForEditing('')
            setCountryTitleForEditing('')
            setIsEditModal(false)
            toast.success(response?.data?.message)
            fetchCountries()
        }
        catch (error) {

        }
        finally {
        }
    }

    const HandleAddCountry = async (e) => {
        toast.dismiss()

        e.preventDefault();
        if (!destination) {
            toast.error('Please select a destination')
            return
        }

        const data = {
            "title": countryTitle,
            "destination": destination
        }
        try {
            const response = await AXIOS_INSTANCE.post('countries/', data)
            console.log(response.data);
            setDestination('')
            setCountryTitle('')
            toast.success(response?.data?.message)
            fetchCountries()
            setTimeout(() => {
                scrollDownTable()
            }, 500);

        }
        catch (error) {

        }
        finally {
        }
    }


    const confirmDeleteCountry = async () => {

        try {
            const response = await AXIOS_INSTANCE.delete(`country/${itemToBeDeleted}/`)
            toast.success(response?.data?.message)
            setIsDeleteModal(false)
            setItemToBeDeleted(null)
            fetchCountries()
        }
        catch (error) {

        }
        finally {
        }
    }

    useEffect(() => {
        fetchDestinations()
        fetchCountries()
    }, [])


    return (
        <div className="   h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1 flex-col  ml-4  mr-8 mb-0 rounded-xl bg-[#F7FBFD] w-full flex p-10  h-[97vh] z-50">
                    <div className=" flex  ">
                        <h2 className=" text-4xl font-medium text-dark-4B  ">Countries </h2>
                    </div>

                    <div className=" w-full flex mt-10 ">

                        <form onSubmit={HandleAddCountry} className=" w-1/3 shrink-0">
                            {/* container to add countries */}
                            <div className=" flex flex-col items-center p-10 rounded-2xl bg-white border">
                                <h2 className="text-2xl text-center font-medium text-dark-28">Add</h2>

                                {/* Wrapper for inputs with consistent spacing */}
                                <div className="w-full mt-8 space-y-6">
                                    <div>
                                        <label htmlFor="text" className="font-medium">
                                            Country Name
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={(e) => setCountryTitle(e.target.value)}
                                            value={countryTitle}
                                            className="border mt-2 rounded-sm p-2 w-full outline-none"
                                            placeholder="Country"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="text" className="font-medium">
                                            Parent Destination
                                        </label>
                                        <BasicDropDown
                                            value={destination}
                                            onChange={setDestination}
                                            options={destinationOptions}
                                            placeholder="Select Destination"
                                            isOpen={isDestinationDropDownOpen}
                                            onToggle={(isOpen) => setIsDestinationDropDownOpen(isOpen)}
                                            className="w-full mt-2 border-stone-200"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="px-6 cursor-pointer py-1.5 mt-8 rounded-sm bg-admin-button text-white">
                                    Save
                                </button>
                            </div>
                        </form>

                        <div ref={tableRef} className=" w-2/3 ml-20  rounded-lg max-h-96  overflow-y-auto ">
                            <table className="w-full text-lg   text-left text-gray-700">
                                <thead className="bg-[#394C5D] sticky top-0 text-white  ">
                                    <tr>
                                        <th className="px-4 py-5 font-normal">sno</th>

                                        <th className="px-4 py-5 font-normal ">Country</th>
                                        <th className="px-4 py-5 font-normal ">Destination</th>

                                        <th className="px-4 py-5 text-center font-normal text-nowrap"><button className="  cursor-pointer text-white rounded-sm px-6 py-1">Actions</button></th>
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
                                            countryData?.length > 0 ? (
                                                countryData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className={rowStyle}>{index + 1}</td>

                                                        <td className={rowStyle}>{item?.title}</td>
                                                        <td className={rowStyle}>{item?.destination?.title}</td>
                                                        <td className={rowStyle}>
                                                            <div className="flex justify-center space-x-10">
                                                                <TooltipWrapper message="Edit">
                                                                    <img
                                                                        onClick={() => handleEditCountry(item)}
                                                                        src="/Icons/edit-black.svg"
                                                                        alt="edit"
                                                                        className="size-4 cursor-pointer"
                                                                    />
                                                                </TooltipWrapper>
                                                                <TooltipWrapper message="Delete">
                                                                    <img
                                                                        onClick={() => handleDeleteCountry(item.id)}
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


                {isDeleteModal && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-6 w-100">
                        <h2 className="text-lg mt-5 font-medium mb-4 text-dark-4B text-center ">Are you sure to delete this country ?</h2>
                        <div className=" flex justify-center mt-4">
                            <button onClick={confirmDeleteCountry} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Okay</button>
                        </div>
                        <RxCross2 onClick={() => setIsDeleteModal(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                    </div>
                </div>}

                {isEditModal && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                    <div className="bg-white relative rounded-lg flex flex-col  justify-center  shadow-xl p-10">
                        <form onSubmit={HandleEditCountry} className=" w-full shrink-0">
                            {/* container to add countries */}
                            <div className=" flex flex-col items-center p-6 rounded-2xl bg-white border">
                                <h2 className="text-2xl text-center font-medium text-dark-28">Edit</h2>

                                {/* Wrapper for inputs with consistent spacing */}
                                <div className="w-full mt-8 space-y-6">
                                    <div>
                                        <label htmlFor="text" className="font-medium">
                                            Country Name
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={(e) => setCountryTitleForEditing(e.target.value)}
                                            value={countryTitleForEditing}
                                            className="border mt-2 rounded-sm p-2 w-full outline-none"
                                            placeholder="Country"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="text" className="font-medium">
                                            Parent Destination
                                        </label>
                                        <BasicDropDown
                                            value={destinationForEditing}
                                            onChange={setDestinationForEditing}
                                            options={destinationOptions}
                                            placeholder="Select Destination"
                                            isOpen={isDestinationDropDownOpenForEditing}
                                            onToggle={(isOpen) => setIsDestinationDropDownOpenForEditing(isOpen)}
                                            className="w-full mt-2 border-stone-200"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="px-6 cursor-pointer py-1.5 mt-8 rounded-sm bg-admin-button text-white">
                                    Save
                                </button>
                            </div>
                        </form>
                        <RxCross2 onClick={() => setIsEditModal(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                    </div>
                </div>}

            </div>
        </div>
    )
}