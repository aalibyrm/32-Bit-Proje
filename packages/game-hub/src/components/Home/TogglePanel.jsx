import { Box, Tabs, Tab, Divider } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ChatPanel from './ChatPanel';
import LobbyPanel from './LobbyPanel';

export default function TogglePanel() {
    const [tab, setTab] = useState(0);
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            <Tabs
                value={tab}
                onChange={(e, val) => setTab(val)}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Sohbet" />
                <Tab label="Lobi" />
            </Tabs>
            <Divider />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {tab === 0 ? <ChatPanel /> : <LobbyPanel />}
            </Box>
        </Box>
    );
}
