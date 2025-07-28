'use client'
import { useState } from 'react';

import { playfair, rubik } from '@/app/fonts'

export default function MissionVisionValues() {

    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        {
            title: 'Our Mission',
            content: [
                'To become the most trusted premium travel curator in the region — leading a new era of sustainable, experience-driven exploration that enriches both traveler and destination.',
                'We provide tailored experiences that celebrate culture, nature, and personal growth through responsible travel practices.',
            ],
        },
        {
            title: 'Our Vision',
            content: [
                'We envision a future where conscious travel isn’t a trend, but the standard — where every journey is thoughtfully curated, deeply personal, and leaves a lasting, positive footprint.',
                'Our vision extends beyond destinations; it’s about cultivating emotional connections, expanding horizons, and encouraging mindful engagement with the world.',
            ],
        },
        {
            title: 'Core Value',
            content: [
                'Integrity, empathy, sustainability, and innovation drive everything we do — creating memorable experiences with purpose and care.',
                'We prioritize transparency and innovation to ensure that every journey we create respects people, cultures, and the planet.',
            ],
        },
    ];


    return (
        <div className={`${rubik.className} w-full  flex-center`}>
            <div className=" w-full font-light text-xl flex-center  text-white  px-10 py-20  backdrop-blur-2xl border rounded-2xl  border-white/30 shadow-lg bg-black/0  ">
                <div className=" flex justify-between items-center  w-9/12  min-h-[50vh]">
                    <div className={`w-1/3 ${playfair.className} space-y-10 text-white text-2xl font-light `}>
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`block text-left cursor-pointer transition duration-500 ${activeTab === i
                                    ? 'text-white font-semibold text-[50px]'
                                    : 'text-white/50 text-[45px]'
                                    }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>


                    {/* Right Content */}
                    <div className="w-2/3  max-w-xl  text-white space-y-6 font-light text-2xl  border-white/30 pl-8">
                        {tabs[activeTab].content.map((paragraph, idx) => (
                            <p key={idx} className=' font-light text-white/90 leading-10'>{paragraph}</p>
                        ))}
                    </div>

                </div>
            </div>
        </div>

    )
}