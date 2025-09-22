'use client'
import BannerSection from "../cruise/BannerSection"
import FeaturedDeals from "../cruise/FeaturedDeals"
import Navbar from "../Navbar/page"
import SmoothScroll from "../SmoothScroll"
import DestinationsSection from "../cruise/DestinationsSection"
import WhyCruise from "../cruise/WhyCruiseSection"
import PackageSection from "../cruise/PackageSection"
import CruiseLineSection from "../cruise/CruiseLineSection"
import ContactSection from "../cruise/ContactSection"
import Footer from "../Footer/page"

export default function CruiseClient() {

    return (
        <SmoothScroll>
            <Navbar />
            <BannerSection />
            {/* <FeaturedDeals /> */}
            <DestinationsSection />
            <WhyCruise />
            <PackageSection />
            <CruiseLineSection />
            <ContactSection />
            <Footer />
        </SmoothScroll>
    )
}