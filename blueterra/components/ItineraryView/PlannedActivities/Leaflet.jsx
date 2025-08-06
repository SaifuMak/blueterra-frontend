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


const HotelIcon = new L.Icon({
    iconUrl: '/Icons/bed.svg',
    // iconUrl: '/Icons/hotel.svg',
    // iconUrl: '/Icons/bed-red.svg',
    iconSize: [35, 51],
    iconAnchor: [12, 21],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const locations = [
    { coords: [-1.2717, 36.8089], title: 'Nairobi City', routeType: 'land' }, // To airport
    { coords: [-1.3308, 36.9253], title: 'Jomo Kenyatta International Airport', routeType: 'flight' }, // To Amboseli
    { coords: [-2.6829, 37.1825], title: 'Amboseli National Park', routeType: 'flight' }, // To Lewa
    { coords: [0.2528, 37.3889], title: 'Lewa Conservancy', routeType: 'flight' }, // To Masai Mara
    { coords: [-1.2484, 35.0119], title: 'Masai Mara Reserve', routeType: 'land' }
];


const hotels = [
    { coords: [-1.2717, 36.8089], title: 'Villa Rosa Kempinski' },
    { coords: [-2.6829, 37.1825], title: 'Elewana Tortilis Camp' },
    { coords: [0.2528, 37.3889], title: 'Lewa Safari Camp by Elewana' },
    { coords: [-1.2484, 35.0119], title: 'Beyond Bateleur Camp' }
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


                {/* Hotel markers */}
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

                {/* <Polyline
                    positions={locations.map(loc => loc.coords)}
                    pathOptions={{ color: '#026E9E', weight: 3, dashArray: '10,10' }}
                /> */}

                {locations.slice(1).map((loc, idx) => {
                    const from = locations[idx].coords;
                    const to = loc.coords;
                    const isFlight = loc.routeType === 'flight';

                    return (
                        <Polyline
                            key={`route-${idx}`}
                            positions={[from, to]}
                            pathOptions={{
                                color: isFlight ? '#026E9E' : '#026E9E',
                                weight: 3,
                                dashArray: isFlight ? '10,10' : null
                            }}
                        />
                    );
                })}


                <ResizeHandler expandCards={expandCards} />

                {/* <RouteLine /> */}
            </MapContainer>
        </div>
    );
}
