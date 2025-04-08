import React, { createContext, useEffect, useState } from 'react'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const res = await api.post('http://localhost:4000/login', { email, password }, { withCredentials: true });
            setUser(res.data.user);
            navigate("/home");
        } catch (err) {
            console.error("Giriş hatası:", err.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await api.post("http://localhost:4000/logout", {}, { withCredentials: true });
            setUser(null);

        } catch (err) {
            console.error("Çıkış hatası:", err.response?.data?.message);
        }
    };

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

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthContext