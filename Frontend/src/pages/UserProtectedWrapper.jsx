import React, { useEffect } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigator = useNavigate();

  useEffect(() => {
    if (!token) {
      navigator("/login");
    }
  }, [token, navigator]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
