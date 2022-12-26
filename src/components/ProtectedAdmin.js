import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "./axios";

const ProtectedAdmin =(children, setToken)=>{
    const [admin, setAdmin] = useState(localStorage.getItem("role")==="ADMIN"?true:null);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
        if (token) {
            try {
            await axios.get("https://angkasa-api-staging.km3ggwp.com/api/me", {
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
    return children, admin ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedAdmin;
