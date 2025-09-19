'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useEffect } from "react";
import { rubik } from '@/app/fonts'
import Dropdown from "@/components/admin/Itinerary/DropDown";
import { toast } from 'sonner';
import AXIOS_INSTANCE from "@/lib/axios";
import { destinations, countries, collections, categories } from '@/components/datas/FilterOptions'
import { useRef } from "react";
import BannerSection from "@/components/admin/Itinerary/BannerSection";
import DaysSection from "@/components/admin/Itinerary/DaysSection";
import HotelsSection from "@/components/admin/Itinerary/HotelsSection";
import LocationsSection from "@/components/admin/Itinerary/LocationsSection";
import DestinationHighlights from "@/components/admin/Itinerary/DestinationHighlights";
import SignatureHighlights from "@/components/admin/Itinerary/SignatureHighlights";
import PackageInclusions from "@/components/admin/Itinerary/PackageInclusions";
import PackageExclusions from "@/components/admin/Itinerary/PackageExclusions";
import MapRoutingSection from "@/components/admin/Itinerary/MapRoutingSection";
import GallerySection from "@/components/admin/Itinerary/GallerySection";
import FeaturedPoints from "@/components/admin/Itinerary/FeaturedPoints";
import LoaderIcon from "@/components/generalComponents/LoaderIcon";

export default function CreateItinerary() {

    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'


    const containerRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [locationTitle, setLocationTitle] = useState('')
    const [generalRating, setGeneralRating] = useState(5)


    const [description, setDescription] = useState('')

    const [color, setColor] = useState("#3FD896");
    const [selectedBannerImageFile, setSelectedBannerImageFile] = useState(null);

    const [days, setDays] = useState([{ title: '', description: '', coordinates: '', image: null, image_title: '' }]);
    const [hotels, setHotels] = useState([{ title: '', description: '', image: null, coordinates: '', location: '', mapLink: '', rating: 5 }]);

    const [destinationHighlights, setDestinationHighlights] = useState([{ title: '' }]);
    const [signatureHighlights, setSignatureHighlights] = useState([{ title: '' }]);
    const [packageInclusions, setPackageInclusions] = useState([{ title: '' }]);
    const [packageExclusions, setPackageExclusions] = useState([{ title: '' }]);

    const [mapRouting, setMapRouting] = useState([{ location: '', coordinates: '', transfer: '' }, { location: '', coordinates: '', transfer: '' }]);
    const [gallery, setGallery] = useState([{ image: '', title: '', is_checked: false }]);
    const [featuredPoints, setFeaturedPoints] = useState([{ suggestedDate: '', price: '', additionalInformation: '' }])

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [collection, setCollection] = useState("");
    const [category, setCategory] = useState("");

    const transferOptions = ["Land", "Air", "Water"];

    const [openDropdown, setOpenDropdown] = useState(null); // track which one is open

    const handleReset = () => {
        setTitle('');
        setSlug('')
        setLocationTitle('');
        setDescription('');
        setColor('#3FD896');
        setSelectedBannerImageFile(null);

        setDays([{ title: '', description: '', image: null, image_title: '' }]);
        setHotels([{ title: '', description: '', image: null, coordinates: '', location: '', mapLink: '', rating: 5 }]);

        setDestinationHighlights([{ title: '' }]);
        setSignatureHighlights([{ title: '' }]);
        setPackageInclusions([{ title: '' }]);
        setPackageExclusions([{ title: '' }]);

        setMapRouting([{ location: '', coordinates: '', transfer: '' }, { location: '', coordinates: '', transfer: '' }]);
        setGallery([{ image: '', title: '' }]);
        setFeaturedPoints([{ suggestedDate: '', price: '', additionalInformation: '' }]);

        setDestination('');
        setCountry('');
        setCollection('');
        setCategory('');
    };



    const handleReorder = (index, action, arrayOfElements, setElements) => {

        if (arrayOfElements.length === 1) return
        if (index === 0 && action === 'up') return
        if (index === arrayOfElements.length - 1 && action === 'down') return

        const newArray = [...arrayOfElements];
        if (action === 'up') {
            [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
        }
        else if (action === 'down') {
            [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
        }

        setElements(newArray);
    }


    const confirmAddItinerary = async (formData) => {
        toast.dismiss()
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

        try {
            const response = await AXIOS_INSTANCE.post(`create-itinerary/`, formData)
            toast.success(response.data.message)
            handleReset()

        }
        catch (e) {
            e?.response?.data?.error ? toast.error(e?.response?.data?.error) : toast.error('something went wrong')

        }
        finally {
            setIsLoading(false)
        }
    }


    const handleAddItinerary = (e) => {

        e.preventDefault();
        if (isLoading) return

        const isPublish = e.nativeEvent.submitter.value === "publish";

        // if the status is draft  make the min requirement for title 
        if (!isPublish && title.trim() === '') {
            toast.error("Title is mandatory. Please fill it.");
            return
        }

        // validate data only when the status is publised
        if (isPublish) {

            if (!selectedBannerImageFile) {
                toast.error("Banner image is not uploaded!");
                return;
            }

            for (let i = 0; i < days.length; i++) {
                if (!days[i].image) {
                    toast.error(`Image not uploaded for Day ${i + 1}`);
                    return;
                }
            }

            for (let i = 0; i < hotels.length; i++) {
                if (!hotels[i].image) {
                    toast.error(`Image not uploaded for Hotel ${i + 1}`);
                    return;
                }
            }

            for (let i = 0; i < mapRouting.length; i++) {
                if (!mapRouting[i].transfer && i !== mapRouting.length - 1) {
                    toast.error(`Transfer is missing in Map Routing ${i + 1}`);
                    return;
                }
            }

            if (!destination || !country || !collection || !category) {
                toast.error("Filter is not applied");
                return;
            }

            for (let i = 0; i < gallery.length; i++) {
                if (!gallery[i].image) {
                    toast.error(`Image not uploaded in Gallery ${i + 1}`);
                    return;
                }
            }

            const checkedCount = gallery.filter((item) => item.is_checked).length;
            if (checkedCount === 0) {
                toast.error(`Select at least one gallery image to display in card`);
                return
            }
        }


        setIsLoading(true)
        const formData = new FormData();
        formData.delete("is_published");

        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("location_title", locationTitle);
        formData.append("description", description);
        formData.append("generalRating", generalRating);
        formData.append("color", color);
        formData.append("destination", destination);
        formData.append("country", country);
        formData.append("collection", collection);
        formData.append("category", category);
        formData.append("is_published", isPublish ? "true" : "false")

        // banner image
        if (selectedBannerImageFile) {
            formData.append("banner_image", selectedBannerImageFile);
        }

        formData.append("destination_highlights", JSON.stringify(destinationHighlights));
        formData.append("signature_highlights", JSON.stringify(signatureHighlights));
        formData.append("package_inclusions", JSON.stringify(packageInclusions));
        formData.append("package_exclusions", JSON.stringify(packageExclusions));
        formData.append("map_routing", JSON.stringify(mapRouting));
        formData.append("featured_points", JSON.stringify(featuredPoints));

        days.forEach((day, index) => {
            formData.append(`days[${index}][title]`, day.title);
            formData.append(`days[${index}][description]`, day.description);
            formData.append(`days[${index}][coordinates]`, day.coordinates);

            if (day.image) {
                formData.append(`days[${index}][image]`, day.image); // file stays intact
            }

            formData.append(`days[${index}][image_title]`, day.image_title);
        });

        hotels.forEach((hotel, index) => {
            formData.append(`hotels[${index}][title]`, hotel.title);
            formData.append(`hotels[${index}][description]`, hotel.description);
            formData.append(`hotels[${index}][image]`, hotel.image);
            formData.append(`hotels[${index}][coordinates]`, hotel.coordinates);
            formData.append(`hotels[${index}][location]`, hotel.location);
            formData.append(`hotels[${index}][mapLink]`, hotel.mapLink);
            formData.append(`hotels[${index}][rating]`, hotel.rating);
        });


        // gallery needs file + title
        gallery.forEach((item, index) => {
            if (item.image) {
                formData.append(`gallery[${index}][image]`, item.image);
            }
            formData.append(`gallery[${index}][title]`, item.title);
            // formData.append(`gallery[${index}][isChecked]`, item.isChecked);
            formData.append(`gallery[${index}][is_checked]`, item.is_checked ? 1 : 0);

        });

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        confirmAddItinerary(formData)
        // alert('posted')
    }


    const [filtersList, setFiltersList] = useState(null)

    const fetchFilters = async () => {
        try {
            const response = await AXIOS_INSTANCE.get(`filters-list/`);
            const data = response?.data
            setFiltersList(response?.data)

        } catch (error) {
            console.error('Failed to load journal:', error);
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchFilters()
    }, [])

    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    // when destination changes → filter countries + reset country
    useEffect(() => {
        if (!filtersList) return;

        setFilteredCountries(
            destination
                ? filtersList.countries.filter(c => c.destination?.title === destination)
                : filtersList.countries
        );

        setCountry(""); // reset only country
    }, [destination]);

    // when collection changes → filter categories + reset category
    useEffect(() => {
        if (!filtersList) return;

        setFilteredCategories(
            collection
                ? filtersList.categories.filter(cat => cat.collection?.title === collection)
                : filtersList.categories
        );

        setCategory(""); // reset only category
    }, [collection]);


    return (

        <div className={`h-screen w-full ${rubik.className}`}>

            <Navbar />
            <form
                onSubmit={handleAddItinerary}
                className="w-full "
            >
                <div className=" w-full h-full  flex">

                    {/* sidebar */}
                    <Sidebar />

                    <div className=" flex-1 relative    ml-4  mr-8  p-10 rounded-xl bg-admin-light-dark-background w-full flex justify-center overflow-y-scroll h-[97vh] z-50">

                        <div className=" flex space-x-3 max-xl:text-sm text-white  absolute   right-5 top-5">
                            <button type="submit" formNoValidate name="action"
                                value="draft" className=" bg-[#524D4D] cursor-pointer  w-28 h-fit  py-2 flex-center  rounded-sm">{isLoading ? <LoaderIcon className='animate-spin text-2xl ' /> : 'Save Draft'}</button>
                            <button type="submit" name="action"
                                value="publish" className=" bg-[#129366] cursor-pointer min-w-28 h-fit  py-2 flex-center rounded-sm  ">{isLoading ? <LoaderIcon className='animate-spin text-2xl ' /> : 'Publish'}</button>
                        </div>

                        <div className="flex flex-col w-full  space-y-10">

                            <BannerSection
                                textAreaStyle={textAreaStyle}
                                title={title}
                                slug={slug}
                                setSlug={setSlug}
                                setTitle={setTitle}
                                locationTitle={locationTitle}
                                setLocationTitle={setLocationTitle}
                                description={description}
                                setDescription={setDescription}
                                color={color}
                                setColor={setColor}
                                selectedImageFile={selectedBannerImageFile}
                                setSelectedImageFile={setSelectedBannerImageFile}
                                generalRating={generalRating}
                                setGeneralRating={setGeneralRating}
                            />

                            <DaysSection
                                textAreaStyle={textAreaStyle}
                                inputStyle={inputStyle}
                                days={days}
                                setDays={setDays}
                                handleReorder={handleReorder}
                            />

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <HotelsSection
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    hotels={hotels}
                                    setHotels={setHotels}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <DestinationHighlights
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    destinationHighlights={destinationHighlights}
                                    setDestinationHighlights={setDestinationHighlights}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <SignatureHighlights
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    signatureHighlights={signatureHighlights}
                                    setSignatureHighlights={setSignatureHighlights}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <MapRoutingSection
                                    handleReorder={handleReorder}
                                    transferOptions={transferOptions}
                                    mapRouting={mapRouting}
                                    setMapRouting={setMapRouting}
                                    inputStyle={inputStyle}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <PackageInclusions
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    packageInclusions={packageInclusions}
                                    setPackageInclusions={setPackageInclusions}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <PackageExclusions
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    packageExclusions={packageExclusions}
                                    setPackageExclusions={setPackageExclusions}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <FeaturedPoints
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    featuredPoints={featuredPoints}
                                    setFeaturedPoints={setFeaturedPoints}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <div className=" w-11/12">
                                    <h2 className="text-xl text-dark-blue font-medium">Post in:</h2>
                                    <div className="flex mt-5  gap-8">
                                        <Dropdown
                                            value={destination}
                                            onChange={setDestination}
                                            options={filtersList?.destinations}
                                            placeholder="Select Destination"
                                            isOpen={openDropdown === "destination"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "destination" : null)}
                                        />

                                        <Dropdown
                                            value={country}
                                            onChange={setCountry}
                                            options={filteredCountries}
                                            placeholder="Select Country"
                                            isOpen={openDropdown === "country"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "country" : null)}
                                        />

                                        <Dropdown
                                            value={collection}
                                            onChange={setCollection}
                                            options={filtersList?.collections}
                                            placeholder="Select Collection"
                                            isOpen={openDropdown === "collection"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "collection" : null)}
                                        />

                                        <Dropdown
                                            value={category}
                                            onChange={setCategory}
                                            options={filteredCategories}
                                            placeholder="Select Category"
                                            isOpen={openDropdown === "category"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "category" : null)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <GallerySection
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    gallery={gallery}
                                    setGallery={setGallery} />
                            </div>


                            <div className=" py-10">
                                <div className=" flex space-x-3 max-xl:text-sm text-white">
                                    <button type="submit" formNoValidate name="action"
                                        value="draft" className=" bg-[#524D4D]  cursor-pointer  w-28 h-fit  py-2 flex-center  rounded-sm">{isLoading ? <LoaderIcon className='animate-spin text-2xl ' /> : 'Save Draft'}</button>
                                    <button type="submit" name="action"
                                        value="publish" className=" bg-[#129366] cursor-pointer  min-w-28 h-fit  py-2 flex-center rounded-sm  ">{isLoading ? <LoaderIcon className='animate-spin text-2xl ' /> : 'Publish'}</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

