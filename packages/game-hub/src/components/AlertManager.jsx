import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAlert } from '../alert/AlertContext';

const AlertManager = () => {
    const { alert } = useAlert();

    return (
        <Snackbar open={alert.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={alert.severity} variant="filled">
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default AlertManager;
