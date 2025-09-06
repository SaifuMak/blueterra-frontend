import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';

import { toast } from 'sonner';
import TooltipWrapper from '@/components/generalComponents/TooltipWrapper';

function GallerySection({ gallery, setGallery, textAreaStyle, inputStyle, handleReorder }) {

    const galleryRef = useRef([]);

    const handleAddGallery = () => {
        const lastIndex = gallery.length;
        setGallery([...gallery, { image: '', title: '', is_checked: false }]);

        setTimeout(() => {
            const target = galleryRef.current[lastIndex];
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 200);
    };

    const handleGalleryChange = (index, field, value) => {
        const updatedGallery = [...gallery];
        updatedGallery[index][field] = value;
        setGallery(updatedGallery);
    };

    const handleDeleteGallery = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setGallery((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = galleryRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };


    const handleCheckboxChange = (index) => {
        toast.dismiss()
        const checkedCount = gallery.filter((item) => item.is_checked).length;

        const updatedGallery = [...gallery];

        if (!updatedGallery[index].is_checked && checkedCount >= 3) {
            toast.error("You can only select up to 3 images."); // optional UX
            return;
        }

        updatedGallery[index].is_checked = !updatedGallery[index].is_checked;
        setGallery(updatedGallery);
    };


    return (
        <div className="flex flex-col xl:w-9/12 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-8">
                <h2 className="text-xl font-medium text-dark-blue">Gallery images</h2>
                <img
                    onClick={handleAddGallery}
                    src="/Icons/sqaure-add-icon.svg"
                    alt=""
                    className="cursor-pointer size-7"
                />
            </div>

            {gallery.map((data, index) => (
                <div
                    key={index}
                    ref={(el) => (galleryRef.current[index] = el)}
                    className="my-1 mt-4 relative flex flex-col space-y-4"
                >

                    {/* Image URL Field */}
                    <div className=" flex w-full items-center space-x-5 mt-4  ">
                        <TooltipWrapper message="Display in Itinerary card">
                            <input
                                type="checkbox"
                                checked={data.is_checked || false}
                                onChange={() => handleCheckboxChange(index)}
                                className=" size-4 border cursor-pointer accent-dark-blue"
                            />
                        </TooltipWrapper>
                        <div className=" ">
                            <ImageUploader
                                label="Image upload"
                                selectedFile={data.image}
                                setSelectedFile={(file) => handleGalleryChange(index, "image", file)}
                                id={`GalleryUpload-${index}`} // unique per day
                                isDeleteOptionAvailable={false}
                            />
                        </div>

                        {/* Title Field */}
                        {data.image && <div className=" ml-4 flex flex-1 ">

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleGalleryChange(index, 'title', e.target.value)}
                                placeholder="Image title"
                                className={inputStyle}
                                required
                            />
                        </div>}

                        {data.image_public_url && typeof data.image === "string" && (

                            <a href={data.image_public_url} target="_blank" rel="noopener noreferrer">
                                <TooltipWrapper message="uploaded image">
                                    <img
                                        src={data.image_public_url}
                                        alt="gallery Preview"
                                        className="w-20 h-12 cursor-pointer object-cover rounded shadow-md hover:opacity-80 transition"
                                    />
                                </TooltipWrapper>
                            </a>
                        )}

                        <img
                            src="/Icons/red-delete-icon.svg"
                            alt="delete"
                            className="cursor-pointer size-5.5 xl:size-6"
                            onClick={() => handleDeleteGallery(index)}
                        />
                    </div>

                </div>
            ))}
        </div>
    )
}

export default GallerySection