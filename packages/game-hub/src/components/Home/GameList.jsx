import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    Stack,
    Menu,
    IconButton,
    MenuItem,
    InputBase,
    Button,
    Avatar,
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';

import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThemeToggleButton from '../ThemeToggleButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import News from './News';

const allGames = [
    { title: 'Tombala', img: 'https://placehold.co/80x80?text=Tombala', desc: 'Hızlı oyun, büyük ödül!' },
    { title: 'Satranç', img: 'https://placehold.co/80x80?text=Satranç', desc: 'Zeka savaşları!' },
    { title: 'Mangala', img: 'https://placehold.co/80x80?text=Mangala', desc: 'Strateji ve hız!' },
    { title: 'Zuma', img: 'https://placehold.co/80x80?text=Zuma', desc: 'Strateji ve hız!' },
    { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' },
];

const chessStats = [
    { player: 'Ahmet Y.', score: 1580 },
    { player: 'Elif K.', score: 1460 },
    { player: 'Berk A.', score: 1435 },
    { player: 'Zeynep M.', score: 1390 },
    { player: 'Mehmet C.', score: 1340 },
];

export default function GameList() {
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
        <Box p={2} sx={{
            overflowY: 'auto', height: '100%',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeToggleButton />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

                <Box display="flex" alignItems="center" gap={2}>

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

            </Box>


            <Box sx={{ my: 3 }}>
                <News />
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" color="text.primary" sx={{ mr: 2 }}>
                        Oyunlar
                    </Typography>

                    <Button
                        startIcon={<StarIcon />}
                        sx={{
                            backgroundColor: '#E5A000',
                            color: 'white',
                            borderRadius: 5,
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#f39c12' },
                        }}
                    >
                        Favoriler
                    </Button>
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button variant="contained" sx={{
                        backgroundColor: '#1c1c1c',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: 8,
                        px: 2,
                        '&:hover': { backgroundColor: '#333' },
                    }}>
                        Tümünü gör
                    </Button>

                    <IconButton sx={{ backgroundColor: '#2d2d2d', color: 'white' }}>
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Avatar
                        sx={{
                            bgcolor: '#3a3a3a',
                            width: 36,
                            height: 36,
                            fontSize: 18,
                        }}
                    >
                        1
                    </Avatar>
                    <IconButton sx={{ backgroundColor: '#b44fff', color: 'white' }}>
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>

                </Box>
            </Box>



            <Box mb={3}>
                <Stack direction="row" spacing={2} overflow="auto">
                    {allGames.map((game, idx) => (
                        <Box key={idx} sx={{ textAlign: 'center' }}>
                            <Card
                                sx={{
                                    width: 140,
                                    height: 140,
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={game.img}
                                    alt={game.title}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Card>
                            <Typography variant="subtitle1" fontWeight="bold" mt={1} color="text.primary">
                                {game.title}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Box>
                <Typography variant="h6" mb={1} color="text.primary">
                    İstatistikler
                </Typography>
                <Grid container spacing={2}>
                    {chessStats.map((stat, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                            <Card
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {stat.player}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ELO Skoru: {stat.score}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
