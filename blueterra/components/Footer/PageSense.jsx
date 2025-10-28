'use client'
import { useEffect } from "react";

const PageSense = () => {
  useEffect(() => {
    // Create and append the Zoho PageSense script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.pagesense.io/js/blueterra/c777037325be46e29f32d38354dda1e1.js";

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    return () => {
      // Cleanup: remove script if necessary
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null; // nothing to render
};

export default PageSense;
