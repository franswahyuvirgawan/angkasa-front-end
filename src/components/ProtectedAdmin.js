import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedAdmin = ({ children, setToken }) => {
  const [admin, setAdmin] = useState(
    localStorage.getItem("role") === "ADMIN" ? true : null
  );
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const URL =
    process.env.REACT_APP_SERVER_URL || "https://angkasa-api.km3ggwp.com/api";
  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await axios.get(`${URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            setToken(null);
            navigate("/login");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  if (!token) {
    return <Navigate to={`/login`} />;
  }
  return children, admin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAdmin;
