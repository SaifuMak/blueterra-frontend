'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { IoMdArrowDropdown } from "react-icons/io"
import { BsCheck2 } from "react-icons/bs"

export default function MobileFilterComponent({
    name,
    options,
    isOpened,
    handleFilters,
    handleItemSelection,
    selectedFilters,
}) {
    return (
        <Accordion
            type="multiple"
            collapsible="true"
            defaultValue={[name]}
            className="w-full  "
        //   value={isOpened ? name : ""}
        //   onValueChange={(val) => handleFilters(val)}
        >
            <AccordionItem value={name}>
                <AccordionTrigger className={`capitalize  border  flex justify-between items-center px-4 py-2  `}>
                    {name}
                </AccordionTrigger>

                <AccordionContent className="bg-white flex flex-wrap gap-4 mt-3 px-4 py-2">
                    {options?.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleItemSelection(name, option?.title)}
                            className={`w-fit flex items-center transition-all duration-500  px-2 border py-2 ${selectedFilters[name].includes(option?.title) ? ' bg-sky-blue-1 text-white' : ' bg-white text-dark-28'}   px-2 cursor-pointer  rounded-md`}
                        >
                            <p className=" text-[14px] whitespace-nowrap">{option?.title}</p>
                        </div>
                    ))}
                </AccordionContent>

            </AccordionItem>
        </Accordion>
    )
}
