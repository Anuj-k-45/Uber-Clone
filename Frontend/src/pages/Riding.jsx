import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen reletive flex flex-col">
      <Link to="/home" className="absolute top-7 left-5 bg-white w-10 h-10 flex items-center justify-center p-2 rounded-full shadow-lg z-10">
        <i className="text-xl ri-home-4-fill"></i>
      </Link>
      {/* Top half: Map */}
      <div className="h-[60%] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 w-full rounded-t-2xl bg-white pt-2 pb-3 px-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <img className="h-20" src="car.png" alt="" />
            <div
              className="text-right mr-2"
              style={{ fontFamily: "'UberMedium', sans-serif" }}
            >
              <h2 className="text-lg font-medium">Anuj</h2>
              <h4 className="text-xl -mt-1 font-semibold">MH43 AB 3590</h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            </div>
          </div>

          <div className="flex gap-2 flex-col justify-between items-center">
            <div className="w-full">
              <div className="flex items-center gap-5 p-3 border-b border-gray-300">
                <i className="text-lg ri-map-pin-3-fill"></i>{" "}
                <div>
                  <h3 className="text-lg font-medium">562/11-A</h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    Kankariya Talab, Bhopal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line"></i>{" "}
                <div>
                  <h3 className="text-lg font-medium">₹193.68</h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-500 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
