// src/components/RideTrackingMap.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SocketContext } from "../context/SocketContext";

/** ICONS (declare once to avoid re-creating on every render) */
const carIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const pinIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

/** Helper to recentre the map when `position` changes */
function Recenter({ position, zoom = null }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    const targetZoom = zoom ?? Math.max(map.getZoom(), 15);
    map.flyTo(position, targetZoom, { duration: 0.5 });
  }, [position, zoom, map]);
  return null;
}

/** Convert a variety of formats into [lat, lng] */
function toLatLng(val) {
  if (!val) return null;
  if (Array.isArray(val) && val.length === 2) return val;
  if (typeof val === "object") {
    if (val.lat != null && val.lng != null)
      return [Number(val.lat), Number(val.lng)];
    if (val.latitude != null && val.longitude != null)
      return [Number(val.latitude), Number(val.longitude)];
  }
  return null;
}

export default function RideTrackingMap({
  rideId,
  pickup,
  destination,
  followCaptain = true,
}) {
  const { socket } = useContext(SocketContext) || {};
  const [captainPos, setCaptainPos] = useState(null);
  const [route, setRoute] = useState([]);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // parse pickup/destination (string → coords)
  useEffect(() => {
    let cancelled = false;

    async function parsePlace(p, setter) {
      if (!p) return setter(null);
      const latlng = toLatLng(p);
      if (latlng) return setter(latlng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            p
          )}`
        );
        const json = await res.json();
        if (!cancelled && json[0]) {
          setter([parseFloat(json[0].lat), parseFloat(json[0].lon)]);
        }
      } catch (err) {
        console.warn("Geocode failed", err);
        if (!cancelled) setter(null);
      }
    }

    parsePlace(pickup, setPickupCoords);
    parsePlace(destination, setDestinationCoords);

    return () => {
      cancelled = true;
    };
  }, [pickup, destination]);

  // fetch OSRM route
  useEffect(() => {
    let active = true;
    async function fetchRoute(a, b) {
      if (!a || !b) return;
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();
        if (active && json.routes?.[0]?.geometry) {
          const coords = json.routes[0].geometry.coordinates.map(
            ([lng, lat]) => [lat, lng]
          );
          setRoute(coords);
        }
      } catch (err) {
        console.warn("Failed to fetch route", err);
      }
    }
    fetchRoute(pickupCoords, destinationCoords);
    return () => {
      active = false;
    };
  }, [pickupCoords, destinationCoords]);

  // socket updates
  useEffect(() => {
    if (!socket) return;
    socket.emit("joinRide", { rideId });
    const handler = (data) => {
      if (!data) return;
      const lat = Number(data.lat);
      const lng = Number(data.lng);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        setCaptainPos([lat, lng]);
      }
    };
    socket.on("captainLocationUpdate", handler);

    return () => {
      socket.off("captainLocationUpdate", handler);
      socket.emit("leaveRide", { rideId });
    };
  }, [socket, rideId]);

  // map center priority: pickup → captain → default city
  const center = pickupCoords || captainPos || [22.5726, 88.3639];

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {pickupCoords && (
          <Marker position={pickupCoords} icon={pinIcon}>
            <Popup>Pickup</Popup>
          </Marker>
        )}
        {destinationCoords && (
          <Marker position={destinationCoords} icon={pinIcon}>
            <Popup>Destination</Popup>
          </Marker>
        )}
        {captainPos && (
          <Marker position={captainPos} icon={carIcon}>
            <Popup>Captain</Popup>
          </Marker>
        )}
        {route.length > 0 && (
          <Polyline
            positions={route}
            pathOptions={{ color: "#111", weight: 4 }}
          />
        )}
        {followCaptain && captainPos && <Recenter position={captainPos} />}
      </MapContainer>
    </div>
  );
}
