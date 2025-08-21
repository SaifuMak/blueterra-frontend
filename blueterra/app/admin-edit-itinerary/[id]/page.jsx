'use client'
import { useParams } from 'next/navigation';
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
import DestinationHighlights from "@/components/admin/Itinerary/DestinationHighlights";
import SignatureHighlights from "@/components/admin/Itinerary/SignatureHighlights";
import PackageInclusions from "@/components/admin/Itinerary/PackageInclusions";
import PackageExclusions from "@/components/admin/Itinerary/PackageExclusions";
import MapRoutingSection from "@/components/admin/Itinerary/MapRoutingSection";
import GallerySection from "@/components/admin/Itinerary/GallerySection";
import FeaturedPoints from "@/components/admin/Itinerary/FeaturedPoints";
import LoaderIcon from "@/components/generalComponents/LoaderIcon";


export default function EditItinerary() {

    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'

    const { id } = useParams();

    const containerRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)

    const [title, setTitle] = useState('');
    const [locationTitle, setLocationTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState("#3FD896");
    const [selectedBannerImageFile, setSelectedBannerImageFile] = useState(null);
    const [selectedBannerImageUrl, setSelectedBannerImageUrl] = useState(null);


    const [days, setDays] = useState([{ id: '', title: '', description: '', image: null, image_public_url: '', image_title: '' }]);
    const [hotels, setHotels] = useState([{id: '', title: '', description: '', image: null, image_public_url: '', coordinates: '', location: '', mapLink: '', rating: 5 }]);
    const [destinationHighlights, setDestinationHighlights] = useState([{ title: '' }]);
    const [signatureHighlights, setSignatureHighlights] = useState([{ title: '' }]);
    const [packageInclusions, setPackageInclusions] = useState([{ title: '' }]);
    const [packageExclusions, setPackageExclusions] = useState([{ title: '' }]);
    const [mapRouting, setMapRouting] = useState([{ location: '', coordinates: '', transfer: '' }]);
    const [gallery, setGallery] = useState([{id: '', image: '', title: '', image_public_url: '' }]);
    const [featuredPoints, setFeaturedPoints] = useState([{ suggestedDate: '', price: '', additionalInformation: '' }]);

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [collection, setCollection] = useState("");
    const [category, setCategory] = useState("");


    useEffect(() => {
        if (!id) return;

        const fetchItinerary = async () => {
            try {
                const response = await AXIOS_INSTANCE.get(`itinerary/${id}`);
                const data = response?.data
                console.log(data)
                setTitle(data.title || '');
                setLocationTitle(data.location_title || '');
                setDescription(data.description || '');
                setColor(data.color || "#3FD896");
                setSelectedBannerImageFile(data.banner_image || null);
                setSelectedBannerImageUrl(data.banner_image_public_url || null)

                setDays(data.days || []);
                setHotels(
                    data.hotels?.map(hotel => ({
                        ...hotel,
                        mapLink: hotel.map_link // rename snake_case → camelCase
                    })) || []
                );
                setDestinationHighlights(data.destination_highlights || []);
                setSignatureHighlights(data.signature_highlights || []);
                setPackageInclusions(data.package_inclusions || []);
                setPackageExclusions(data.package_exclusions || []);
                setMapRouting(data.map_routing || []);
                setGallery(data.gallery || []);
                setFeaturedPoints(
                    data.featured_points?.map(point => ({
                        suggestedDate: point.suggested_date,
                        price: point.price,
                        additionalInformation: point.additional_information
                    })) || []
                );

                setDestination(data.destination || "");
                setCountry(data.country || "");
                setCollection(data.collection || "");
                setCategory(data.category || "");

            } catch (error) {
                console.error('Failed to load journal:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItinerary();
    }, [id]);


    const transferOptions = ["Land", "Air"];

    const [openDropdown, setOpenDropdown] = useState(null); // track which one is open

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


    const confirmSaveItinerary = async (formData) => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

        try {
            const response = await AXIOS_INSTANCE.patch(`itinerary/${id}/`, formData)
            toast.success(response.data.message)

        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleSaveItinerary = (e) => {
        // return

        e.preventDefault();
        if (isLoading) return

        const isPublish = e.nativeEvent.submitter.value === "publish";

        console.log(isPublish, 'this is the publish status -------------');



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

        setIsLoading(true)
        const formData = new FormData();
        formData.delete("is_published");

        formData.append("title", title);
        formData.append("location_title", locationTitle);
        formData.append("description", description);
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
            formData.append(`days[${index}][id]`, day.id);
            formData.append(`days[${index}][title]`, day.title);
            formData.append(`days[${index}][description]`, day.description);

            if (day.image) {
                formData.append(`days[${index}][image]`, day.image); // file stays intact
            }

            formData.append(`days[${index}][image_title]`, day.image_title);
        });


        hotels.forEach((hotel, index) => {
            formData.append(`hotels[${index}][id]`, hotel.id);
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
            formData.append(`gallery[${index}][id]`, item.id);
            formData.append(`gallery[${index}][title]`, item.title);
        });
     
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        confirmSaveItinerary(formData)
        // setIsLoading(false)

        // alert('posted')
    }

    if (isLoading) return (
        <div className=" w-full h-screen flex-center  bg-slate-50">
           <LoaderIcon className=' animate-spin text-dark-blue text-3xl'/>
        </div>
    )


    return (

        <div className={`h-screen w-full ${rubik.className}`}>

            <Navbar />
            <form
                onSubmit={handleSaveItinerary}
                className="w-full "
            >
                <div className=" w-full h-full  flex">

                    {/* sidebar */}
                    <Sidebar />

                    <div className=" flex-1 relative    ml-4  mr-8  p-10 rounded-xl bg-admin-light-dark-background w-full flex justify-center overflow-y-scroll h-[97vh] z-50">

                        <div className=" flex space-x-3 max-xl:text-sm text-white  absolute   right-5 top-5">

                            <button type="submit" name="action"
                                value="publish" className=" bg-[#129366] min-w-28 h-fit  py-2 flex-center rounded-sm  ">{isLoading ? <LoaderIcon className='animate-spin text-2xl ' /> : 'Save'}</button>
                        </div>

                        <div className="flex flex-col w-full  space-y-10">

                            <BannerSection
                                textAreaStyle={textAreaStyle}
                                title={title}
                                setTitle={setTitle}
                                locationTitle={locationTitle}
                                setLocationTitle={setLocationTitle}
                                description={description}
                                setDescription={setDescription}
                                color={color}
                                setColor={setColor}
                                selectedImageFile={selectedBannerImageFile}
                                setSelectedImageFile={setSelectedBannerImageFile}
                                selectedBannerImageUrl={selectedBannerImageUrl}
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
                                            options={destinations}
                                            placeholder="Select Destination"
                                            isOpen={openDropdown === "destination"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "destination" : null)}
                                        />

                                        <Dropdown
                                            value={country}
                                            onChange={setCountry}
                                            options={countries}
                                            placeholder="Select Country"
                                            isOpen={openDropdown === "country"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "country" : null)}
                                        />

                                        <Dropdown
                                            value={collection}
                                            onChange={setCollection}
                                            options={collections}
                                            placeholder="Select Collection"
                                            isOpen={openDropdown === "collection"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "collection" : null)}
                                        />

                                        <Dropdown
                                            value={category}
                                            onChange={setCategory}
                                            options={categories}
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
                                    <button type="submit" name="action"
                                        value="publish" className=" bg-[#129366] min-w-28 h-fit  py-2 flex-center rounded-sm  ">{isLoading ? <LoaderIcon className='animate-spin text-2xl ' /> : 'Save'}</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}