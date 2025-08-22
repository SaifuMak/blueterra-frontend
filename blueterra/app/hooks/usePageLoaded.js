"use client";
import { useEffect, useState } from "react";

export default function usePageLoaded() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsLoaded(true);

        if (document.readyState === "complete") {
            // Page already fully loaded
            setIsLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return isLoaded;
}
