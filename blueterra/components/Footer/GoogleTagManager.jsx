'use client';
import { useEffect } from "react";

const GoogleTagManager = () => {
  useEffect(() => {
    // --- Create the GTM script tag ---
    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PFVVBBR5');
    `;
    document.head.appendChild(gtmScript);

    // --- Add the <noscript> fallback ---
    const gtmNoScript = document.createElement("noscript");
    gtmNoScript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFVVBBR5"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.prepend(gtmNoScript);

    // --- Cleanup on unmount (optional) ---
    return () => {
      if (document.head.contains(gtmScript)) document.head.removeChild(gtmScript);
      if (document.body.contains(gtmNoScript)) document.body.removeChild(gtmNoScript);
    };
  }, []);

  return null;
};

export default GoogleTagManager;
