import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(() => {
    const storedProfile = localStorage.getItem("user");
    return storedProfile ? JSON.parse(storedProfile) : {};
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("authToken");
  });

  console.log(
    "first",
    isAuthenticated,
    profileData,
    localStorage.getItem("user")
  );

  useEffect(() => {
    const storedProfile = localStorage.getItem("user");

    setProfileData(storedProfile ? JSON.parse(storedProfile) : {});
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    const storedProfile = localStorage.getItem("user");

    setProfileData(storedProfile ? JSON.parse(storedProfile) : {});
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        profileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
