'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { IoEyeOutline, IoEyeOffOutline } from "../../components/reactIcons"
import AXIOS_INSTANCE from "@/lib/axios"
import { toast } from 'sonner';
import LoaderIcon from "@/components/generalComponents/LoaderIcon"
import { useRouter } from "next/navigation";
import Loader from "@/components/generalComponents/Loader"


export default function login() {
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isIsAuthenticating, setIsIsAuthenticating] = useState(true)

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


    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        toast.dismiss()
        try {
            const response = await AXIOS_INSTANCE.post(`login-admin/`, formData);
            setTimeout(() => {
                toast.success('Logged in successfully')
            }, 500);
            router.replace("/admin/dashboard");

        } catch (error) {
            toast.error(error?.response?.data?.error)


        } finally {
            setIsLoading(false);
        }

    }

    const handlecheck = async (e) => {

        try {
            const response = await AXIOS_INSTANCE.get(`check/`);
            router.back()

        } catch (error) {
            console.log(error?.response?.status);


        } finally {
            setIsIsAuthenticating(false)
        }
    }

    useEffect(() => {
        handlecheck()
    }, [])


    if (isIsAuthenticating) {
        return (
            <Loader />
        )
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

                <form onSubmit={handleLogin}>
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
                            <input type="text" value={formData.username} onChange={handleInput} name="username" className=" border-b outline-none py-1  placeholder:text-black  border-black/80  w-full " placeholder="Username" required />

                            <div className=" relative border-black/80  border-b">
                                <input type={isPasswordVisible ? 'text' : 'password'} value={formData.password} onChange={handleInput} name="password" className=" outline-none  py-1 placeholder:text-black pr-6  w-full " placeholder="Password" required />
                                {formData.password && <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className=" cursor-pointer  absolute right-1 bottom-2">{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>}
                            </div>

                            <button type="submit" disabled={isLoading} className=" w-full cursor-pointer rounded-sm flex justify-center text-sm font-light text-center text-white bg-brand-blue py-3">{isLoading ? <LoaderIcon className='text-white text-xl animate-spin' /> : 'LOGIN'}</button>
                        </div>
                    </div>
                </form>

            </div>

        </div>

    )
}   