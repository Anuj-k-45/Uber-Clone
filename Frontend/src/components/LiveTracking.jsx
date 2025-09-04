// src/components/LiveTracking.jsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import debounce from "lodash.debounce";

// ✅ Custom marker icons
const userIcon = L.icon({
  iconUrl:
    "https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/current-location-icon.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pickupIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const destinationIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  className: "destination-marker",
});

// ✅ Helper to recenter map dynamically
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      const offsetY = 40; // adjust for panel height (in px)
      const point = map.latLngToContainerPoint(position);
      point.y += offsetY;
      const newLatLng = map.containerPointToLatLng(point);
      map.flyTo(newLatLng, 16, { duration: 0.5 });
    }
  }, [position, map]);
  return null;
}

// ✅ Debounced geocoder (outside component)
const debouncedFetchCoords = debounce(async (place, setter, signal) => {
  if (!place) return;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`,
      {
        headers: {
          "User-Agent": "UberC-App/1.0 (anujkaushal123@gmail.com)", // 👈 put your email here
        },
        signal,
      }
    );
    const data = await res.json();
    if (data[0]) {
      setter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    }
  } catch (err) {
    if (err.name !== "AbortError") console.error("Geocode failed", err);
  }
}, 500);

const LiveTracking = ({ pickup, destination }) => {
  const [userPosition, setUserPosition] = useState([22.5726, 88.3639]);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [mapCenter, setMapCenter] = useState(userPosition);

  // ✅ Get live user location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserPosition([latitude, longitude]);
      setMapCenter([latitude, longitude]);
    });
    const watchId = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserPosition([latitude, longitude]);
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // ✅ Geocode pickup & destination (debounced)
  useEffect(() => {
    const controller = new AbortController();
    if (pickup)
      debouncedFetchCoords(pickup, setPickupCoords, controller.signal);
    if (destination)
      debouncedFetchCoords(
        destination,
        setDestinationCoords,
        controller.signal
      );

    return () => controller.abort();
  }, [pickup, destination]);

  // ✅ Fetch route when both pickup & destination available
  useEffect(() => {
    const fetchRoute = async () => {
      if (!pickupCoords || !destinationCoords) return;
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${pickupCoords[1]},${pickupCoords[0]};${destinationCoords[1]},${destinationCoords[0]}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map((c) => [
            c[1],
            c[0],
          ]);
          setRoute(coords);
        }
      } catch (err) {
        console.error("Failed to fetch route", err);
      }
    };
    fetchRoute();
  }, [pickupCoords, destinationCoords]);

  // ✅ Center on pickup if available
  useEffect(() => {
    if (pickupCoords) {
      setMapCenter(pickupCoords);
    } else if (destinationCoords) {
      setMapCenter(destinationCoords);
    }
  }, [pickupCoords, destinationCoords]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains={["a", "b", "c", "d"]}
      />

      {/* Show user marker if no pickup/destination yet */}
      {!pickupCoords && !destinationCoords && (
        <Marker position={userPosition} icon={userIcon}>
          <Popup>You are here 🚖</Popup>
        </Marker>
      )}

      {pickupCoords && (
        <Marker position={pickupCoords} icon={pickupIcon}>
          <Popup>Pickup: {pickup}</Popup>
        </Marker>
      )}

      {destinationCoords && (
        <Marker position={destinationCoords} icon={destinationIcon}>
          <Popup>Destination: {destination}</Popup>
        </Marker>
      )}

      {route.length > 0 && (
        <Polyline
          positions={route}
          pathOptions={{ color: "black", weight: 4 }}
        />
      )}

      <RecenterMap position={mapCenter} />
    </MapContainer>
  );
};

export default LiveTracking;
