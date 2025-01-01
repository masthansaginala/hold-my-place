import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextRedux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, profileData } = useAuth();
  console.log(
    "first->private",
    ["ADMIN", "USER", "ORGANIZER", "VENDOR"].includes(
      profileData?.user?.user_role
    ),
    isAuthenticated
  );
  return isAuthenticated &&
    ["ADMIN", "USER", "ORGANIZER", "VENDOR"].includes(
      profileData?.user?.user_role
    ) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
