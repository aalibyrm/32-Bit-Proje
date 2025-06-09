import React, { createContext, useContext, useState, useCallback } from 'react';
export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    const showAlert = useCallback((message, severity = 'info', duration = 2000) => {

        setAlert({ open: true, message, severity });

        setTimeout(() => {
            setAlert(prev => ({ ...prev, open: false }));
        }, duration);
    }, []);

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
