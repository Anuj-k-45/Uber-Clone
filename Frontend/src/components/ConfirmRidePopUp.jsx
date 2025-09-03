import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  let distance = props.ride?.distance;
  distance = (distance / 1000).toFixed(2);

  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-2">
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
        className="absolute w-full opacity-50 pr-3 flex justify-center top-2 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-lg font-semibold mb-1 mt-2">
        Confirm this ride to start
      </h3>

      <div className="bg-gray-200 p-3 rounded-full flex items-center justify-between mb-1 mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover mx-auto"
            src="https://img.freepik.com/free-photo/beautiful-charming-girl-wears-pink-hoodie-visor-cap-back_176532-7775.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user?.fullname
              ? `${props.ride.user.fullname.firstname} ${props.ride.user.fullname.lastname}`
              : "Unknown Rider"}
          </h2>{" "}
        </div>
        <h5 className="text-lg font-semibold">{distance} KM</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <p className="-mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-3-fill"></i>{" "}
            <div>
              <p className="-mt-1 text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>{" "}
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Via Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full px-2 rounded-lg flex flex-col gap-3">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="w-full mb-3 bg-gray-200 rounded-2xl border-2 border-gray-300 text-black">
              <input
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                value={otp}
                className="w-full p-3 rounded-2xl"
                type="text"
                placeholder="Enter OTP"
              />
            </div>
            <div className="w-full flex gap-3">
              <Link
                to={"/captain-riding"}
                onClick={() => {}}
                className="w-full bg-green-500 flex justify-center text-white font-semibold p-2 rounded-lg"
              >
                Confirm
              </Link>
              <button
                onClick={() => {
                  props.setConfirmRidePopupPanel(false);
                  props.setRidePopupPanel(true);
                }}
                className="w-full bg-red-500 text-white font-semibold p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
