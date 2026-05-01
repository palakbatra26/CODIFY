// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   // ❌ Not logged in
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ Logged in
//   return children;
// };

// export default ProtectedRoute;




import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // ⏳ simulate async auth check
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");

      if (token) {
        setIsAuth(true);
      }

      setLoading(false);
    }, 300); // 300ms ensures loader renders

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
