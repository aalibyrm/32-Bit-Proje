import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return <LoadingScreen />
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
