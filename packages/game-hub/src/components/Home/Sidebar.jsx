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
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRight: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
            }}
        >
            <Box display="flex" alignItems="center" gap={2} sx={{ mt: 1, mb: 2 }}>
                <SportsEsportsIcon fontSize="large" sx={{ color: theme.palette.primary.main, ml: 2 }} />
                <Typography variant="h6" fontWeight={700} sx={{ mr: 2 }}>
                    GAME HUB
                </Typography>
            </Box>

            <List dense>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.label}
                        selected={selectedItem === item.label}
                        onClick={() => setSelectedItem(item.label)}
                        sx={{
                            py: 1,
                            borderRadius: 2,
                            mb: 1,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                            '&.Mui-selected': {
                                '& .MuiListItemIcon-root': {
                                    color: theme.palette.action.selected,
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: selectedItem === item.label ? '#fff' : '#c9cbd1' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}

                <Divider component="li" sx={{ mt: 2, mb: 2 }} />

                <ListItemButton
                    selected={selectedItem === "İstatistikler"}
                    onClick={() => setSelectedItem("İstatistikler")}
                    sx={{
                        py: 1,
                        borderRadius: 2,
                        color: selectedItem === "İstatistikler" ? '#fff' : theme.palette.text.primary,
                        bgcolor: selectedItem === "İstatistikler" ? theme.palette.primary.main : 'transparent',
                        '& .MuiListItemIcon-root': {
                            color: selectedItem === "İstatistikler" ? '#fff' : '#c9cbd1',
                        }
                    }}
                >
                    <ListItemIcon>
                        <LeaderboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="İstatistikler" />
                </ListItemButton>
            </List>

            {/* Dil seçici bölümü vs. aşağıda kalabilir */}
        </Box>
    );
}
