// app/not-found.tsx
import Image from "next/image";
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-[200px] relative h-[65px] shrink-0 mb-5 -ml-4  ">

                <Image
                    src="/images/general/logo.png"
                    alt="logo"
                    fill
                    className="object-contain" // 
                    quality={100}
                />

            </div>
            <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
            <p className="mt-4 text-gray-600">Sorry, the page you are looking for doesn't exist.</p>
            <a href="/" className="mt-6 underline">
                Go back home
            </a>
        </div>
    );
}
