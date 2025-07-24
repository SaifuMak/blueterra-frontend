import React from 'react'


function Pagination({ prevPage, nextPage, function_to_call, currentPage, TotalPages, queryParameter = null }) {
    return (
        <div className="flex justify-end px-8 my-8 space-x-4 text-sm text-dark-28  ">
            <div className="flex justify-between w-7/12">
                <div className="space-x-8 ">
                    <button onClick={() => function_to_call(prevPage, queryParameter)} disabled={prevPage < 1} className={`px-6 py-1.5  rounded-sm  text-white font-medium  ${prevPage > 0 ? ' bg-[#394C5D] cursor-pointer' : 'bg-[#394C5D]/40'} bg-custom-dark-orange `}>prev</button>

                    <button onClick={() => function_to_call(nextPage, queryParameter)} disabled={nextPage == null} className={`px-6 py-1.5 rounded-sm text-white font-medium  ${nextPage ? ' bg-[#394C5D] cursor-pointer' : 'bg-[#394C5D]/40'} `}>next</button>
                </div>
                <p className="flex items-center justify-center ">page <span className="flex items-center justify-center px-2 mx-1 rounded-sm bg-slate-200">{currentPage} </span>  of {TotalPages}</p>
            </div>
        </div>
    )
}

export default Pagination