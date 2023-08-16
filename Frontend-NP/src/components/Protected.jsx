import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const Protected = ({ children }) => {
  const { user } = useAuth();
  if (user == null || user?.check == false) {
    localStorage.removeItem("user");
    return <Navigate to="/platform/login" />;
  }

  return children;
};
