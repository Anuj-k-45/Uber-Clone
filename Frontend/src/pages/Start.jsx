import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-full flex justify-between flex-col">
      <div className="h-screen w-screen relative overflow-hidden">
        <img
          className="h-full w-full absolute object-cover"
          src="./login.png"
          alt=""
        />
        <img
          className="z-10 relative w-20 mt-7 ml-7 object-contain"
          src="/uber_logo.png"
          alt="Uber Logo"
        />{" "}
      </div>
      <div className="bg-white pb-7 py-4 px-4">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link to="/login" className="flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
