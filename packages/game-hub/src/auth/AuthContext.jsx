import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../alert/AlertContext';
import socket from '../socket/socket';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [rememberUser, setRememberUser] = useState(null);
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    const login = async (email, password, rememberMe) => {
        try {
            const res = await api.post('http://localhost:4000/login', { email, password, rememberMe }, { withCredentials: true });
            setUser(res.data.user);
            showAlert('Giriş başarılı', 'success');
            navigate("/home", { replace: true });
        } catch (err) {
            showAlert('Hatalı e-posta veya şifre girişi', 'error');
            console.error("Giriş hatası:", err.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await api.post("http://localhost:4000/logout", { withCredentials: true });
            setUser(null);
            setRememberUser(null);
            showAlert('Çıkış başarılı', 'success')

        } catch (err) {
            console.error("Çıkış hatası:", err.response?.data?.message);
        }
    };

    const fastLogin = async () => {

        try {
            const res = await api.get("http://localhost:4000/fast-login", { withCredentials: true });
            setUser(res.data.user);
            showAlert('Giriş başarılı', 'success');
        } catch (err) {
            console.error("Giriş hatası:", err.response?.data?.message || err.message);
        }

    }

    const rememberToken = async () => {
        try {
            const res = await api.get("http://localhost:4000/token-control", { withCredentials: true });
            setRememberUser(res.data.user);
        } catch (err) {
            console.error("Giriş hatası:", err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await api.get('http://localhost:4000/session', { withCredentials: true });
                setUser(res.data.user);
            } catch (err) {
                setUser(null);

            }

        }

        checkSession();
    }, []);

    useEffect(() => {
        if (user) {
            socket.connect();
        } else {
            socket.disconnect();
        }
    }, [user]);

    return <AuthContext.Provider value={{ user, login, logout, fastLogin, rememberToken, rememberUser }}>{children}</AuthContext.Provider>;
}

export default AuthContext