import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Menu,
    MenuItem,
    InputBase,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThemeToggleButton from '../ThemeToggleButton';
import { alpha, styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '16px',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: theme.palette.secondary,
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
        },
    }));

    return (
        <AppBar position="static" elevation={0} sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
        }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 !important',
                minHeight: '0 !important',
                '&.MuiToolbar-root': {
                    padding: 0,
                    minHeight: 0,
                },
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeToggleButton />
                </Box>

                <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 2 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Oyun ara..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton size="large" color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        onClick={handleAvatarClick}
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
                            <LogoutIcon fontSize="small" />
                            Çıkış Yap
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}