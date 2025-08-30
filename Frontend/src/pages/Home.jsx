/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePannelRef = useRef(null);
  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");
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
        <div className="bg-white h-[30%] p-6 relative">
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
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              name=""
              id=""
            />
            <input
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              name=""
              id=""
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-[0] px-5">
          {
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePannelOpen={setVehiclePannelOpen}
            />
          }
        </div>
      </div>
      <div
        ref={vehiclePannelRef}
        className="fixed rounded-t-2xl w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white "
      >
        <div className="relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setVehiclePannelOpen(false);
            }}
            className="absolute right-5 top-2 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className="text-lg font-semibold mb-3">Choose a ride</h3>
          <div
            className="flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
            style={{ fontFamily: "'UberMedium', sans-serif" }}
          >
            <img className="h-15 mr-3 mb-1" src="car.png" />
            <div className="w-3/4">
              <h4
                className="font-semibold text-lg text-gray-900"
                style={{ fontFamily: "'UberMedium', sans-serif" }}
              >
                UberGo
                <span>
                  <i className="ri-user-fill"></i>4
                </span>
              </h4>
              <h5 className="font-medium text-gray-900 text-sm">2 mins away</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, compact rides
              </p>
            </div>
            <h2 className="text-lg font-semibold">₹193.14</h2>
          </div>
          <div
            className="flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
            style={{ fontFamily: "'UberMedium', sans-serif" }}
          >
            <img className="h-11 mr-2" src="bike.png" />
            <div className="w-3/4">
              <h4
                className="font-semibold text-lg text-gray-900"
                style={{ fontFamily: "'UberMedium', sans-serif" }}
              >
                Moto
                <span>
                  <i className="ri-user-fill"></i>1
                </span>
              </h4>
              <h5 className="font-medium text-gray-900 text-sm">3 mins away</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable motorcycle rides
              </p>
            </div>
            <h2 className="text-lg font-semibold">₹65.25</h2>
          </div>
          <div
            className="flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
            style={{ fontFamily: "'UberMedium', sans-serif" }}
          >
            <img className="h-11 mr-2" src="auto.png" />
            <div className="w-3/4">
              <h4
                className="font-semibold text-lg text-gray-900"
                style={{ fontFamily: "'UberMedium', sans-serif" }}
              >
                UberAuto
                <span>
                  <i className="ri-user-fill"></i>3
                </span>
              </h4>
              <h5 className="font-medium text-gray-900 text-sm">2 mins away</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable auto rides
              </p>
            </div>
            <h2 className="text-lg font-semibold">₹118.68</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
