import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EventIcon from '@mui/icons-material/Event';

const Countdown = ({ date }) => {
    const [hoursDifference, setHoursDifference] = useState('');

    useEffect(() => {
        const calculateDifference = () => {
            const now = new Date();
            const targetDate = new Date(date);

            const diffInMs = targetDate - now;
            const diffInSeconds = Math.floor(diffInMs / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInMs <= 0) {
                setHoursDifference("Başladı");
            } else if (diffInDays > 0) {
                const tarih = targetDate.toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });
                setHoursDifference(tarih);

            } else if (diffInHours > 0) {
                const remainingMinutes = diffInMinutes % 60;
                setHoursDifference(`${diffInHours} saat ${remainingMinutes} dakika kaldı`);
            } else if (diffInMinutes > 0) {
                const remainingSeconds = diffInSeconds % 60;
                setHoursDifference(`${diffInMinutes} dakika ${remainingSeconds} saniye kaldı`);
            } else {
                setHoursDifference(`${diffInSeconds} saniye kaldı`);
            }
        }

        calculateDifference();

        const interval = setInterval(calculateDifference, 1000);

        return () => clearInterval(interval);
    }, [date])

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EventIcon sx={{ mr: 1 }} />

            <Typography variant="body2" >
                {hoursDifference}
            </Typography>
        </Box >
    )
}

export default Countdown