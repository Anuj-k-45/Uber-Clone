/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {captain, setCaptain} = useContext(CaptainDataContext);
  const navigator = useNavigate();

  const submitHandler =async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/captain/login`,
      captainData
    );

    if (response.status === 200) {
      const data = response.data;

      setCaptain(data.captain);
      localStorage.setItem("token", data.token);

      navigator("/captain-home");
  };

    setPassword("");
    setEmail("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="z-10 w-15 mt-2 mb-6"
          src="/uber_logo.png"
          alt="Uber Logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required="True"
            value={email}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required="True"
            value={password}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Join a fleet?{" "}
          <Link className="text-blue-600 " to={"/captain-signup"}>
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to={"/login"}
          className="flex items-center justify-center bg-[#d3d35e] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
