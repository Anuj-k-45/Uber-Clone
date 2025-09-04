// src/pages/Riding.jsx
import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import RideTrackingMap from "../components/RideTrackingMap";
import { UserDataContext } from "../context/userContext"; // adjust path

const Riding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const { socket } = useContext(SocketContext) || {};
  const { user } = useContext(UserDataContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !rideData) return;
    // join ride room so backend can broadcast to everyone watching
    socket.emit("joinRide", {
      rideId: rideData._id,
      userId: user?._id,
      userType: "user",
    });

    const onRideEnded = () => navigate("/home");
    socket.on("ride-ended", onRideEnded);

    return () => {
      socket.off("ride-ended", onRideEnded);
      socket.emit("leaveRide", { rideId: rideData._id, userId: user?._id });
    };
  }, [socket, rideData, user, navigate]);

  if (!rideData) return <div>No ride data found</div>;

  return (
    <div className="h-screen relative flex flex-col">
      <Link
        to="/home"
        className="absolute top-7 left-5 bg-white w-10 h-10 flex items-center justify-center p-2 rounded-full shadow-lg z-10"
      >
        <i className="text-xl ri-home-4-fill" />
      </Link>

      {/* Top half: Map */}
      <div className="h-[60%] w-full">
        <RideTrackingMap
          rideId={rideData._id}
          pickup={rideData.pickup} // string or coords OK
          destination={rideData.destination} // string or coords OK
          followCaptain={true}
        />
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 w-full rounded-t-2xl bg-white pb-3 px-3 pt-4 flex flex-col justify-between">
        {/* ... your bottom panel content unchanged (use safe optional chaining on rideData fields) */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <img className="h-20" src="car.png" alt="Car" />
            <div
              className="text-right mr-2"
              style={{ fontFamily: "'UberMedium', sans-serif" }}
            >
              <h2 className="text-lg font-medium">
                {rideData?.captain?.fullname?.firstname}{" "}
                {rideData?.captain?.fullname?.lastname}
              </h2>
              <h4 className="text-xl -mt-1 font-semibold">
                {rideData?.captain?.vehicle?.plate}
              </h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            </div>
          </div>

          <div className="flex gap-2 flex-col justify-between items-center">
            <div className="w-full">
              <div className="flex items-center gap-5 p-3 border-b border-gray-300">
                <i className="text-lg ri-map-pin-3-fill" />
                <div>
                  <p className="text-sm -mt-1 text-gray-600">
                    {rideData?.destination}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line" />
                <div>
                  <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
                  <p className="text-sm -mt-1 mb-2 text-gray-600">
                    Total Payment
                  </p>
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
