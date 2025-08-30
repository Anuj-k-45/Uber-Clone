import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigator = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigator("/login");
      return;
    }

    axios
          .get(`${import.meta.env.VITE_API_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUser(res.data.captain);
            setIsLoading(false);
          })
          .catch(() => {
            localStorage.removeItem("token");
            navigator("/login");
          });
  }, [token, navigator, setUser]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default UserProtectedWrapper;
