import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThemeToggleButton from '../ThemeToggleButton';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate("/logout", { replace: true });
        handleClose();
    };

    return (
        <AppBar
            position="static"
            elevation={2}
            sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>

                <Box display="flex" alignItems="center" gap={2}>
                    <SportsEsportsIcon
                        fontSize="large"
                        sx={{ color: theme.palette.primary.main, ml: 2 }}
                    />
                    <Typography variant="h6" fontWeight={700} sx={{ mr: 8 }}>
                        GAME HUB
                    </Typography>
                    <Button sx={{ color: theme.palette.text.primary }}>Ana Sayfa</Button>
                    <Button sx={{ color: theme.palette.text.primary }}>Oyunlar</Button>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <ThemeToggleButton />
                    <IconButton sx={{ color: theme.palette.text.primary }}>
                        <NotificationsIcon />
                    </IconButton>

                    <IconButton onClick={handleAvatarClick} sx={{ color: theme.palette.text.primary }}>
                        <AccountCircleIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Box onClick={handleLogout} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                            <MenuItem sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent'
                                }
                            }}>Çıkış Yap</MenuItem>
                            <LogoutIcon />
                        </Box>

                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
