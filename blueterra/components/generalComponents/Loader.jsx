import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";


const Loader = () => {
    return (
        <div className=" bg-white  z-50 absolute inset-0 w-full h-[100vh] flex-center">
            <BiLoaderCircle className=' animate-spin text-3xl text-sky-blue-1' />
        </div>
    )
}

export default Loader