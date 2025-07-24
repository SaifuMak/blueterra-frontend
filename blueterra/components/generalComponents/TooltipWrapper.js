// components/TooltipWrapper.tsx

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";


export default function TooltipWrapper({ message, children, className = " rounded-sm font-medium" }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className={className}>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    );
}
