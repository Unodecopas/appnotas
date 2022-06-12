import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const betterSetUser = (newValue) => {
    localStorage.setItem("user", JSON.stringify(newValue));
    setUser(newValue);
  };
  const logout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/logout`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        auth: JSON.stringify({ username: user.username }),
      });
      if (res.ok) {
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider value={[user, betterSetUser, logout]}>
      {children}
    </UserContext.Provider>
  );
};
