import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Select,
    MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CasinoIcon from '@mui/icons-material/Casino';
import StarIcon from '@mui/icons-material/Star';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Sidebar() {
    const theme = useTheme();

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

            <List dense>
                <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                        <CasinoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tüm Oyunlar" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorileriniz" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                        <TableRestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Masa Oyunları" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Etkinlik Oyunları" />
                </ListItemButton>
            </List>


            <Box mt="auto">
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Dil
                </Typography>

                <Select
                    fullWidth
                    defaultValue="tr"
                    sx={{
                        color: theme.palette.text.primary,
                        bgcolor: theme.palette.background.default,
                        mb: 2,
                    }}
                >
                    <MenuItem value="tr">🇹🇷 Türkçe</MenuItem>
                    <MenuItem value="en">🇺🇸 English</MenuItem>
                </Select>
            </Box>
        </Box>
    );
}
