import { useEffect } from "react";

export default function useDriverLocation(socket, rideId, captainId) {
  useEffect(() => {
    if (!socket || !rideId || !captainId) return;

    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not available in this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, heading, speed } = pos.coords;
        socket.emit("captain:location:update", {
          rideId,
          captainId,
          lat: latitude,
          lng: longitude,
          heading: heading ?? null,
          speed: speed ?? null,
          ts: Date.now(),
        });
      },
      (err) => console.warn("Geolocation watch error:", err),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.emit("leaveRide", { rideId, captainId });
    };
  }, [socket, rideId, captainId]);
}
