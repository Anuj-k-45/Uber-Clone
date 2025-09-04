import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const finishRidePanelRef = useRef(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const location = useLocation();
  const rideData = location.state?.ride;

  const submithandler = async (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
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
      <div className="h-4/5 w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 h-[21%] w-full rounded-t-2xl bg-white pb-3 pt-7 px-3 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <h4 className="text-2xl">
            <i className="ri-direction-line"></i>
          </h4>
          <h4 className="text-xl font-semibold">4 Km Away</h4>
        </div>

        <button
          onClick={(e) => {
            submithandler(e);
            setFinishRidePanel(true);
          }}
          className="w-full bg-green-500 flex justify-center text-white font-semibold p-2 rounded-lg"
        >
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed h-screen rounded-t-2xl w-full z-10 translate-y-full bottom-0 bg-white "
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
