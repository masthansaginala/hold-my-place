import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextRedux";

const ACCOUNT_ROLES = {
  USER: "/user-dashboard/dashboard",
  ORGANIZER: "/organizer/events",
  ADMIN: "/admin/users",
  VENDOR: "/vendor/services",
};

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const { isAuthenticated, profileData } = useAuth();
  console.log("Profile->", profileData, isAuthenticated);
  const link = ACCOUNT_ROLES[profileData?.user?.user_role];
  const [navigateLink, setNavigateLink] = useState(isAuthenticated ? link : "");
  console.log("isAuthenticatd->", isAuthenticated, navigateLink);
  useEffect(() => {
    setNavigateLink(ACCOUNT_ROLES[profileData?.user?.user_role]);
  }, [profileData]);

  return isAuthenticated ? <Navigate to={navigateLink} /> : children;
};

export default PublicRoute;
