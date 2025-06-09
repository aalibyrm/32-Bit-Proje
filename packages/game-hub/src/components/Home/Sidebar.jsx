import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Select,
    MenuItem,
    Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CasinoIcon from '@mui/icons-material/Casino';
import StarIcon from '@mui/icons-material/Star';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState("Oyunlar");

    const menuItems = [
        { label: "Oyunlar", icon: <CasinoIcon /> },
        { label: "Favorileriniz", icon: <StarIcon /> },
        { label: "Masa Oyunları", icon: <TableRestaurantIcon /> },
        { label: "Etkinlik Oyunları", icon: <GroupsIcon /> },
    ];

    return (
        <Box
            sx={{
                height: '100%',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(180deg, #0F0F23 0%, #1A0F2E 30%, #2D1B3D 60%, #1A0F2E 90%, #0F0F23 100%)'
                    : 'linear-gradient(180deg, #FDF2F8 0%, #F8FAFC 30%, #FEFEFE 60%, #F8FAFC 90%, #FDF2F8 100%)',
                color: theme.palette.text.primary,
                borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                boxShadow: theme.palette.mode === 'dark'
                    ? 'inset -4px 0 8px rgba(158, 35, 222, 0.1)'
                    : 'inset -4px 0 8px rgba(141, 23, 24, 0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, rgba(158, 35, 222, 0.05) 0%, transparent 50%, rgba(255, 107, 107, 0.05) 100%)'
                        : 'linear-gradient(45deg, rgba(141, 23, 24, 0.05) 0%, transparent 50%, rgba(78, 205, 196, 0.05) 100%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                    mt: 1,
                    mb: 2,
                    padding: 2,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.1), rgba(255, 107, 107, 0.1))'
                        : 'linear-gradient(135deg, rgba(141, 23, 24, 0.1), rgba(78, 205, 196, 0.1))',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <SportsEsportsIcon
                    fontSize="large"
                    sx={{
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #9E23DE, #FF6B6B)'
                            : 'linear-gradient(135deg, #8d1718, #8d1718)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '2rem',
                    }}
                />
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #FFFFFF, #E0E0E0)'
                            : 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    GAME HUB
                </Typography>
            </Box>

            <List dense sx={{ position: 'relative', zIndex: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.label}
                        selected={selectedItem === item.label}
                        onClick={() => setSelectedItem(item.label)}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            mb: 1,
                            transition: 'all 0.3s ease',
                            background: selectedItem === item.label
                                ? (theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.3), rgba(255, 107, 107, 0.3))'
                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 0.3), rgba(78, 205, 196, 0.3))')
                                : 'transparent',
                            border: selectedItem === item.label
                                ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.5)' : 'rgba(141, 23, 24, 0.5)'}`
                                : '1px solid transparent',
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.1), rgba(255, 107, 107, 0.1))'
                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 0.1), rgba(78, 205, 196, 0.1))',
                                transform: 'translateX(4px)',
                                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                            },
                            '&.Mui-selected': {
                                '& .MuiListItemIcon-root': {
                                    color: theme.palette.mode === 'dark' ? '#FF6B6B' : '#8d1718',
                                },
                                '& .MuiListItemText-root': {
                                    '& .MuiTypography-root': {
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                    },
                                },
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: selectedItem === item.label
                                    ? (theme.palette.mode === 'dark' ? '#FF6B6B' : '#8d1718')
                                    : theme.palette.text.secondary,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}

                <Divider
                    component="li"
                    sx={{
                        mt: 2,
                        mb: 2,
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, transparent, rgba(158, 35, 222, 0.5), transparent)'
                            : 'linear-gradient(90deg, transparent, rgba(141, 23, 24, 0.5), transparent)',
                        height: '2px',
                        border: 'none',
                    }}
                />

                <ListItemButton
                    selected={selectedItem === "İstatistikler"}
                    onClick={() => setSelectedItem("İstatistikler")}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        background: selectedItem === "İstatistikler"
                            ? (theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.3), rgba(255, 107, 107, 0.3))'
                                : 'linear-gradient(135deg, rgba(141, 23, 24, 0.3), rgba(78, 205, 196, 0.3))')
                            : 'transparent',
                        border: selectedItem === "İstatistikler"
                            ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.5)' : 'rgba(141, 23, 24, 0.5)'}`
                            : '1px solid transparent',
                        '&:hover': {
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.1), rgba(255, 107, 107, 0.1))'
                                : 'linear-gradient(135deg, rgba(141, 23, 24, 0.1), rgba(78, 205, 196, 0.1))',
                            transform: 'translateX(4px)',
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                        },
                        '& .MuiListItemIcon-root': {
                            color: selectedItem === "İstatistikler"
                                ? (theme.palette.mode === 'dark' ? '#FF6B6B' : '#8d1718')
                                : theme.palette.text.secondary,
                        },
                        '& .MuiListItemText-root': {
                            '& .MuiTypography-root': {
                                fontWeight: selectedItem === "İstatistikler" ? 'bold' : 'normal',
                                color: theme.palette.text.primary,
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <LeaderboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="İstatistikler" />
                </ListItemButton>
            </List>


        </Box>
    );
}
