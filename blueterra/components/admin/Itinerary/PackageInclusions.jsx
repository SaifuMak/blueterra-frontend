import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';

function PackageInclusions({ packageInclusions, setPackageInclusions, textAreaStyle, inputStyle, handleReorder }) {

    const packageInclusionsRef = useRef([]);
    

    const handlePackageInclusionChange = (index, field, value) => {
        const updated = [...packageInclusions];
        updated[index][field] = value;
        setPackageInclusions(updated);
    };


    const handleAddPackageInclusions = () => {
        const lastIndex = packageInclusions.length;
        setPackageInclusions([...packageInclusions, { title: '' }]);
        setTimeout(() => {
            packageInclusionsRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };


    const handleDeletePackageInclusion = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setPackageInclusions((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = packageInclusionsRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };

    return (
        <div className="flex flex-col xl:w-3/12 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-8">
                <h2 className="text-xl font-medium text-dark-blue">Package Inclusions</h2>
                <img
                    onClick={handleAddPackageInclusions}
                    src="/Icons/sqaure-add-icon.svg"
                    alt=""
                    className="cursor-pointer size-7"
                />
            </div>

            {packageInclusions.map((data, index) => (
                <div
                    key={index}
                    ref={(el) => (packageInclusionsRef.current[index] = el)}
                    className="my-1 relative flex flex-col space-y-4"
                >
                    <div className="w-full flex items-center space-x-5 mt-6">
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => handlePackageInclusionChange(index, 'title', e.target.value)}
                            placeholder="Title.."
                            className={inputStyle}
                            required
                        />
                    </div>

                    <div className="absolute flex items-center space-x-3 -right-48 top-8">
                        <ReorderIcons
                            handleReorder={handleReorder}
                            index={index}
                            handleDelete={handleDeletePackageInclusion}
                            arrayOfElements={packageInclusions}
                            setElements={setPackageInclusions}
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default PackageInclusions