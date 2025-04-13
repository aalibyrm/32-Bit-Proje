// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Button, InputBase, Paper } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThemeToggleButton from '../ThemeToggleButton';

export default function Navbar() {
    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left Side: Logo and Links */}
                <Box display="flex" alignItems="center" gap={2}>
                    <SportsEsportsIcon fontSize="large" color="primary" sx={{ marginLeft: '16px' }} />
                    <Typography variant="h6" fontWeight={700} sx={{ marginRight: '70px' }}>GAME HUB</Typography>
                    <Button color="inherit">Ana Sayfa</Button>
                    <Button color="inherit">Oyunlar</Button>
                </Box>

                {/* Right Side: Icons and Profile */}
                <Box display="flex" alignItems="center" gap={2}>
                    <ThemeToggleButton />
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}