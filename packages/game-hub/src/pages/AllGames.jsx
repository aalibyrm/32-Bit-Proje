import React from 'react'
import { Box, Grid } from '@mui/material';
import Sidebar from '../components/Home/Sidebar';
import TogglePanel from '../components/Home/TogglePanel';
import AllGamesList from '../components/AllGames/AllGamesList';

function AllGames() {

    return (
        <Box display="flex" flexDirection="column" height="100vh">

            <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>

                <Grid item xs={1.8} sx={{ height: '100%' }}>
                    <Sidebar />
                </Grid>


                <Grid item xs={7.7} sx={{ height: '100%', overflowY: 'auto' }}>
                    <AllGamesList />
                </Grid>

                <Grid item xs={2.5} sx={{ height: '100%' }}>
                    <TogglePanel />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AllGames