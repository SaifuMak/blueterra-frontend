

'use client'
import SmoothScroll from "@/components/SmoothScroll";

import { rubik, } from "@/app/fonts"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ThreeCardSection from '@/components/OurStory/ThreeCardSection';
import TeamSection from '@/components/OurStory/TeamSection';
import WhyTravelWithUsSection from '@/components/OurStory/WhyTravelWithUsSection';
import PlanWithblueterra from '@/components/OurStory/PlanWithblueterra';
import JourneryIntro from '@/components/OurStory/JourneryIntro';
import PartnerCompanies from '@/components/OurStory/PartnerCompanies';
import Footer from "@/components/Footer/page";
gsap.registerPlugin(ScrollTrigger)

import Navbar from "@/components/Navbar/page";

export default function OurStory() {


    return (

        <SmoothScroll>
                <Navbar isfixed={true}/>

            <div className={`${rubik.className}  w-full h-full `}>

                {/* Section containing  3 cards  height for 3 cards*/}
                <ThreeCardSection />

                {/*   founder and company employees section */}
                <TeamSection />

                {/*  why travel with us section */}
                <WhyTravelWithUsSection />

                {/*  plan with blueterra  banner */}
                <PlanWithblueterra />

                {/* Journey intro */}
                <JourneryIntro />

                {/* partner companies section */}
                <PartnerCompanies />
                <Footer/>

            </div>
        </SmoothScroll>

    );
}
