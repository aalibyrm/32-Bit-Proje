import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import LoadingScreen from './LoadingScreen';

const LogoutHandler = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/login', { replace: true });
        };

        performLogout();
    }, [logout, navigate]);

    return <LoadingScreen />;
};

export default LogoutHandler;