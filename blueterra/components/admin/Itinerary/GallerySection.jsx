import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';


function GallerySection({ gallery, setGallery, textAreaStyle, inputStyle, handleReorder }) {

    const galleryRef = useRef([]);

    const handleAddGallery = () => {
        const lastIndex = gallery.length;
        setGallery([...gallery, { image: '', title: '' }]);

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

    
    return (
        <div className="flex flex-col xl:w-6/12 transition-all duration-300 ease-in-out">
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
                    <div className=" flex w-full items-center space-x-12 mt-4  ">
                        <div className=" w-1/2">
                        <ImageUploader
                            label="Image upload"
                            selectedFile={data.image}
                            setSelectedFile={(file) => handleGalleryChange(index, "image", file)}
                            id={`GalleryUpload-${index}`} // unique per day
                        />
                        </div>
                        {/* Title Field */}
                      {data.image &&   <div className=" flex flex-1 ">

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleGalleryChange(index, 'title', e.target.value)}
                                placeholder="Image title"
                                className={inputStyle}
                                required
                            />
                        </div>}

                    </div>

                </div>
            ))}
        </div>
    )
}

export default GallerySection