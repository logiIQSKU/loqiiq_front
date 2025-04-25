// ✅ src/components/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    role: "",
    profileImg: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");
    const profileImg = params.get("profileImg");

    if (token) {
      localStorage.setItem("accessToken", token);
    }

    setUser({
      email: email || "",
      nickname: name || "",
      role: role || "",
      profileImg: profileImg || ""
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};