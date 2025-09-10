'use client'
import { useState, forwardRef, useImperativeHandle } from 'react';

import { playfair, rubik } from '@/app/fonts'
import { useIsMobile } from '@/app/hooks/useIsMobile';

const MissionVisionValues = forwardRef((props, ref) => {
    const isMobile = useIsMobile();


    const [activeTab, setActiveTab] = useState(0);

    useImperativeHandle(ref, () => ({
        setTab: (i) => setActiveTab(i)
    }));


    const tabs = [
        {
            title: isMobile ? 'Mission' : 'Our Mission',
            content: [
                'To craft travel experiences and events that inspire and connect people, driven by attention to detail & a commitment to excellence.',
                // 'We provide tailored experiences that celebrate culture, nature, and personal growth through responsible travel practices.',
            ],
        },
        {
            title: isMobile ? 'Vision' : 'Our Vision',
            content: [
                'To build a global platform that connects people, places, and possibilities - delivering exceptional experiences that enrich lives, foster discovery, and evolve with the way the world travels.',
                // 'We envision a future where conscious travel isn’t a trend, but the standard — where every journey is thoughtfully curated, deeply personal, and leaves a lasting, positive footprint.',
                // 'Our vision extends beyond destinations; it’s about cultivating emotional connections, expanding horizons, and encouraging mindful engagement with the world.',
            ],
        },
        {
            title: isMobile ? 'Values' : 'Core Value',
            content: [
                'Guided by trust, authenticity, care for nature and excellence, our values shape every journey we create.',
                // 'Integrity, empathy, sustainability, and innovation drive everything we do — creating memorable experiences with purpose and care.',
                // 'We prioritize transparency and innovation to ensure that every journey we create respects people, cultures, and the planet.',
            ],
        },
    ];


    return (
        <div className={`${rubik.className}  w-full rounded-2xl overflow-hidden  flex-center`}>

            <div className=" w-full font-light text-xl  flex justify-center md:items-center max-sm:min-h-[40vh] text-white px-1 md:px-10 2xl:py-20 md:py-10 py-8  backdrop-blur-2xl border rounded-2xl  border-white/30 shadow-lg bg-black/0  ">

                <div className=" flex max-sm:flex-col  md:justify-between items-center  2xl:w-9/12  lg:min-h-[50vh]">

                    <div className={`md:w-1/3 ${playfair.className} max-sm:flex max-sm:space-x-6 md:space-y-10 text-white text-2xl font-light `}>

                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`block text-left cursor-pointer transition duration-500 ${activeTab === i
                                    ? 'text-white font-semibold text-xl md:text-3xl lg:text-[42px] xl:text-5xl 2xl:text-[50px]'
                                    : 'text-white/50 lg:text-4xl text-xl md:text-3xl xl:text-[42px] 2xl:text-[45px]'
                                    }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    {/* Right Content */}
                    <div className="md:w-2/3  md:max-w-xl  text-white space-y-6 max-sm:mt-6 font-light text-[15px] px-3 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl  border-white/30 md:pl-8">
                        {tabs[activeTab].content.map((paragraph, idx) => (
                            <p key={idx} className=' font-light text-white/90 max-sm:text-center leading-6 md:leading-8 xl:leading-10'>{paragraph}</p>
                        ))}
                    </div>

                </div>
            </div>
        </div>

    )
})

export default MissionVisionValues