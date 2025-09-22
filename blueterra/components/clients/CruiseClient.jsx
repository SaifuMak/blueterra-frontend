'use client'
import BannerSection from "../cruise/BannerSection"
import FeaturedDeals from "../cruise/FeaturedDeals"
import Navbar from "../Navbar/page"
import SmoothScroll from "../SmoothScroll"
import DestinationsSection from "../cruise/DestinationsSection"
import WhyCruise from "../cruise/WhyCruiseSection"
import PackageSection from "../cruise/PackageSection"

export default function CruiseClient() {
    return (
        <SmoothScroll>
            <Navbar />
            <BannerSection />
            {/* <FeaturedDeals /> */}
            <DestinationsSection/>
            <WhyCruise/>
            <PackageSection/>
        </SmoothScroll>
    )
}