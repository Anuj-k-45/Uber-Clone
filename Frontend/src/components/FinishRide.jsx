// src/components/FinishRide.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ rideData, setFinishRidePanel }) => {
  const navigate = useNavigate();

  let distance = rideData?.distance;
  distance = (distance / 1000).toFixed(2);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/ride/end-ride",
        { rideId: rideData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token format fixed
          },
          withCredentials: true, // ✅ ensures cookies are sent if needed
        }
      );

      if (response.status === 200) {
        console.log("Ride finished:", response.data);
        setFinishRidePanel(false); // close panel
        navigate("/captain-home", { state: { ride: rideData } });
      }
    } catch (err) {
      console.error("Error finishing ride", err);
      alert(
        "Failed to end ride: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="relative h-screen px-5 py-7">
      {/* Close Button */}
      <h5
        onClick={() => setFinishRidePanel(false)} // ✅ now closes panel
        className="absolute w-full opacity-50 pr-3 flex justify-center top-2 text-2xl cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-lg font-semibold mb-1 mt-2">Finish this ride</h3>

      {/* Rider Info */}
      <div className="bg-gray-200 p-3 rounded-full flex items-center justify-between mb-1 mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover mx-auto"
            src="https://img.freepik.com/free-photo/beautiful-charming-girl-wears-pink-hoodie-visor-cap-back_176532-7775.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {rideData?.user.fullname.firstname}{" "}
            {rideData?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{distance} KM</h5>
      </div>

      {/* Ride Details */}
      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <p className="text-sm -mt-1 text-gray-600">{rideData?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b border-gray-300">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>
        </div>

        {/* Finish Button */}
        <div className="w-full py-3 px-2 rounded-lg flex flex-col gap-3">
          <form onSubmit={submitHandler}>
            <div className="w-full flex gap-3">
              <button
                type="submit"
                className="w-full bg-green-500 flex justify-center text-white font-semibold p-2 rounded-lg"
              >
                Finish
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
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
