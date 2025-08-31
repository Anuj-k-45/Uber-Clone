import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePannelOpen(false);
        }}
        className="absolute w-full opacity-50 pr-3 flex justify-center top-2 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-lg font-semibold mb-1 mt-2">Confirm your Ride</h3>

      <div className="flex gap-2 flex-col justify-between items-center">
        <img className="-mt-2 h-30" src="car.png" alt="" />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-3-fill"></i>{" "}
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>{" "}
            <div>
              <h3 className="text-lg font-medium">₹193.68</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setConfirmRidePannelOpen(false);
            props.setVehicleFound(true);
          }}
          className="w-full bg-green-500 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
