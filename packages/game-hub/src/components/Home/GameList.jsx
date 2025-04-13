// src/components/GameList.jsx
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Stack,
} from '@mui/material';

// 🧩 Favori Oyunlar
const favoriteGames = [
    {
        title: 'Tombala',
        img: 'https://placehold.co/80x80?text=Tombala',
        desc: 'Hızlı oyun, büyük ödül!',
    },
    {
        title: 'Satranç',
        img: 'https://placehold.co/80x80?text=Satranç',
        desc: 'Zeka savaşları!',
    },
];

const allGames = [
    {
        title: 'Tombala',
        img: 'https://placehold.co/80x80?text=Tombala',
        desc: 'Hızlı oyun, büyük ödül!',
    },
    {
        title: 'Satranç',
        img: 'https://placehold.co/80x80?text=Satranç',
        desc: 'Zeka savaşları!',
    },
    {
        title: 'Mangala',
        img: 'https://placehold.co/80x80?text=Mangala',
        desc: 'Strateji ve hız!',
    },
    {
        title: 'Zuma',
        img: 'https://placehold.co/80x80?text=Zuma',
        desc: 'Strateji ve hız!',
    },
    {
        title: 'Uno',
        img: 'https://placehold.co/80x80?text=Uno',
        desc: 'Strateji ve hız!',
    },
];

// ♟️ Satranç İstatistikleri
const chessStats = [
    { player: 'Ahmet Y.', score: 1580 },
    { player: 'Elif K.', score: 1460 },
    { player: 'Berk A.', score: 1435 },
    { player: 'Zeynep M.', score: 1390 },
    { player: 'Mehmet C.', score: 1340 },
];

export default function GameList() {
    return (
        <Box p={2} sx={{
            overflowY: 'auto', height: '100%', overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
        }}>


            {/* ❤️ En Çok Sevilenler */}
            <Box mb={3}>
                <Typography variant="h6" mb={1}>
                    En Çok Sevilenler
                </Typography>
                <Stack direction="row" spacing={2} overflow="auto">
                    {favoriteGames.map((game, idx) => (
                        <Box key={idx} sx={{ textAlign: 'center' }}>
                            <Card
                                sx={{
                                    width: 140,
                                    height: 140,
                                    bgcolor: '#1a1d23',
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
                            <Typography variant="subtitle1" fontWeight="bold" mt={1} color="white">
                                {game.title}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>

            {/* Tüm Oyunlar */}

            <Box mb={3}>
                <Typography variant="h6" mb={1}>
                    Tüm Oyunlar
                </Typography>
                <Stack direction="row" spacing={2} overflow="auto">
                    {allGames.map((game, idx) => (
                        <Box key={idx} sx={{ textAlign: 'center' }}>
                            <Card
                                sx={{
                                    width: 140,
                                    height: 140,
                                    bgcolor: '#1a1d23',
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
                            <Typography variant="subtitle1" fontWeight="bold" mt={1} color="white">
                                {game.title}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>


            {/* 📊 İstatistikler */}
            <Box>
                <Typography variant="h6" mb={1}>
                    İstatistikler
                </Typography>
                <Grid container spacing={2}>
                    {chessStats.map((stat, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                            <Card
                                sx={{
                                    bgcolor: '#1a1d23',
                                    color: 'white',
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
