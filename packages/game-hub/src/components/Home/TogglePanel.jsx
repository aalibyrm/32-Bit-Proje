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
                borderLeft: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(180deg, #0F0F23 0%, #1A0F2E 25%, #2D1B3D 50%, #1A0F2E 75%, #0F0F23 100%)'
                    : 'linear-gradient(180deg, #FDF2F8 0%, #F8FAFC 25%, #FEFEFE 50%, #F8FAFC 75%, #FDF2F8 100%)',
                color: theme.palette.text.primary,
                position: 'relative',
                boxShadow: theme.palette.mode === 'dark'
                    ? 'inset 4px 0 8px rgba(158, 35, 222, 0.1)'
                    : 'inset 4px 0 8px rgba(141, 23, 24, 0.1)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.05) 0%, transparent 30%, rgba(255, 107, 107, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(141, 23, 24, 0.05) 0%, transparent 30%, rgba(78, 205, 196, 0.05) 100%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 15, 46, 0.95))'
                        : 'linear-gradient(135deg, rgba(253, 242, 248, 0.95), rgba(248, 250, 252, 0.95))',
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                    borderRadius: '0 0 16px 0',
                }}
            >
                <Tabs
                    value={tab}
                    onChange={(e, val) => setTab(val)}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        '& .MuiTabs-root': {
                            position: 'relative',
                        },
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '2px 2px 0 0',
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(90deg, #9E23DE, #FF6B6B, #4ECDC4)'
                                : 'linear-gradient(90deg, #8d1718, #8d1718, #8d1718)',
                        },
                        '& .MuiTab-root': {
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            minHeight: '64px',
                            transition: 'all 0.3s ease',
                            color: theme.palette.text.secondary,
                            position: 'relative',
                            '&.Mui-selected': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.1), rgba(255, 107, 107, 0.1))'
                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 0.1), rgba(78, 205, 196, 0.1))',
                                color: theme.palette.text.primary,
                                fontWeight: 'bold',
                            },
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'rgba(158, 35, 222, 0.05)'
                                    : 'rgba(141, 23, 24, 0.05)',
                                color: theme.palette.text.primary,
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '0',
                                height: '0',
                                background: theme.palette.mode === 'dark'
                                    ? 'radial-gradient(circle, rgba(158, 35, 222, 0.2) 0%, transparent 70%)'
                                    : 'radial-gradient(circle, rgba(141, 23, 24, 0.2) 0%, transparent 70%)',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                                transition: 'all 0.3s ease',
                                pointerEvents: 'none',
                            },
                            '&:hover::before': {
                                width: '100px',
                                height: '100px',
                            },
                        },
                    }}
                >
                    <Tab
                        label="🎮 Lobi"
                        sx={{
                            '&.Mui-selected': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.15), rgba(255, 107, 107, 0.15))'
                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 0.15), rgba(78, 205, 196, 0.15))',
                            },
                        }}
                    />
                    <Tab
                        label="💬 Sohbet"
                        sx={{
                            '&.Mui-selected': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(78, 205, 196, 0.15))'
                                    : 'linear-gradient(135deg, rgba(78, 205, 196, 0.15), rgba(69, 183, 209, 0.15))',
                            },
                        }}
                    />
                </Tabs>
            </Box>

            <Divider
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, transparent, rgba(158, 35, 222, 0.5), rgba(255, 107, 107, 0.5), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(141, 23, 24, 0.5), rgba(78, 205, 196, 0.5), transparent)',
                    height: '2px',
                    border: 'none',
                }}
            />

            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: theme.palette.mode === 'dark'
                            ? 'rgba(158, 35, 222, 0.1)'
                            : 'rgba(141, 23, 24, 0.1)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(180deg, rgba(158, 35, 222, 0.5), rgba(255, 107, 107, 0.5))'
                            : 'linear-gradient(180deg, rgba(141, 23, 24, 0.5), rgba(78, 205, 196, 0.5))',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(180deg, rgba(158, 35, 222, 0.8), rgba(255, 107, 107, 0.8))'
                            : 'linear-gradient(180deg, rgba(141, 23, 24, 0.8), rgba(78, 205, 196, 0.8))',
                    },
                }}
            >
                {tab === 0 ? <LobbyPanel /> : <ChatPanel />}
            </Box>
        </Box>
    );
}
