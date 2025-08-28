import React, { createContext } from "react";

const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const user = {
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  };

  return (
    <UserDataContext.Provider value={user}>{children}</UserDataContext.Provider>
  );
};

export default UserContext;
export { UserDataContext };
