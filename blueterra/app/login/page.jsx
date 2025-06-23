'use client'
import Image from "next/image"
import { useState } from "react"
import { IoEyeOutline, IoEyeOffOutline } from "../../components/reactIcons"

export default function login() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const [formData, setformData] = useState({
        username: '',
        password: ''
    })


    const handleInput = (e) => {
        const { name, type, value } = e.target

        setformData((prev) => ({
            ...prev,
            [name]: value
        }));
    }



    return (
        <div className=" w-full flex justify-center items-center h-screen relative">
            <Image
                src="/images/login/background.png"
                alt="nature background"
                fill
                className=" object-cover z-0"
                priority
            />

            <div className="absolute inset-0 z-20 w-full flex justify-center max-md:mt-16 md:items-center  h-full">

                <div className=" h-fit w-fit px-4 md:px-6 py-16 md:py-20 rounded-3xl flex flex-col justify-center items-center border-2 border-white/60  bg-white/60 ">

                    <div className="md:w-[200px] relative md:h-[50px] w-[160px] h-[40px] shrink-0 ">
                        <Image
                            src="/images/login/logo-2.png"
                            alt="nature background"
                            fill
                            className=" object-contain z-0"
                        />
                    </div>

                    <p className="text-center my-8 ">Login to your account</p>

                    <div className=" flex flex-col space-y-8 md:space-y-6 w-[290px]  md:w-[330px]">
                        <input type="text" value={formData.username} onChange={handleInput} name="username" className=" border-b outline-none py-1  placeholder:text-black  border-black/80  w-full " placeholder="Username" />
                       
                        <div className=" relative border-black/80  border-b">
                            <input type={isPasswordVisible ? 'text' : 'password'} value={formData.password} onChange={handleInput} name="password" className=" outline-none  py-1 placeholder:text-black pr-6  w-full " placeholder="Password" />
                          {formData.password &&  <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className=" cursor-pointer  absolute right-1 bottom-2">{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>}
                        </div>
                      
                        <button className=" w-full rounded-sm text-sm font-light text-white bg-brand-blue py-3">LOGIN</button>
                    </div>
                </div>

            </div>

        </div>

    )
}   