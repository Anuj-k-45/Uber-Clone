import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inputType, setInputType] = useState(""); // "pickup" or "destination"
  const [panelOpen, setPanelOpen] = useState(false);
  const [suppressSearch, setSuppressSearch] = useState(false); // 👈 new state

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePannelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);
  const [confirmRidePannelOpen, setConfirmRidePannelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverOpen, setWaitingForDriverOpen] = useState(false);
  const [pickupError, setPickupError] = useState("");
  const [destinationError, setDestinationError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  // 🔍 Debounce + suppress search logic
  useEffect(() => {
    if (suppressSearch) {
      setSuppressSearch(false); // reset flag after skipping one cycle
      return;
    }

    const handler = setTimeout(() => {
      const query = (inputType === "pickup" ? pickup : destination).trim();
      if (query.length > 1) {
        axios
          .get(
            `http://localhost:4000/maps/suggestions?q=${encodeURIComponent(
              query
            )}`
          )
          .then((res) => {
            console.log("Suggestions API response:", res.data);
            if (Array.isArray(res.data)) {
              setSuggestions(res.data);
            } else if (res.data && Array.isArray(res.data.suggestions)) {
              setSuggestions(res.data.suggestions);
            } else {
              setSuggestions([]);
            }
          })
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]);
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [pickup, destination, inputType, suppressSearch]);

  // ✅ When user clicks a suggestion
  const handleSuggestionClick = (value) => {
    if (inputType === "pickup") setPickup(value);
    else setDestination(value);
    setSuggestions([]);
    setSuppressSearch(true); // 👈 prevent next API call
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePannelOpen) {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePannelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePannelOpen) {
        gsap.to(vehiclePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePannelOpen]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriverOpen) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverOpen]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-15 absolute left-5 top-5" src="uber_logo.png" alt="" />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="bg-white h-[30%] px-6 pt-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(!panelOpen);
            }}
            className="absolute opacity-0 right-5 top-2 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 rounded-full top-[30%] left-4 bg-gray-900"></div>
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setInputType("pickup");
              }}
              onChange={(e) => {
                setPickup(e.target.value);
                setInputType("pickup");
                if (pickupError) setPickupError(false);
              }}
              className={`px-12 py-2 text-base rounded-lg w-full mt-5 
    ${
      pickupError
        ? "border border-red-500 placeholder-red-500 bg-[#fee]"
        : "bg-[#eee]"
    }`}
              type="text"
              placeholder={
                pickupError
                  ? "⚠ Enter pickup location"
                  : "Add a pick-up location"
              }
            />

            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setInputType("destination");
              }}
              onChange={(e) => {
                setDestination(e.target.value);
                setInputType("destination");
                if (destinationError) setDestinationError(false);
              }}
              className={`px-12 py-2 text-base rounded-lg w-full mt-3 
    ${
      destinationError
        ? "border border-red-500 placeholder-red-500 bg-[#fee]"
        : "bg-[#eee]"
    }`}
              type="text"
              placeholder={
                destinationError
                  ? "⚠ Enter destination"
                  : "Enter your destination"
              }
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-[0] px-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              let valid = true;

              if (!pickup.trim()) {
                setPickupError("Please enter a pickup location");
                valid = false;
              } else {
                setPickupError("");
              }

              if (!destination.trim()) {
                setDestinationError("Please enter a destination");
                valid = false;
              } else {
                setDestinationError("");
              }

              if (!valid) return;

              setPanelOpen(false);
              setVehiclePannelOpen(true);
            }}
            className="w-full bg-black mb-5 flex justify-center text-white font-semibold p-2 rounded-lg"
          >
            Find
          </button>

          <div className="">
            <LocationSearchPanel
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </div>

      <div
        ref={vehiclePannelRef}
        className="fixed rounded-t-2xl w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white "
      >
        <VehiclePanel
          setVehiclePannelOpen={setVehiclePannelOpen}
          setConfirmRidePannelOpen={setConfirmRidePannelOpen}
        />
      </div>

      <div
        ref={confirmRidePannelRef}
        className="fixed rounded-t-2xl w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white "
      >
        <ConfirmRide
          setConfirmRidePannelOpen={setConfirmRidePannelOpen}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed rounded-t-2xl w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white "
      >
        <LookingForDriver />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed rounded-t-2xl w-full z-10 bottom-0  px-3 py-6 bg-white "
      >
        <WaitingForDriver setWaitingForDriverOpen={setWaitingForDriverOpen} />
      </div>
    </div>
  );
};

export default Home;
