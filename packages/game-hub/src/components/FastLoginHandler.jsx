import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const FastLoginHandler = () => {

    const { fastLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogin = async () => {
            await fastLogin();
            navigate("/home");
        }

        performLogin();

    }, [fastLogin, navigate])

    return (
        <LoadingScreen />
    )
}

export default FastLoginHandler