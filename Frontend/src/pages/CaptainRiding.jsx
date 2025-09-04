// src/pages/CaptainRiding.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import useDriverLocation from "../hooks/useDriverLocation";
import RideTrackingMap from "../components/RideTrackingMap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const { socket } = useContext(SocketContext) || {};
  const navigate = useNavigate();
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  // Start sending driver location
  useDriverLocation(socket, rideData?._id, rideData?.captain?._id);

  // Animate FinishRide panel
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
        duration: 0.3,
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.3,
      });
    }
  }, [finishRidePanel]);

  useEffect(() => {
    if (!socket || !rideData) return;

    const onRideEnded = () => navigate("/captain-home");

    socket.emit("joinRide", {
      rideId: rideData._id,
      userId: rideData.captain?._id,
      userType: "captain",
    });

    socket.on("ride-ended", onRideEnded);

    return () => {
      socket.off("ride-ended", onRideEnded);
      socket.emit("leaveRide", { rideId: rideData._id });
    };
  }, [socket, rideData, navigate]);

  if (!rideData) return <div>No ride data</div>;

  return (
    <div className="h-screen relative">
      <Link to="/captain-home" className="absolute top-7 left-5 z-10">
        <i className="ri-home-4-fill text-xl bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg"></i>
      </Link>

      {/* Map */}
      <div className="h-[60%] w-full">
        <RideTrackingMap
          rideId={rideData._id}
          pickup={rideData.pickup}
          destination={rideData.destination}
          followCaptain={true}
        />
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 h-[21%] w-full rounded-t-2xl bg-white pb-3 pt-7 px-3 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <h4 className="text-2xl">
            <i className="ri-direction-line"></i>
          </h4>
          <h4 className="text-xl font-semibold">4 Km Away</h4>
        </div>

        <button
          onClick={() => setFinishRidePanel(true)} // ✅ only opens panel
          className="w-full bg-green-500 flex justify-center text-white font-semibold p-2 rounded-lg"
        >
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed h-screen rounded-t-2xl w-full z-10 translate-y-full bottom-0 bg-white"
      >
        <FinishRide
          rideData={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
