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

export default function LeafletMaps() {
  return (
    <div className="w-full h-[900px]">
      <MapContainer
        center={[10.5276, 76.2144]}
        zoom={8}
        scrollWheelZoom={true}
        className="h-full w-full z-0 rounded-lg"
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

        <RouteLine />
      </MapContainer>
    </div>
  );
}
