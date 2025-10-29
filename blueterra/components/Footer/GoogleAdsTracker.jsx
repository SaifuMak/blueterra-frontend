'use client'
import { useEffect } from "react";

const GoogleAdsTracker = () => {
  useEffect(() => {
    // --- Load the Google Ads script ---
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=AW-17291576293`;
    document.head.appendChild(script);

    // --- Initialize gtag() after script loads ---
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17291576293');
    `;
    document.head.appendChild(inlineScript);

    // Cleanup on unmount (optional)
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inlineScript);
    };
  }, []);

  return null;
};

export default GoogleAdsTracker;
