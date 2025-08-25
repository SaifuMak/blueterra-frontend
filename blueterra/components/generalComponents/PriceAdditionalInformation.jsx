
import { rubik } from '@/app/fonts'



export default function PriceAdditionalInformation({ additionalInformation }) {
    return (
        <div className={` w-full  mx-auto p-6 ${rubik.className}`}>
            <div>
                <h2 className="text-xl  font-medium mb-4">Information</h2>
                <p className="mb-4 text-sm  ">
                    {additionalInformation}
                </p>

            </div>
        </div>

    );
}
