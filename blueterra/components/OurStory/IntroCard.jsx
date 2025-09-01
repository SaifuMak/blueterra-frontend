import { playfair, rubik } from '@/app/fonts'
import Button from '../generalComponents/Button'
import { useRouter } from 'next/navigation'

export default function IntroCard() {

    const router = useRouter()

    const handleExploreClick = () => {
        router.push('/collections')
    }

    return (
        <div className={`${rubik.className} text-center  pointer-events-auto   sm:mt-56 text-white `} >
            <h1 className={` text-4xl xl:text-[80px] md:text-6xl lg:text-7xl ${playfair.className}  `}>The BlueTerra Journey</h1>
            {/* <h1 className={` text-4xl xl:text-[80px] md:text-6xl lg:text-7xl xl-mt-5  max-sm:mt-3 lg:mt-5 ${playfair.className}  `}>Timeless Memories.</h1> */}
            <p className=" md:text-2xl xl:text-3xl w-10/12  mx-auto  font-light mt-6">A boutique travel company built on passion, authenticity and belief that every journey can change the way we see the world</p>
            <Button text='EXPLORE' buttonStyle='translate-all mt-4 md:mt-7 xl:mt-12 duration-1000 ease-in-out  px-4 lg:px-8 xl:px-12 py-1.5 lg:py-2.5' onClickFunction={handleExploreClick} />

        </div>
    )
}
