import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePannelOpen(false);
        }}
        className="absolute w-full opacity-50 pr-3 flex justify-center top-2 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-lg font-semibold mb-3">Choose a ride</h3>
      <div
        onClick={() => {
          props.setVehicleType("car");
          props.setConfirmRidePannelOpen(true);
          props.setVehiclePannelOpen(false);
        }}
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
        <h2 className="text-lg font-semibold mr-1">₹{props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setVehicleType("moto");
          props.setConfirmRidePannelOpen(true);
          props.setVehiclePannelOpen(false);
        }}
        className="flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
        style={{ fontFamily: "'UberMedium', sans-serif" }}
      >
        <img className="h-11 mr-2" src="moto.png" />
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
        <h2 className="text-lg font-semibold mr-1">₹{props.fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          props.setVehicleType("auto");
          props.setConfirmRidePannelOpen(true);
          props.setVehiclePannelOpen(false);
        }}
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
        <h2 className="text-lg font-semibold mr-1">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
