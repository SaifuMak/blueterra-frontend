import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";


const LoaderIcon = ({className}) => {
    return (

        <BiLoaderCircle className={` ${className} `} />

    )
}

export default LoaderIcon