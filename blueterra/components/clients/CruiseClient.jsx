'use client'
import BannerSection from "../cruise/BannerSection"
import Navbar from "../Navbar/page"
import SmoothScroll from "../SmoothScroll"
import DestinationsSection from "../cruise/DestinationsSection"
import WhyCruise from "../cruise/WhyCruiseSection"
import PackageSection from "../cruise/PackageSection"
import CruiseLineSection from "../cruise/CruiseLineSection"
import ContactSection from "../cruise/ContactSection"
import Footer from "../Footer/page"
import Deals from "../cruise/Deals"
import DealsMediumDevices from "../cruise/DealsMediumDevices"
import DealsMobileDevices from "../cruise/DealsMobileDevices"
import { useMediaQuery } from 'react-responsive'

export default function CruiseClient() {

    const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });
    const isMediumDevice = useMediaQuery({
        query: "(min-width: 1000px) and (max-width: 1279px)",
    });
    const isLargeDevice = useMediaQuery({ query: "(min-width: 1280px)" });


    return (
        <SmoothScroll>
            <Navbar />
            <BannerSection isMobile={isMobile} />
            {isLargeDevice && <Deals />}
            {isMediumDevice && <DealsMediumDevices />}
            {isMobile && <DealsMobileDevices />}
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