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

    const url = "http://localhost:4000"

    axios
      .get(`${url}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("The user is:", JSON.stringify(res.data.user, null, 2));
        setUser(res.data.user);
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
