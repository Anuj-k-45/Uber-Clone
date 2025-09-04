import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useContext } from "react";
import { CaptainDataContext } from "../context/captainContext";
import { SocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const [ride, setRide] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      console.log("📥 New ride event received:", data);
      setRide(data); // ✅ unwrap payload
      setRidePopupPanel(true);
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(
            position.coords.latitude + " " + position.coords.longitude
          );

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    // const locationInterval = setInterval(updateLocation, 10000)
    updateLocation();

    // return () => clearInterval(locationInterval)
  }, [captain, socket]);

  async function confirmRide() {
    const response = await axios.post("http://localhost:4000/ride/confirm-ride", {
      rideId: ride._id,
      captain: captain._id,
    },
    { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
  );
    if (response.status === 200) {
      const data = response.data;
      setRide(data);
      setConfirmRidePopupPanel(true);
    }
    setRidePopupPanel(false);
    console.log("ride confirmed");
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen reletive flex flex-col">
      <img className="absolute top-5 w-15 left-3" src="uber_logo.png" alt="" />
      <Link
        to="/captain-login"
        className="absolute top-3 right-3 bg-white w-10 h-10 flex items-center justify-center p-2 rounded-full shadow-lg z-10"
      >
        <i className="text-xl ri-logout-box-line"></i>
      </Link>
      <div className="h-[75%] w-full">
        <LiveTracking />
      </div>
      <div className="absolute bottom-0 w-full rounded-t-2xl bg-white pb-3 pt-5 px-3 flex flex-col justify-between z-[9999]">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupRef}
        className="fixed rounded-t-2xl w-full translate-y-full bottom-0 px-3 py-6 bg-white z-[9999]"
      >
        <RidePopUp
          ride={ride}
          setRide={setRide}
          confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel}
          confirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed h-screen rounded-t-2xl w-full translate-y-full bottom-0 px-3 py-6 bg-white z-[9999]"
      >
        <ConfirmRidePopUp
          ride={ride}
          setRide={setRide}
          confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
