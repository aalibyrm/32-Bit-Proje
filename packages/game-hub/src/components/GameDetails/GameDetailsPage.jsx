import React from 'react'
import { useGames } from '../../games/GameContext';
import { Box } from '@mui/material';
import Details from './Details';
import Navbar from '../Home/Navbar';

const GameDetailsPage = (props) => {
    const { id } = props;
    const { games, error } = useGames();
    const game = games.find(game => game.id == id);

    return (
        <Box p={2} sx={{ overflowY: 'auto', height: '100%', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <Box><Navbar /></Box>
            <Box sx={{ my: 3 }}> {game && <Details game={game} />}</Box>
        </Box>
    )
}

export default GameDetailsPage