
'use client'
import SmoothScroll from "@/components/SmoothScroll";
import { useState } from "react";
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
import Navbar from "@/components/Navbar/page";
import ZohoFormModal from "@/components/Forms/ZohoFormModal";


gsap.registerPlugin(ScrollTrigger)


export default function OurStoryClient() {

    const [formOpen, setFormOpen] = useState(false);

    return (
        <>

            <SmoothScroll>
                <Navbar />

                <div className={`${rubik.className}  w-full h-full `}>

                    {/* Section containing  3 cards  height for 3 cards*/}
                    <ThreeCardSection />

                    {/* Journey intro */}
                    <JourneryIntro />

                    {/* founder and company employees section */}
                    {/* <TeamSection /> */}

                    {/*  why travel with us section */}
                    <WhyTravelWithUsSection />

                    {/* plan with blueterra  banner */}
                    <PlanWithblueterra setFormOpen={setFormOpen} />

                    {/*partner companies section */}
                    <PartnerCompanies />

                    <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

                </div>
                <Footer />

            </SmoothScroll>
        </>

    );
}
