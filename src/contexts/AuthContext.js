import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [teacher, setTeacher] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const getLoginUser = () => {
    let savedToken = localStorage.getItem("accessToken");
    let getUserData = savedToken && jwtDecode(savedToken);
    if (!savedToken) {
      savedToken = sessionStorage.getItem("accessToken");
      getUserData = savedToken && jwtDecode(savedToken);
    }
    if (savedToken) {
      setAccessToken(savedToken);
      setUserData(getUserData);
      if (getUserData.role === "admin") {
        setAdmin(true);
        setTeacher(true);
      } else if (getUserData.role === "teacher") {
        setTeacher(true);
        setAdmin(false);
      } else {
        setAdmin(false);
        setTeacher(false);
      }
    } else {
      setAdmin(false);
      setTeacher(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLoginUser();
  }, [accessToken]);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    setAccessToken(null);
    setUserData({});
    setAdmin(false);
    setTeacher(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        logoutHandler,
        teacher,
        admin,
        setTeacher,
        setAdmin,
        userData,
        setUserData,
        loading,
        getLoginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
