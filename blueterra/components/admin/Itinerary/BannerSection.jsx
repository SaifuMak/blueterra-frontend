import React, { forwardRef } from 'react'
import { useState } from 'react'
import ColorThemePicker from './ColorThemePicker'
import { IoIosStar } from '@/components/reactIcons'



function BannerSection({
    textAreaStyle,
    title,
    setTitle,
    slug,
    setSlug,
    locationTitle,
    setLocationTitle,
    description,
    setDescription,
    color,
    setColor,
    selectedImageFile,
    setSelectedImageFile,
    selectedBannerImageUrl = null,
    isEditPage = false,
    generalRating,
    setGeneralRating,

}) {



    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImageFile(e.target.files[0]); // store the actual File object
            sethasUserDeletedOrChangedImageFile(true)
        }
    };

    const [hasUserDeletedOrChangedImageFile, sethasUserDeletedOrChangedImageFile] = useState(false)

    const handleDeleteSelectedImage = () => {
        setSelectedImageFile(null)
        sethasUserDeletedOrChangedImageFile(true)
    }


    return (
        < div className=" flex flex-col w-6/12 space-y-6" >

            <div className=" flex  space-x-5 ">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Itinerary Title...." className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} required />
                <input type="text" value={locationTitle} onChange={(e) => setLocationTitle(e.target.value)} placeholder="Location title" className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} required />

            </div>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Itinerary slug" className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} required />


            <textarea name="" id="" placeholder="Banner description" value={description} onChange={(e) => setDescription(e.target.value)} className={`${textAreaStyle} w-full   `} required></textarea>


            <div className="space-y-2">
                {/* Upload Row */}
                <div className="flex items-center space-x-8">
                    <p>Banner Image upload</p>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="bannerUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Browse Button */}
                    <label
                        htmlFor="bannerUpload"
                        className="px-4 border border-dark-4B w-fit bg-white cursor-pointer"
                    >
                        Browse
                    </label>

                    {/* Delete Icon */}
                    {selectedImageFile && (
                        <img
                            src="/Icons/red-delete-icon.svg"
                            alt="delete"
                            className="cursor-pointer size-5.5 xl:size-6"
                            onClick={handleDeleteSelectedImage}
                        />
                    )}
                </div>

                {/* Show file name */}
                {selectedImageFile && (
                    <div className="text-sm text-sky-blue-dark">
                        <p>{selectedImageFile.name}</p>
                    </div>
                )}


                <div className=" flex  my-5 items-center">
                    {selectedBannerImageUrl && !hasUserDeletedOrChangedImageFile && (
                        <button
                            type='button'
                            onClick={() => window.open(selectedBannerImageUrl, "_blank")}
                            className="px-3 py-1 cursor-pointer h-fit bg-sky-blue-dark text-sm text-white rounded transition"
                        >
                            View Image
                        </button>
                    )}

                    {selectedBannerImageUrl && !hasUserDeletedOrChangedImageFile && (
                        <div className="  ml-7 bg-slate-50">
                            <img src={selectedBannerImageUrl} alt="banner" className=" w-16 h-10 object-cover rounded-sm" />
                        </div>
                    )}
                </div>

            </div>

            <div className=" flex items-center ">
                <p className=" font-normal text-dark-28">Genaral Ratings</p>
                <div className=" flex space-x-0.5 ml-4">
                    {[...Array(5)].map((_, ratingIndex) => (
                        <IoIosStar onClick={() => setGeneralRating(ratingIndex + 1)} key={ratingIndex} className={` ${ratingIndex + 1 <= generalRating ? 'fill-[#FFCB1F]' : 'fill-slate-400'} size-4 cursor-pointer`} />
                    ))}
                </div>
            </div>

            <ColorThemePicker color={color} setColor={setColor} />

        </div >
    )
}

export default BannerSection