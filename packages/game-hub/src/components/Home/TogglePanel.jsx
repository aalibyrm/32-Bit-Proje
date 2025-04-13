// src/components/TogglePanel.jsx
import { Box, Tabs, Tab, Divider } from '@mui/material';
import { useState } from 'react';
import ChatPanel from './ChatPanel';
import LobbyPanel from './LobbyPanel';

export default function TogglePanel() {
    const [tab, setTab] = useState(0);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid #2a2d34',
            }}
        >
            <Tabs
                value={tab}
                onChange={(e, val) => setTab(val)}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Chat" />
                <Tab label="Lobbies" />
            </Tabs>
            <Divider />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {tab === 0 ? <ChatPanel /> : <LobbyPanel />}
            </Box>
        </Box>
    );
}
