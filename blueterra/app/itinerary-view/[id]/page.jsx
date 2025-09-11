import React from "react"
import AXIOS_INSTANCE from "@/lib/axios";
import ItineraryViewClient from "@/components/clients/ItineraryViewClient";


export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const response = await AXIOS_INSTANCE.get(`itinerary-meta-details/${id}`, {
            cache: "no-store", // prevent stale SEO
        });

        if (!response?.data) {
            return {
                title: "Itinerary Not Found",
                description: "This Itinerary could not be found.",
            };
        }
        const Itinerary = response?.data

        return {
            title: Itinerary.title || Itinerary.title,
            description: Itinerary.description || Itinerary.description?.slice(0, 150),
            openGraph: {
                title: Itinerary.title || Itinerary.title,
                description: Itinerary.description,
                images: [Itinerary.banner_image_public_url || Itinerary.banner_image_public_url],
            },
            twitter: {
                card: "summary_large_image",
                title: Itinerary.title || Itinerary.title,
                description: Itinerary.description,
                images: [Itinerary.banner_image_public_url || Itinerary.banner_image_public_url],
            },
        };
    } catch (error) {
        console.log(error);

        return {
            title: "Error Loading Itinerary",
            description: "There was an issue loading this Itinerary.",
        };
    }
}

export default async function ItineraryView({ params }) {

    const { id } = await params;

    if (!id) {
        return (
            <div className="  h-screen w-full">Loading</div>
        )
    }

    return (

        <ItineraryViewClient id={id} />
    )
}

