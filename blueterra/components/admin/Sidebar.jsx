'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { SIDEBAR_ITEMS } from '../../constants/admin'

const Sidebar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const handleTabSelection = (path) => {
        router.push(path)
    }

    return (
        <div className=" w-[210px] lg:w-[250px] py-10  px-10 text-white xl:w-[300px] rounded-tr-4xl  min-h-screen bg-brand-blue">
            <div className=" space-y-6">
                {SIDEBAR_ITEMS?.map((item, index) => (
                    <div onClick={() => handleTabSelection(item.path)} key={index} className={` transition-all duration-300 ease-in-out cursor-pointer flex ${pathname === item.path ? 'bg-[#00A0DE] rounded-sm  py-2.5 pl-5 ' : ''}  `} > <img src={item.icon} alt="" className=" size-5 mr-2" />{item.name}</div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar