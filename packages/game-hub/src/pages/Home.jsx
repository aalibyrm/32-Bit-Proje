import React from 'react'
import { Box, Grid } from '@mui/material';
import Navbar from '../components/Home/Navbar';
import GameList from '../components/Home/GameList';
import TogglePanel from '../components/Home/TogglePanel';
import Sidebar from '../components/Home/Sidebar';

function Home() {
    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Navbar />
            <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>

                <Grid item xs={2.2} sx={{ height: '100%' }}>
                    <Sidebar />
                </Grid>


                <Grid item xs={7.3} sx={{ height: '100%', overflowY: 'auto' }}>
                    <GameList />
                </Grid>

                <Grid item xs={2.5} sx={{ height: '100%' }}>
                    <TogglePanel />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home