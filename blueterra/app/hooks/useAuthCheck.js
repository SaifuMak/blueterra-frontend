"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AXIOS_INSTANCE from "@/lib/axios"; // your axios instance

export default function useAuthCheck() {
    const [isAuthenticating, setIsAuthenticating] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await AXIOS_INSTANCE.get("check/"); // API to verify auth
                setIsAuthenticated(true)
            } catch (error) {
                console.log("Auth check failed:", error?.response?.status);
                router.push("/login"); // redirect if not authenticated
            } finally {
                setIsAuthenticating(false);
            }
        };

        checkAuth();
    }, [router]);

    return {isAuthenticated, isAuthenticating };
}
