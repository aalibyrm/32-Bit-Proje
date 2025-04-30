import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const messages = [
    {
        name: 'Jane Cooper',
        msg: 'Lorem, ipsum dolor.',
        avatar: 'https://i.pravatar.cc/40?img=1',
        time: '12:34',
    },
    {
        name: 'Annette Black',
        msg: 'Lorem ipsum dolor sit amet.',
        avatar: 'https://i.pravatar.cc/40?img=3',
        time: '12:36',
    },
];

export default function ChatPanel() {
    const theme = useTheme();

    return (
        <Box p={2}>
            <Typography variant="h6" gutterBottom color="text.primary">
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
                            sx={{ color: theme.palette.text.primary }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
