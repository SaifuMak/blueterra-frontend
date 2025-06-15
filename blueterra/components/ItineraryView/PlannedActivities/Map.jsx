'use client'
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Map({expandCards,index}) {

    return (
        <div onClick={()=>expandCards(index)} className=" relative cursor-pointer w-full h-full">
            <Image
            src='/Images/static/map.png'
            fill
            alt="google map"
            className="object-cover"
            />
        </div>
       
    )
}