'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
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
    { coords: [-2.7330, 37.3751], title: 'Kibo Safari Camp' },
    { coords: [-0.8025, 36.3988], title: 'Sawela Lodge' },
    { coords: [-1.4149, 35.2216], title: 'Mara Maisha Camp' },
    { coords: [-1.4149, 35.2218], title: 'Ashnil Mara Camp' },
    { coords: [-1.2571, 36.8006], title: 'Novotel Nairobi Westlands' }
];



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
                    <Marker key={idx}
                        position={loc.coords}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.openPopup();
                            },
                            mouseout: (e) => {
                                e.target.closePopup();
                            },
                        }}
                    >
                        <Popup>
                            <strong>{loc.title}</strong>
                        </Popup>
                    </Marker>
                ))}
                <Polyline
                    positions={locations.map(loc => loc.coords)}
                    pathOptions={{ color: '#026E9E', weight: 3, dashArray: '10,10' }}
                />

                <ResizeHandler expandCards={expandCards} />

                {/* <RouteLine /> */}
            </MapContainer>
        </div>
    );
}
