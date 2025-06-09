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
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.1), rgba(255, 107, 107, 0.1))'
            : 'linear-gradient(135deg, rgba(141, 23, 24, 0.1), rgba(78, 205, 196, 0.1))',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
        '&:hover': {
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.2), rgba(255, 107, 107, 0.2))'
                : 'linear-gradient(135deg, rgba(141, 23, 24, 0.2), rgba(78, 205, 196, 0.2))',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.5)' : 'rgba(141, 23, 24, 0.5)',
        },
        marginLeft: 0,
        width: '100%',
        transition: 'all 0.3s ease',
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.mode === 'dark' ? theme.palette.background.accent : theme.palette.background.accentSecondary,
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: theme.palette.text.primary,
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 0.7,
            },
        },
    }));

    return (
        <AppBar position="static" elevation={0} sx={{
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.9), rgba(26, 15, 46, 0.9), rgba(45, 27, 61, 0.9))'
                : 'linear-gradient(135deg, rgba(253, 242, 248, 0.9), rgba(248, 250, 252, 0.9), rgba(254, 254, 254, 0.9))',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
            borderRadius: '16px',
            marginBottom: 2,
            boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(158, 35, 222, 0.1)'
                : '0 8px 32px rgba(141, 23, 24, 0.1)',
        }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 16px !important',
                minHeight: '64px !important',
                '&.MuiToolbar-root': {
                    padding: '8px 16px',
                    minHeight: '64px',
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
                    <IconButton
                        size="large"
                        color="inherit"
                        sx={{
                            color: theme.palette.mode === 'dark' ? theme.palette.background.accent : theme.palette.background.accentSecondary,
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'rgba(158, 35, 222, 0.1)'
                                    : 'rgba(141, 23, 24, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        onClick={handleAvatarClick}
                        color="inherit"
                        sx={{
                            color: theme.palette.mode === 'dark' ? theme.palette.background.accent : theme.palette.background.accentSecondary,
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'rgba(158, 35, 222, 0.1)'
                                    : 'rgba(141, 23, 24, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                        }}
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
                        sx={{
                            '& .MuiPaper-root': {
                                background: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                                backdropFilter: 'blur(20px)',
                                borderRadius: '12px',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 8px 32px rgba(158, 35, 222, 0.2)'
                                    : '0 8px 32px rgba(141, 23, 24, 0.2)',
                            },
                        }}
                    >
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                gap: 1,
                                '&:hover': {
                                    background: theme.palette.mode === 'dark'
                                        ? 'rgba(158, 35, 222, 0.1)'
                                        : 'rgba(141, 23, 24, 0.1)',
                                },
                            }}
                        >
                            <LogoutIcon fontSize="small" />
                            Çıkış Yap
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}