import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const ProtectedCheckChildren = ({ children }) => {
  const { user, allUser } = useAuth();
  if (allUser?.data?.user?.validated == true || user?.validated == true) {
    return <Navigate to="/platform/" />;
  }

  return children;
};
