'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { IoMdArrowDropdown } from "react-icons/io"
import { BsCheck2 } from "react-icons/bs"

export default function Accordian({
    name,
    options,

}) {
    return (
        <Accordion
            type="multiple"
            collapsible="true"
            defaultValue={[]}
            className="w-full"
        >
            <AccordionItem value={name}>
                <AccordionTrigger className={`capitalize  font-normal    flex justify-between items-center py-3  `}>
                    {name}
                </AccordionTrigger>

                <AccordionContent className=" flex flex-col   ">
                    {options?.map((option, index) => (
                        <div
                            key={index}
                            className={`w-fit flex transition-all duration-500  my-2   text-white   px-1 cursor-pointer  rounded-md`}
                        >
                            {option.icon && <img src={option?.icon} alt={option?.label} className="shrink-0 size-4 mr-2 mt-1" />}
                            {option.link ? (
                                <a
                                    href={option.link}
                                    target={option.link.startsWith("http") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="text-[14px] hover:opacity-80 transition"
                                >
                                    {option.label}
                                </a>
                            ) : (
                                <p className="text-[14px]">{option.label}</p>
                            )}
                        </div>
                    ))}
                </AccordionContent>

            </AccordionItem>
        </Accordion>
    )
}
