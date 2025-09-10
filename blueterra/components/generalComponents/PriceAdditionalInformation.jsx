
import { rubik } from '@/app/fonts'
import { useHasScrollbar } from '@/app/hooks/useHasScrollbar';


export default function PriceAdditionalInformation({ additionalInformation }) {

    const { containerRef, hasScrollbar } = useHasScrollbar([])

    return (
        <div className={` w-full text-dark-28   mx-auto p-6 ${rubik.className}`}>
            <div>
                <h2 className="text-xl  font-medium mb-4">Information</h2>
                <div ref={containerRef} className=" max-h-40 pb-10 overflow-y-auto" {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
                    <p className="mb-4 text-sm font-light  ">
                        {additionalInformation}
                    </p>
                </div>

            </div>
        </div>

    );
}
