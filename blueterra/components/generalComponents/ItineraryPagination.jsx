import React from 'react'
import {MdOutlineArrowForwardIos} from '@/components/reactIcons'


function ItineraryPagination({ prevPage, nextPage, function_to_call, currentPage, TotalPages, queryParameter = null, buttonColor, innerClass = 'flex justify-between  w-7/12' }) {
    return (
        <div className="flex justify-end   my-8   space-x-4 text-sm text-dark-28  ">
            <div className={`${innerClass} `}>
                <div className="lg:space-x-8 space-x-6 ">
                    <button onClick={() => function_to_call(prevPage, queryParameter)} disabled={prevPage < 1} className={` px-1.5 lg:px-2.5 py-1.5 lg:py-2.5 border border-sky-blue-1  text-sky-blue-1 rounded-sm   font-medium  ${prevPage > 0 ? `  cursor-pointer` : ` `} bg-custom-dark-orange `}><MdOutlineArrowForwardIos className=' rotate-180'/></button>

                    <button onClick={() => function_to_call(nextPage, queryParameter)} disabled={nextPage == null} className={` px-1.5 lg:px-2.5 py-1.5 lg:py-2.5  border border-sky-blue-1  text-sky-blue-1 ${nextPage && ` cursor-pointer`}  rounded-sm font-medium  `}><MdOutlineArrowForwardIos/></button>
                </div>
              {TotalPages > 1 &&   <p className="flex items-center justify-center "> <span className="flex items-center justify-center shrink-0 mr-1  ">{currentPage} </span>/ {TotalPages}</p>}
            </div>
        </div>
    )
}

export default ItineraryPagination