import React from 'react'
import Image from 'next/image'
import Events from '../Journey/Events'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'

function CorporateEventsSection() {

    const patternRef = useGsapFadeIn(0, { start: 'top 60%' })
    return (
        <div className=" w-full  text-dark-28 flex-center  h-full py-12 lg:py-20  relative ">

            {/* pattern */}
            <div ref={patternRef} className={`absolute  md:w-[29%] w-[80%] left-0 -bottom-5  h-fit`}>
                <Image
                    src='/images/corporate/patterns/corporate-events-bottom-left.png'
                    alt='clip path'
                    width={600}
                    height={1000}
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <Events firstTitle='Corporate'
                secondTitle='Experiences'
                description='Where Vision Meets Execution. And Every Event Leaves a Mark.'
                firstPara='At  BlueTerra, we execute corporate events that don’t just impress — they inspire.'
                secondPara='Every touchpoint is designed to align with your objectives, engage your audience and reflect your brand’s stature. From global incentive trips to C-suite offsites, we manage it all- meticulously and with absolute ownership.'
                imageUrl='/images/corporate/girl-with-map.png'
                outerClass="max-sm:my-10"
            />

        </div>

    )
}

export default CorporateEventsSection