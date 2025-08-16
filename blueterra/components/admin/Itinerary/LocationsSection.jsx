import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';


function LocationsSection({locations, setLocations, textAreaStyle, inputStyle, handleReorder }) {

    const LocationRefs = useRef([]);


    const handleAddLocation = () => {

        const lastIndex = locations.length;
        setLocations([...locations, { title: '', cordinates: '' }])
        setTimeout(() => {
            const target = LocationRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    // Handle changing a location input
    const handleLocationsChange = (index, field, value) => {
        const updatedLocations = [...locations];
        updatedLocations[index][field] = value;
        setLocations(updatedLocations);
    };

    const handleDeleteLocation = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setLocations((prevLocations) => prevLocations.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = LocationRefs.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }


    return (
        <div className="flex flex-col w-9/12 xl:w-6/12   transition-all duration-300 ease-in-out">

            <div className="flex items-center space-x-8">
                <h2 className=" text-xl font-medium">Key Location</h2>
                <img onClick={handleAddLocation} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
            </div>

            {locations?.map((location, index) => (
                <div key={index} ref={(el) => (LocationRefs.current[index] = el)} className={` my-1 relative flex flex-col space-y-4`}>

                    <p className=" font-medium mt-4 ">Location {index + 1}</p>
                    <div className=" w-full flex items-center space-x-5">
                        <input type="text" value={location.title} onChange={(e) => handleLocationsChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                        <input type="text" value={location.cordinates} onChange={(e) => handleLocationsChange(index, 'cordinates', e.target.value)} placeholder="Cordinates.." className={`${inputStyle}`} />
                    </div>

                    <div className=" absolute flex items-center space-x-3 -right-48 top-16">
                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteLocation} arrayOfElements={locations} setElements={setLocations} />

                    </div>

                </div>))}
        </div>
    )
}

export default LocationsSection