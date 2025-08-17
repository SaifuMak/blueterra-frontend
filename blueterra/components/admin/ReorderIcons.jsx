import React from 'react'

const ReorderIcons = ({ handleReorder, index, handleDelete, arrayOfElements, setElements, isReorder = true }) => {
    
    return (
        <div className="space-x-3 flex ">
            {isReorder && <img onClick={() => handleReorder(index, 'down', arrayOfElements, setElements)} src="/Icons/down-box-arrow.svg" alt="" className={` size-5.5 xl:size-6 ${index === arrayOfElements.length - 1 ? ' opacity-55 cursor-not-allowed' : ' cursor-pointer opacity-100'}`} />}
            {isReorder && <img onClick={() => handleReorder(index, 'up', arrayOfElements, setElements)} src="/Icons/up-box-arrow.svg" alt="" className={` size-5.5 xl:size-6 ${index === 0 ? ' opacity-55 cursor-not-allowed' : ' cursor-pointer opacity-100'}`} />}

            <img onClick={() => handleDelete(index)} src="/Icons/red-delete-icon.svg" alt="" className=" cursor-pointer size-5.5 xl:size-6" />
        </div>
    )
}

export default ReorderIcons