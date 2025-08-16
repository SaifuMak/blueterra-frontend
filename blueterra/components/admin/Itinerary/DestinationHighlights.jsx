import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';

function DestinationHighlights({  destinationHighlights, setDestinationHighlights, textAreaStyle, inputStyle, handleReorder }) {
    const destinationHighlightsRef = useRef([]);


    const handleAddDestinationHighlights = () => {
        const lastIndex = destinationHighlights.length;
        setDestinationHighlights([...destinationHighlights, { title: '' }])
        setTimeout(() => {
            const target = destinationHighlightsRef.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    const handleDestinationsChange = (index, field, value) => {
        const updatedDestinationHighlights = [...destinationHighlights];
        updatedDestinationHighlights[index][field] = value;
        setDestinationHighlights(updatedDestinationHighlights);
    };


    const handleDeleteDestinationHighlights = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setDestinationHighlights((prev) => prev.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = destinationHighlightsRef.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }
    return (
        <div className="flex flex-col  xl:w-3/12   transition-all duration-300 ease-in-out">

            <div className="flex items-center space-x-8">
                <h2 className=" text-xl font-medium">Destination Highlights</h2>
                <img onClick={handleAddDestinationHighlights} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
            </div>
            {destinationHighlights?.map((data, index) => (
                <div key={index} ref={(el) => (destinationHighlightsRef.current[index] = el)} className={` my-1 relative flex flex-col space-y-4`}>

                    <div className=" w-full flex items-center space-x-5 mt-6">
                        <input type="text" value={data.title} onChange={(e) => handleDestinationsChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                    </div>

                    <div className=" absolute flex items-center space-x-3 -right-48 top-8">
                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteDestinationHighlights} arrayOfElements={destinationHighlights} setElements={setDestinationHighlights} />
                    </div>

                </div>))}
        </div>

    )
}

export default DestinationHighlights