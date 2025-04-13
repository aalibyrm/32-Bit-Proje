// src/components/Sidebar.jsx
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
import CasinoIcon from '@mui/icons-material/Casino';
import StarIcon from '@mui/icons-material/Star';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';


export default function Sidebar() {
    return (
        <Box
            sx={{
                height: '100%',
                bgcolor: 'background.paper',
                borderRight: '1px solid #2a2d34',
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
            }}
        >
            {/* 🎰 Slots Section */}
            <List dense>
                <ListItemButton>
                    <ListItemIcon>
                        <CasinoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tüm Oyunlar" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorileriniz" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <TableRestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Masa Oyunları" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
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
                        color: 'text.primary',

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
