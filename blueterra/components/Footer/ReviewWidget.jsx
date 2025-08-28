'use client'
import { useEffect } from "react";

const ReviewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://grwapi.net/widget.min.js";
    script.async = true;

    // Attach onload handler to explicitly initialize the widget
    script.onload = () => {
      // If global initialization function is available, call it
      if (window.GrwWidgetLoader) {
        window.GrwWidgetLoader();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="review-widget_net w-fit -ml-3"
      data-uuid="9fb7e6df-3f62-44bf-ad76-51792094115b"
      data-template="2"
      data-lang="en"
      data-theme="dark"
    ></div>
  );
};

export default ReviewWidget;
