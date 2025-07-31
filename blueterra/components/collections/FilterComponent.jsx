
import { IoMdArrowDropdown, CgCheck, BsCheck2 } from '@/components/reactIcons'

export default function FilterComponent({ name, options, handleFilters, isOpened, handleItemSelection, selectedFilters }) {

    

    return (
        <div className={`${isOpened ? 'bg-sky-blue-1 text-white border ' : ' text-dark-28 border border-[#BEBEBE]'} z-20  transition-all duration-500 ease-in-out    rounded-sm  cursor-pointer relative inline-block`}  >

            <div onClick={() => handleFilters(name)} className=" flex  items-center py-2 px-2 space-x-10   justify-between ">
                <p className=" capitalize">{name}</p>
                <IoMdArrowDropdown className={`${isOpened ? ' rotate-180' : ' rotate-0'} transform transition-all duration-500 `} />
            </div>

            <div className={`${isOpened ? " max-h-[250px] opacity-100" : "max-h-0 opacity-0"} text-dark-28  overflow-y-auto transform transition-all duration-500 ease-in-out   absolute  mt-1  w-full bg-white `}>
                {options?.map((option, index) => (
                    <div key={index} onClick={() => handleItemSelection(name, option)} className="flex border-b py-3  cursor-pointer hover:bg-[#BEBEBE]/5 pl-2  items-center">
                        <div className={`size-4   flex justify-center  items-center border rounded-xs ${selectedFilters[name].includes(option) ? 'border-sky-blue-1' : ' border-dark-28/40'}  `}><BsCheck2 className={` text-xl  ${selectedFilters[name].includes(option) ? 'opacity-100 text-sky-blue-1 ' : 'opacity-0'}`} /></div>
                        <p className=" ml-2 text-sm text-nowrap">{option}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}