import {
    Box,
    Typography,
    List,
    ListItem,
    TextField,
    IconButton,
    Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';

const messages = [
    {
        id: 1,
        name: 'Jane Cooper',
        msg: 'Merhaba arkadaşlar! Bugün hangi oyunu oynayacağız? 🎮',
        avatar: 'https://i.pravatar.cc/40?img=1',
        time: '12:34',
        isOnline: true,
        isMe: false,
    },
    {
        id: 2,
        name: 'Sen',
        msg: 'Tombala oyunu çok eğlenceli görünüyor, katılmak istiyorum! 😊',
        avatar: 'https://i.pravatar.cc/40?img=8',
        time: '12:36',
        isOnline: true,
        isMe: true,
    },
    {
        id: 3,
        name: 'Annette Black',
        msg: 'Harika! Ben de katılıyorum. Saat kaçta başlıyoruz?',
        avatar: 'https://i.pravatar.cc/40?img=3',
        time: '12:38',
        isOnline: true,
        isMe: false,
    },
    {
        id: 4,
        name: 'Robert Fox',
        msg: 'Yeni etkinlik lobisi açtım, herkesi bekliyorum! 🔥',
        avatar: 'https://i.pravatar.cc/40?img=5',
        time: '12:40',
        isOnline: false,
        isMe: false,
    }
];

export default function ChatPanel() {
    const theme = useTheme();
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState(messages);
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: chatMessages.length + 1,
                name: 'Sen',
                msg: message,
                avatar: 'https://i.pravatar.cc/40?img=8',
                time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                isOnline: true,
                isMe: true,
            };
            setChatMessages([...chatMessages, newMessage]);
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: theme.palette.background.default,
                overflow: 'hidden',
                overflowX: 'hidden',
                position: 'relative',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.05)' : 'rgba(141, 23, 24, 0.05)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 0,
                }
            }}
        >


            {/* Messages Area */}
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                p: 1,
                position: 'relative',
                zIndex: 1,
                '&::-webkit-scrollbar': {
                    width: 6,
                },
                '&::-webkit-scrollbar-track': {
                    background: theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.1)' : 'rgba(141, 23, 24, 0.1)',
                    borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)',
                    borderRadius: 3,
                    '&:hover': {
                        background: theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.5)' : 'rgba(141, 23, 24, 0.5)',
                    }
                }
            }}>
                <List sx={{ p: 0, overflowX: 'hidden' }}>
                    {chatMessages.map((msg) => (
                        <ListItem
                            key={msg.id}
                            sx={{
                                mb: 1,
                                p: 1,
                                alignItems: 'flex-start',
                                flexDirection: msg.isMe ? 'row-reverse' : 'row',
                            }}
                        >
                            <Box sx={{
                                maxWidth: '85%',
                                textAlign: msg.isMe ? 'right' : 'left',
                                width: '100%',
                                overflowX: 'hidden'
                            }}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        background: msg.isMe
                                            ? theme.palette.background.primaryGradient
                                            : theme.palette.background.paper,
                                        color: msg.isMe ? 'white' : theme.palette.text.primary,
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                                        position: 'relative',
                                        animation: 'messageSlideIn 0.3s ease-out',
                                        '@keyframes messageSlideIn': {
                                            '0%': {
                                                opacity: 0,
                                                transform: msg.isMe ? 'translateX(20px)' : 'translateX(-20px)'
                                            },
                                            '100%': {
                                                opacity: 1,
                                                transform: 'translateX(0)'
                                            },
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: msg.isMe ? 'rgba(255,255,255,0.9)' : theme.palette.primary.main
                                            }}
                                        >
                                            {msg.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: msg.isMe ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary,
                                                fontSize: '0.7rem'
                                            }}
                                        >
                                            {msg.time}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: msg.isMe ? 'white' : theme.palette.text.primary,
                                            lineHeight: 1.4,
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {msg.msg}
                                    </Typography>
                                </Paper>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{
                p: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                zIndex: 1,
                background: theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>

                    <TextField
                        fullWidth
                        multiline
                        maxRows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Mesajınızı yazın..."
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                background: theme.palette.background.default,
                                backdropFilter: 'blur(10px)',
                                '& fieldset': {
                                    border: `1px solid ${theme.palette.divider}`,
                                },
                                '&:hover fieldset': {
                                    border: `1px solid ${theme.palette.primary.light}`,
                                },
                                '&.Mui-focused fieldset': {
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.1)' : 'rgba(141, 23, 24, 0.1)'}`,
                                },
                                '& input::placeholder': {
                                    color: theme.palette.text.secondary,
                                    opacity: 0.7,
                                }
                            },
                            '& .MuiInputBase-input': {
                                color: theme.palette.text.primary,
                                fontSize: '0.9rem',
                            }
                        }}
                    />

                    <IconButton
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        sx={{
                            background: message.trim()
                                ? theme.palette.background.primaryGradient
                                : theme.palette.action.disabled,
                            color: 'white',
                            width: 48,
                            height: 48,
                            '&:hover': {
                                background: message.trim()
                                    ? theme.palette.background.primaryGradient
                                    : theme.palette.action.disabled,
                                transform: message.trim() ? 'scale(1.05)' : 'none',
                                filter: message.trim() ? 'brightness(1.1)' : 'none',
                            },
                            '&:disabled': {
                                color: theme.palette.text.secondary,
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
