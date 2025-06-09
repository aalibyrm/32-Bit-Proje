import React from 'react'
import { useGames } from '../../games/GameContext';
import { Box } from '@mui/material';
import Details from './Details';
import Navbar from '../Home/Navbar';
import { useTheme } from '@mui/material/styles';

const GameDetailsPage = (props) => {
    const { id } = props;
    const { games, error } = useGames();
    const game = games.find(game => game.id == id);
    const theme = useTheme();

    return (
        <Box
            p={2}
            sx={{
                overflowY: 'auto',
                height: '100%',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                background: theme.palette.background.default,
                backgroundAttachment: 'fixed',
                minHeight: '100vh'
            }}
        >
            <Box>
                <Navbar />
            </Box>
            <Box sx={{ my: 3 }}>
                {game && <Details game={game} />}
            </Box>
        </Box>
    )
}

export default GameDetailsPage