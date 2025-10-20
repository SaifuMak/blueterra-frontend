"use client"; 

import { useEffect } from "react";
import '@/app/styles/ovexplore.css'

export default function CruiseSearch() {
    useEffect(() => {
        // Set global config
        window.OVExplore6 = {
            preferences: {
                languageId: "1",
                siteItemId: "1352712",
                sid1: "",
                sid2: "",
                referrer: "",
                showStateNCountryWithPorts: true,
                resultWindowType: "_blank",
                cruiseSearchFields: {
                    basic: ["destination", "sailingdate", "duration", "cruiseline"],
                    advance: [
                        "departureport",
                        "ship",
                        "cruisetypecheckbox",
                        "packagetourscheckbox",
                        "allpackagescheckbox",
                        "includeinternalcruiselinescheckbox",
                        "newwindowcheckbox"
                    ]
                }
            },
            siteSettings: {
                productType: "cruise",
                domain: "cruise.myblueterra.com",
                numberOfCols: 4,
                themeColor: "#0071a9|#fff|#0071a9|#fff"
            },
            cruiseWidgetSettings: {
                widgetType: "single"
            }
        };

        // Dynamically load external script
        const script = document.createElement("script");
        script.src = "https://content.cdn705.com/Content/WebApps/OdyVExplore/OVExplore.min.js";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            // Optional cleanup if needed
            script.remove();
        };
    }, []);

    return (
        <div className=" ">
            <div id="option-six">
                <div>
                    <ody-search-form search-form-settings="OVExplore6"></ody-search-form>
                </div>
            </div>
        </div>
    );
}
