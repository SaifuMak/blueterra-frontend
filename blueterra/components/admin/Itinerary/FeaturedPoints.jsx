import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';

function FeaturedPoints({ featuredPoints, setFeaturedPoints, textAreaStyle, inputStyle, handleReorder }) {

    const FeaturedPointsRef = useRef([]);


    const handleFeaturedPointsChange = (index, field, value) => {
        const updated = [...featuredPoints];
        updated[index][field] = value;
        setFeaturedPoints(updated);
    };


    const handleAddFeaturedPoints = () => {
        const lastIndex = featuredPoints.length;
        setFeaturedPoints([...featuredPoints, { suggestedDate: '', price: '', additionalInformation: '' }]);
        setTimeout(() => {
            FeaturedPointsRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };


    const handleDeleteFeaturedPoints = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setFeaturedPoints((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = FeaturedPointsRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };

    return (
        <div className="flex flex-col w-5/12 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-8">
                <h2 className="text-xl text-dark-blue font-medium">Featured Points</h2>
                {/* <img
                    onClick={handleAddFeaturedPoints}
                    src="/Icons/sqaure-add-icon.svg"
                    alt=""
                    className="cursor-pointer size-7"
                /> */}
            </div>

            {featuredPoints.map((data, index) => (
                <div
                    key={index}
                    ref={(el) => (FeaturedPointsRef.current[index] = el)}
                    className="my-1 relative flex flex-col space-y-4"
                >
                    <div className="w-full flex flex-col space-y-6  mt-6">

                        <div className=" flex flex-col w-8/12 ">
                            <label htmlFor="date" className=" mb-1">Best time to travel</label>
                            <input
                                type="text"
                                value={data.suggestedDate}
                                onChange={(e) => handleFeaturedPointsChange(index, 'suggestedDate', e.target.value)}
                                placeholder="Jun–Oct / Dec–Jan"
                                className={inputStyle}
                                required
                            />
                        </div>

                        <div className=" flex flex-col w-8/12 ">
                            <label htmlFor="date" className=" mb-1">Price start from</label>
                            <input
                                type="text"
                                value={data.price}
                                onChange={(e) => handleFeaturedPointsChange(index, 'price', e.target.value)}
                                placeholder="From $8,000pp excl. flights"
                                className={inputStyle}
                                required
                            />
                        </div>

                        <div className=" flex flex-col  w-10/12 ">
                            <label htmlFor="date" className=" mb-1">Additional information</label>
                            <textarea name=""
                                id=""
                                placeholder=""
                                value={data.additionalInformation}
                                onChange={(e) => handleFeaturedPointsChange(index, 'additionalInformation', e.target.value)}
                                className={`${textAreaStyle} w-full`}
                            ></textarea>
                        </div>


                    </div>

                    <div className="absolute flex items-center space-x-3 right-20 top-[53px]">
                        <ReorderIcons
                            handleReorder={handleReorder}
                            index={index}
                            handleDelete={handleDeleteFeaturedPoints}
                            arrayOfElements={featuredPoints}
                            setElements={setFeaturedPoints}
                            isReorder={false}
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default FeaturedPoints