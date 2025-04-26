// ✅ src/components/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    role: "",
    profileImg: "",
    accessToken: "",  // ✅ 토큰 상태도 관리
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      // JWT 디코딩하여 만료 여부 확인 (선택사항)
      try {
        const base64Url = storedToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const payload = JSON.parse(window.atob(base64));
        const isExpired = Date.now() >= payload.exp * 1000;

        if (isExpired) {
          localStorage.removeItem("accessToken");
          window.location.href = '/login';
          return;
        }

        // 토큰이 유효하면 사용자 정보 설정
        setUser(prev => ({
          ...prev,
          email: payload.username || prev.email,
          role: payload.role || prev.role,
          accessToken: storedToken,
          id: payload.id
        }));
      } catch (e) {
        console.error("토큰 파싱 오류:", e);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
