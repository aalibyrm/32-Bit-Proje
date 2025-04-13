import React, { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const LoginRoute = () => {

    const { user } = useContext(AuthContext);

    if (user === undefined) {
        return <LoadingScreen />
    }

    return user ? <Navigate to="/home" replace /> : <Outlet />;
}

export default LoginRoute