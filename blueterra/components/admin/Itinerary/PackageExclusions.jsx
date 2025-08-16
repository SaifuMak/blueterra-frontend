import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';


function PackageExclusions({ packageExclusions, setPackageExclusions, textAreaStyle, inputStyle, handleReorder }) {

    const packageExclusionsRef = useRef([]);


    // Exclusions
    const handleAddPackageExclusions = () => {
        const lastIndex = packageExclusions.length;
        setPackageExclusions([...packageExclusions, { title: '' }]);
        setTimeout(() => {
            packageExclusionsRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };


    const handlePackageExclusionChange = (index, field, value) => {
        const updated = [...packageExclusions];
        updated[index][field] = value;
        setPackageExclusions(updated);
    };


    const handleDeletePackageExclusion = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setPackageExclusions((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = packageExclusionsRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };


    return (
        <div className="flex flex-col xl:w-3/12 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-8">
                <h2 className="text-xl font-medium">Package Exclusions</h2>
                <img
                    onClick={handleAddPackageExclusions}
                    src="/Icons/sqaure-add-icon.svg"
                    alt=""
                    className="cursor-pointer size-7"
                />
            </div>

            {packageExclusions.map((data, index) => (
                <div
                    key={index}
                    ref={(el) => (packageExclusionsRef.current[index] = el)}
                    className="my-1 relative flex flex-col space-y-4"
                >
                    <div className="w-full flex items-center space-x-5 mt-6">
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => handlePackageExclusionChange(index, 'title', e.target.value)}
                            placeholder="Title.."
                            className={inputStyle}
                        />
                    </div>

                    <div className="absolute flex items-center space-x-3 -right-48 top-8">
                        <ReorderIcons
                            handleReorder={handleReorder}
                            index={index}
                            handleDelete={handleDeletePackageExclusion}
                            arrayOfElements={packageExclusions}
                            setElements={setPackageExclusions}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PackageExclusions