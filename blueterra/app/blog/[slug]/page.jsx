import React from "react"
import BlogSingleClient from "@/components/clients/BlogSingleClient";
import AXIOS_INSTANCE from "@/lib/axios";


export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const response = await AXIOS_INSTANCE.get(`blog/${slug}`, {
            cache: "no-store", // prevent stale SEO
        });


        if (!response?.data) {
            return {
                title: "Blog Not Found",
                description: "This blog could not be found.",
            };
        }
        const blog = response?.data




        return {
            title: blog.meta_title || blog.title,
            description: blog.meta_description || blog.blog_content?.slice(0, 150),
            openGraph: {
                title: blog.meta_title || blog.title,
                description: blog.meta_description,
                images: [blog.preview_image || blog.image_public_url],
            },
            twitter: {
                card: "summary_large_image",
                title: blog.meta_title || blog.title,
                description: blog.meta_description,
                images: [blog.preview_image || blog.image_public_url],
            },
        };
    } catch (error) {
        console.log(error);

        return {
            title: "Error Loading Blog",
            description: "There was an issue loading this blog.",
        };
    }
}

export default async function Blog({ params }) {

    const { slug } = await params;

    if (!slug) {
        return (
            <div className="  h-screen w-full">Loading</div>
        )
    }

    return (

        <BlogSingleClient slug={slug} />
    )
}

