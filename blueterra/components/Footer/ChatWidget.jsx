'use client'
import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Initialize Zoho global object safely
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function() {} };

    // Create the script tag
    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.src = "https://salesiq.zohopublic.com/widget?wc=siq0cdb2a459ac8b9f826e8426e01df57a8e55238d4383d869c273cb8d21dd96958";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // cleanup: remove script and widget if needed
      const existing = document.getElementById("zsiqscript");
      if (existing) existing.remove();
    };
  }, []);

  return null; // it just injects the script
};

export default ChatWidget;
