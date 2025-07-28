import { playfair, rubik } from '@/app/fonts'
import Button from '../generalComponents/Button'

export default function IntroCard() {

    return (
        <div className={`${rubik.className} text-center text-white `} >
            <h1 className={`text-[80px] ${playfair.className}  `}>Curated Journeys.</h1>
            <h1 className={`text-[80px] -mt-5 ${playfair.className}  `}>Timeless Memories.</h1>
            <p className=" text-3xl font-light mt-6">At BlueTerra, we craft travel that resonates</p>
            <Button text='EXPLORE MORE' buttonStyle='translate-all mt-12 duration-1000 ease-in-out max-md:text-sm px-4 lg:px-8 xl:px-12 py-1.5 lg:py-2.5' />

        </div>
    )
}
