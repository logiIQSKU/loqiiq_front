// src/components/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import profileImage from "../assets/profile.png";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { nickname: "리쿠", profileImg: profileImage };
  });

  // 사용자 정보가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};