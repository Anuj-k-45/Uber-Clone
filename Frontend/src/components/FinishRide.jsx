import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  let distance = props.rideData?.distance;
  distance = (distance / 1000).toFixed(2);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/ride/end-ride",
      {
        rideId: props.rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      props.setFinishRidePanel(false);
      navigate("/captain-home", { state: { ride: props.rideData } });
      console.log("ride finished");
    } else {
      console.log("There was an error: " + response);
    }
  };

  return (
    <div className="relative h-screen px-5 py-7">
      <h5
        onClick={() => {}}
        className="absolute w-full opacity-50 pr-3 flex justify-center top-2 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-lg font-semibold mb-1 mt-2">Finish this ride</h3>

      <div className="bg-gray-200 p-3 rounded-full flex items-center justify-between mb-1 mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover mx-auto"
            src="https://img.freepik.com/free-photo/beautiful-charming-girl-wears-pink-hoodie-visor-cap-back_176532-7775.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.rideData?.user.fullname.firstname}{" "}
            {props.rideData?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{distance} KM</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-3-fill"></i>{" "}
            <div>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>{" "}
            <div>
              <h3 className="text-lg font-medium">₹{props.rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>
        </div>
        <div className="w-full py-3 px-2 rounded-lg flex flex-col gap-3">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="w-full flex gap-3">
              <button
                type="submit"
                onClick={() => {
                  props.setFinishRidePanel(false);
                }}
                className="w-full bg-green-500 flex justify-center text-white font-semibold p-2 rounded-lg"
              >
                Finish
              </button>
            </div>
          </form>
        </div>
        <div className="absolute bottom-0 px-7 pb-4 w-full">
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
