import React from 'react'
import { rubik } from '@/app/fonts'
import Button from '../generalComponents/Button'

const JournalsCardOverlay = ({ text }) => {

    return (
        <div className={` ${rubik.className}  pointer-events-none absolute cursor-pointer  w-full bg-gradient-to-t rounded-xl from-black/60 to-transparent  flex  items-end bottom-0 right-0 inset-0 `}>
            <div className=" pointer-events-auto group-hover:translate-y-0 delay-100  transition-all duration-1000 ease-in-out flex flex-col  pb-10 xl:px-10 px-7 space-y-8  translate-y-22">
                <p className=" text-lg xl:text-[21px] 2xl:text-[23px] text-white leading-9 2xl:leading-10 font-light">{text}</p>
                  <Button text='LEARN MORE' buttonStyle='px-7 py-2   opacity-0 group-hover:opacity-100' />
                {/* <button className=" px-7 py-2 text-white   transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 font-medium rounded-sm bg-sky-blue-1 w-fit">LEARN MORE</button> */}
            </div>
        </div>
    )
}

export default JournalsCardOverlay