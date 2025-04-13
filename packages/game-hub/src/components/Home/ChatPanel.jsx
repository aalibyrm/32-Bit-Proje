// src/components/ChatPanel.jsx
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material';

const messages = [
    {
        name: 'Jane Cooper',
        msg: 'He always starts his morning with a cup of coffee ☕',
        avatar: 'https://i.pravatar.cc/40?img=1',
        time: '12:34',
    },
    {
        name: 'Darlene Robertson',
        msg: 'A casino is a facility for certain types of gambling 🎰',
        avatar: 'https://i.pravatar.cc/40?img=2',
        time: '12:35',
    },
    {
        name: 'Annette Black',
        msg: 'My favorite color is blue because it reminds me of the ocean 🌊',
        avatar: 'https://i.pravatar.cc/40?img=3',
        time: '12:36',
    },
];

export default function ChatPanel() {
    return (
        <Box p={2}>
            <Typography variant="h6" gutterBottom>
                Aktif Sohbet
            </Typography>
            <List>
                {messages.map((msg, i) => (
                    <ListItem alignItems="flex-start" key={i}>
                        <ListItemAvatar>
                            <Avatar src={msg.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${msg.name} • ${msg.time}`}
                            secondary={msg.msg}
                            sx={{ color: 'white' }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
