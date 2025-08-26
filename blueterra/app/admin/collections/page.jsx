
'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useRef } from "react";



export default function Collections() {


    const [bannerImage, setBannerImage] = useState(null);
    const [iconImage, setIconImage] = useState(null);
    const [title, setTitle] = useState("");

    const bannerInputRef = useRef(null);
    const iconInputRef = useRef(null);


    const handleBannerChange = (e) => {
        setBannerImage(e.target.files[0]);
    };

    const handleIconChange = (e) => {
        setIconImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        if (bannerImage) formData.append("banner_image", bannerImage);
        if (iconImage) formData.append("icon_image", iconImage);
        return

        try {
            const response = await fetch("http://127.0.0.1:8000/api/collections/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Collection added successfully!");
                setTitle("");
                setBannerImage(null);
                setIconImage(null);
            } else {
                alert("Error adding collection");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };


    return (
        <div className="   h-screen w-full ">

            <Navbar />

            <div className="w-full h-full flex">
                {/* sidebar */}
                <Sidebar />

                <div className="flex-1 ml-4 mr-8 mb-0 rounded-xl bg-[#F7FBFD] w-full flex h-[97vh] z-50">
                    {/* Left Column (Form) */}
                    <div className="w-1/3 p-6 mt-10">


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 bg-white p-6 rounded-lg shadow"
                        >
                            {/* Title */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Add New Collection</h2>
                                <label className="block  font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring focus:ring-sky-200"
                                    required
                                />
                            </div>

                            {/* Banner Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Banner Image
                                </label>
                                <button
                                    type="button"
                                    onClick={() => bannerInputRef.current.click()}
                                    className=" px-2 py-0.5  border cursor-pointer border-black/60  text-sm text-dark-28 transition"
                                >
                                   Browse
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={bannerInputRef}
                                    onChange={handleBannerChange}
                                    className="hidden"
                                />
                                {bannerImage && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Selected: {bannerImage.name}
                                    </p>
                                )}
                            </div>

                            {/* Icon Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Icon Image
                                </label>
                                <button
                                    type="button"
                                    onClick={() => iconInputRef.current.click()}
                                    className=" px-2 py-0.5  border cursor-pointer border-black/60  text-sm text-dark-28 transition"
                                >
                                   Browse
                                </button>
                               
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={iconInputRef}
                                    onChange={handleIconChange}
                                    className="hidden"
                                />
                                {iconImage && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Selected: {iconImage.name}
                                    </p>
                                )}
                            </div>
                            {/* Submit */}
                            <button
                                type="submit"
                                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Right Column (Blank for now) */}
                    <div className="w-2/3 p-6"></div>
                </div>
            </div>
        </div>
    )
}