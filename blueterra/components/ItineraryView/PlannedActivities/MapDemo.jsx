'use client'

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";


// L.Marker.prototype.options.icon = L.icon({
//     iconUrl: markerIconPng,
//     shadowUrl: markerShadowPng,
//     shadowSize: [41, 41]
// });


L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});


const HotelIcon = new L.Icon({
    iconUrl: '/Icons/bed.svg',
    iconSize: [35, 51],
    iconAnchor: [22, 21],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});


const locations = [
    { coords: [-1.2717, 36.8089], title: 'Nairobi City', routeType: 'land' },
    { coords: [-1.3308, 36.9253], title: 'Jomo Kenyatta International Airport', routeType: 'flight' },
    { coords: [-2.6829, 37.1825], title: 'Amboseli National Park', routeType: 'flight' },
    { coords: [0.2528, 37.3889], title: 'Lewa Conservancy', routeType: 'flight' },
    { coords: [-1.2484, 35.0119], title: 'Masai Mara Reserve', routeType: 'land' }
];


const hotels = [
    { coords: [-1.2717, 36.8089], title: 'Villa Rosa Kempinski' },
    { coords: [-2.6829, 37.1825], title: 'Elewana Tortilis Camp' },
    { coords: [0.2528, 37.3889], title: 'Lewa Safari Camp by Elewana' },
    { coords: [-1.2484, 35.0119], title: 'Beyond Bateleur Camp' }
];


function FitBoundsOnLoad({ routes }) {
    const map = useMap();

    useEffect(() => {
        // Use all location coords + all route coords for bounds
        let allCoords = locations.map(l => l.coords);
        routes.forEach(r => {
            allCoords = allCoords.concat(r.coords);
        });

        const bounds = L.latLngBounds(allCoords);

        // Delay to ensure the map has calculated its size
        const timeout = setTimeout(() => {
            map.fitBounds(bounds, { padding: [50, 50] });
        }, 200);

        return () => clearTimeout(timeout);
    }, [map, routes]);

    return null;
}




function ResizeHandler({ expandCards }) {
    const map = useMap();


    useEffect(() => {

        if (expandCards) {
            console.log('map  resize is calling ---------------');
            const timeout = setTimeout(() => {
                map.invalidateSize();
                const bounds = L.latLngBounds(locations.map((l) => l.coords));
                map.flyToBounds(bounds, {
                    padding: [50, 50],   // space around bounds
                    maxZoom: 10,         // optional: don't zoom in too far
                    duration: 0.6        // in seconds (default is around 1.0)
                });
            }, 800); // Delay ensures DOM transition is complete
            return () => clearTimeout(timeout);
        }

    }, [expandCards]);

    return null;
}



export default function MapDemo({ expandCards }) {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        async function fetchRoutes() {
            let routeSegments = [];

            for (let i = 0; i < locations.length - 1; i++) {
                const start = locations[i];
                const end = locations[i + 1];

                if (end.routeType === "flight") {
                    // Flight: straight dashed line
                    routeSegments.push({
                        coords: [start.coords, end.coords],
                        type: "flight"
                    });
                } else {
                    // Land: get OSRM route
                    const coordString = `${start.coords[1]},${start.coords[0]};${end.coords[1]},${end.coords[0]}`;
                    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

                    try {
                        const res = await fetch(url);
                        const data = await res.json();
                        if (data.routes && data.routes.length > 0) {
                            const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                            routeSegments.push({
                                coords,
                                type: "land"
                            });
                        }
                    } catch (err) {
                        console.error("Error fetching route:", err);
                    }
                }
            }

            setRoutes(routeSegments);
        }

        fetchRoutes();
    }, []);

    const bounds = L.latLngBounds(locations.map(l => l.coords));



    return (
        <div style={{ height: "100%", width: "100%" }}>

            {/* <div style='w-full h-full'>  */}

            <MapContainer
                center={[0, 0]}
                zoom={8}
                // scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Draw routes */}
                {routes.map((r, idx) => (
                    <Polyline
                        key={idx}
                        positions={r.coords}
                        pathOptions={
                            r.type === "flight"
                                ? { color: "#026E9E", dashArray: "6, 6", weight: 3 }
                                : { color: "#026E9E", weight: 3 }
                        }
                    />
                ))}

                {/* Markers */}
                {locations.map((loc, idx) => (
                    <Marker key={idx}
                        position={loc.coords}

                        eventHandlers={{
                            mouseover: (e) => e.target.openPopup(),
                            mouseout: (e) => e.target.closePopup()
                        }}
                    >
                        <Popup>
                            <strong>{loc.title}</strong>
                            <br />
                            {/* Route Type: {loc.routeType} */}
                        </Popup>
                    </Marker>
                ))}

                {hotels.map((hotel, idx) => (
                    <Marker
                        key={`hotel-${idx}`}
                        position={hotel.coords}
                        icon={HotelIcon}
                        eventHandlers={{
                            mouseover: (e) => e.target.openPopup(),
                            mouseout: (e) => e.target.closePopup()
                        }}
                    >
                        <Popup>
                            🏨 <strong>{hotel.title}</strong>
                        </Popup>
                    </Marker>
                ))}

                <ResizeHandler expandCards={expandCards} />


            </MapContainer>
        </div>
    );
}
