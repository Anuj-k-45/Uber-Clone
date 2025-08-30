import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return; // stop execution
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCaptain(res.data.captain);
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token, navigate, setCaptain]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
