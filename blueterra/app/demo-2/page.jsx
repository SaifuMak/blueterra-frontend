'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import TabCards from '@/components/ItineraryView/TabsCards';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFadeBoxes() {
    const containerRef = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);

    useEffect(() => {
        const box1 = box1Ref.current;
        const box2 = box2Ref.current;

        // Set initial states
        gsap.set(box1, { y: 0 });
        gsap.set(box2, { y: 300 });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;

                if (progress > 0.05) {
                    // Animate Box1 out (up), Box2 in (up)
                    gsap.to(box1, { y: -300, duration: 0.5 });
                    gsap.to(box2, { y: 0, duration: 0.5 });
                } else {
                    // Animate Box2 out (down), Box1 in (down)
                    gsap.to(box1, { y: 0, duration: 0.5 });
                    gsap.to(box2, { y: 300, duration: 0.5 });
                }
            },
        });
    }, []);



    return (
        <>
            <div ref={containerRef} className="relative h-[200vh] bg-white w-full">
                {/* Box 1 */}
                <div
                    ref={box1Ref}
                    className=" w-full h-full flex-center  absolute inset-0  bg-white border"
                >
                    <PlannedActivities />
                </div>

                {/* Box 2 */}
                <div
                    ref={box2Ref}
                    className="  w-full h-full flex-center absolute inset-0 bg-white border"
                >
                    <PlannedActivities />

                </div>
            </div>
            <div className=" h-screen w-full bg-indigo-100"></div>
        </>
    );
}
