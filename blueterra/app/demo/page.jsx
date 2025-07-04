'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

const TestimonialSlider = () => {
    const outerContainer = useRef();
    const scrollContent = useRef();

    useGSAP(() => {
        const content = scrollContent.current;

        const animation = gsap.to(content, {
            x: () => `-=${content.scrollWidth / 2}`, // scroll half of total content
            duration: 10, // smaller = faster
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % (content.scrollWidth / 2)),
            },
        });

    });

    return (
        <div
            ref={outerContainer}
            className="w-8/12 mx-auto overflow-hidden"
        >
            <div
                ref={scrollContent}
                className="flex whitespace-nowrap gap-4"
            >

                <div className="flex gap-10">
                    {[...Array(10)].map((_, j) => (
                        <div
                            key={j}
                            className="min-w-[200px] h-40 bg-blue-500 text-white flex items-center justify-center rounded"
                        >
                            Item {j + 1}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TestimonialSlider;
