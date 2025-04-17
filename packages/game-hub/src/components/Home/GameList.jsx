import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const favoriteGames = [
    { title: 'Tombala', img: 'https://placehold.co/80x80?text=Tombala', desc: 'Hızlı oyun, büyük ödül!' },
    { title: 'Satranç', img: 'https://placehold.co/80x80?text=Satranç', desc: 'Zeka savaşları!' },
];

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

    return (
        <Box p={2} sx={{
            overflowY: 'auto', height: '100%',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}>

            <Box mb={3}>
                <Typography variant="h6" mb={1} color="text.primary">
                    En Çok Sevilenler
                </Typography>
                <Stack direction="row" spacing={2} overflow="auto">
                    {favoriteGames.map((game, idx) => (
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


            <Box mb={3}>
                <Typography variant="h6" mb={1} color="text.primary">
                    Tüm Oyunlar
                </Typography>
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
