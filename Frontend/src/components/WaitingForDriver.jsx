import React from "react";

const WaitingForDriver = (props) => {
  const type = props.vehicleType;
  const fare = props.fare?.[type] ?? "--"; // fallback to "--" if not ready
  const pickup = props.pickup || "";
  const destination = props.destination || "";

  return (
    <div className="mt-3">
      <h5
        onClick={() => {
          props.setWaitingForDriverOpen(false);
        }}
        className="absolute w-full opacity-50 pr-3 flex justify-center top-2 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between gap-4 mb-4">
        <img className="h-20" src="car.png" alt="" />
        <div
          className="text-right mr-2"
          style={{ fontFamily: "'UberMedium', sans-serif" }}
        >
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.captain.fullname.firstname}{" "}
            {props.ride?.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl -mt-1 font-semibold">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-key-fill"></i>
            <div>
              <p style={{ fontFamily: "'UberMedium', sans-serif" }} className="-mt-1 text-2xl text-gray-600">OTP : {props.ride?.otp}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <p className="-mt-1 text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-3-fill"></i>{" "}
            <div>
              <p className="-mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>{" "}
            <div>
              <h3 className="text-lg font-medium">₹{fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Via Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
