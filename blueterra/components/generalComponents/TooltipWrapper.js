// components/TooltipWrapper.tsx

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";


export default function TooltipWrapper({ message, children, className = "  text-white  rounded-sm text-sm font-medium" }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className={`custom-tooltip ${className}`} >
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    );
}
