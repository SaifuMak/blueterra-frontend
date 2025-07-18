'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet marker icon in Next.js with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Trip points in Kerala
const locations = [
    { coords: [10.5276, 76.2144], title: 'Start Point - Thrissur' },
    { coords: [10.8505, 76.2711], title: 'Midway - Palakkad' },
    { coords: [11.2588, 75.7804], title: 'End Point - Kozhikode' },
];

// Custom component to fetch & render route
const RouteLine = () => {
    const map = useMap();

    useEffect(() => {
        const coordinates = locations.map((l) => `${l.coords[1]},${l.coords[0]}`); // lng,lat
        const url = `https://router.project-osrm.org/route/v1/driving/${coordinates.join(
            ';'
        )}?overview=full&geometries=geojson`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const geoJson = L.geoJSON(data.routes[0].geometry, {
                    style: { color: 'blue', weight: 4 },
                }).addTo(map);
                map.fitBounds(geoJson.getBounds());
            })
            .catch((err) => console.error('Route fetch error:', err));
    }, [map]);

    return null; // This component only side-effects
};

function ResizeHandler({ expandCards }) {
    const map = useMap();

    useEffect(() => {

        if (expandCards) {
            console.log('map  resize is calling ---------------');
            const timeout = setTimeout(() => {
                map.invalidateSize();
                // const firstMarker = [10.5276, 76.2144];
                // map.flyTo(firstMarker, 10, {
                //     duration: 0.5,
                //     easeLinearity: 0.25,
                // });
                const bounds = L.latLngBounds(locations.map((l) => l.coords));
                map.flyToBounds(bounds, {
                    padding: [50, 50],   // space around bounds
                    maxZoom: 9,         // optional: don't zoom in too far
                    duration: 0.4        // in seconds (default is around 1.0)
                });
            }, 800); // Delay ensures DOM transition is complete
            return () => clearTimeout(timeout);
        }

    }, [expandCards]);

    return null;
}

export default function LeafletMap({ expandCards }) {



    return (
        <div className="w-full h-full ">
            <MapContainer
                center={[10.5276, 76.2144]}
                zoom={8}
                scrollWheelZoom={true}
                className="h-full w-full  z-0 rounded-lg"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />

                {locations.map((loc, idx) => (
                    <Marker key={idx} position={loc.coords}>
                        <Popup>
                            <strong>{loc.title}</strong>
                        </Popup>
                    </Marker>
                ))}
                <ResizeHandler expandCards={expandCards} />

                {/* <RouteLine /> */}
            </MapContainer>
        </div>
    );
}
