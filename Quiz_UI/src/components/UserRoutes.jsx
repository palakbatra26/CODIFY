import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "creator") {
    return <Navigate to="/creator/dashboard" replace />;
  }

  return children;
};

export default UserRoute;
