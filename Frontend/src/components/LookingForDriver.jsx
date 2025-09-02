import React from 'react';

const LookingForDriver = (props) => {

  const type = props.vehicleType;
  const fare = props.fare?.[type] ?? "--"; // fallback to "--" if not ready
  const pickup = props.pickup || "";
  const destination = props.destination || "";


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

      <h3 className="text-lg font-semibold mb-1 mt-2">Looking for a Driver</h3>

      <div className="flex gap-2 flex-col justify-between items-center">
        <img className="mt-2 h-30" src={`${type}.png`} alt="" />

        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-sm -mt-1 text-gray-600">{pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-3-fill"></i>{" "}
            <div>
              <h3 className="text-sm -mt-1 text-gray-600">{destination}</h3>
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

export default LookingForDriver;