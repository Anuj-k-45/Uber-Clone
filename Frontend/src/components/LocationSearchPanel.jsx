import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "24B, Near Kapoor's Cafe, Sherians Coding School, Bhopal",
    "15A, MG Road, Bhopal",
    "42C, City Center, Bhopal",
    "78D, New Market, Bhopal",
    "99E, Lake View, Bhopal",
  ];

  return (
    <div>
      {locations.map(function (elem, index) {
        return (
          <div
          onClick={() => {
            props.setVehiclePannelOpen(true);
            props.setPanelOpen(false)
          }}
            key={index}
            className="flex gap-4 border px-3 py-2 border-white active:border-black rounded-xl my-2 items-center h-[55px] w-full"
          >
            <div className="bg-[#eee] h-[30px] w-[30px] flex items-center justify-center rounded-full shrink-0">
              <i className="ri-map-pin-fill"></i>
            </div>

            <h4
              className="text-sm line-clamp-2"
              style={{ fontFamily: "'UberBold', sans-serif" }}
            >
              {elem}
            </h4>
          </div>
        );
      })}
    </div>
  );

};

export default LocationSearchPanel;
