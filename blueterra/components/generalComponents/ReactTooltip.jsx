import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function ReactTooltip({ id, render, children }) {
    return (
        <>
            <span data-tooltip-id={id}>
                {children}
            </span>
            <Tooltip
                id={id}
                place="bottom"
                className="!bg-white !text-black !shadow-2xl  !border-black !opacity-100  !rounded-md !px-3 !py-2 !text-sm  !z-[99999] !pointer-events-auto"
                render={render}
            />
        </>
    );
}
