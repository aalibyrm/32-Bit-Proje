import React, { useRef, useEffect, useState } from 'react'
import api from '../../api/api'
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Box, IconButton, Card, CardContent, Typography, CardMedia, CardActionArea } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';

const News = () => {
    const theme = useTheme();
    const [haberler, setHaberler] = useState([]);

    // Haberleri çek
    useEffect(() => {
        async function getNews() {
            try {
                const res = await api.get("http://localhost:4000/haberler", { withCredentials: true });
                setHaberler(res.data)
            } catch (error) {
                console.error("Haberler alınırken hata oluştu:", error);
            }
        }

        getNews();
    }, [])

    // Keen Slider + autoplay
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        mode: "free-snap", // veya "free"
        slides: {
            perView: 1.5,     // Ortadaki slayt + yanlarda 0.25'er slayt göstermek için
            spacing: 15,
            origin: "center", // Ortalamak için önemli!
        },
    })


    const timeout = useRef(null);
    const [pause, setPause] = useState(false);

    const autoplay = () => {
        clearTimeout(timeout.current);
        if (!pause && slider.current) {
            timeout.current = setTimeout(() => {
                slider.current?.next();
            }, 3000);
        }
    };

    useEffect(() => {
        autoplay();
        return () => clearTimeout(timeout.current);
    }, [slider, pause]);

    useEffect(() => {
        if (slider.current) {
            slider.current.update();
        }
    }, [haberler]);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "visible",     // taşmayı göster
                margin: "0 auto",         // ortala
            }}
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
        >

            {pause && (
                <>
                    <IconButton
                        onClick={() => slider.current?.prev()}
                        sx={{
                            position: "absolute",
                            top: "45%",
                            left: 0,
                            zIndex: 1,
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.8), rgba(255, 107, 107, 0.8))'
                                : 'linear-gradient(135deg, rgba(141, 23, 24, 0.8), rgba(141, 23, 24, 0.8))',
                            color: '#ffffff',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 1), rgba(255, 107, 107, 1))'
                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 1), rgba(141, 23, 24, 1))',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton
                        onClick={() => slider.current?.next()}
                        sx={{
                            position: "absolute",
                            top: "45%",
                            right: 0,
                            zIndex: 1,
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.8), rgba(255, 107, 107, 0.8))'
                                : 'linear-gradient(135deg, rgba(141, 23, 24, 0.8), rgba(141, 23, 24, 0.8))',
                            color: '#ffffff',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 1), rgba(255, 107, 107, 1))'
                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 1), rgba(141, 23, 24, 1))',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                </>)}


            {/* Slaytlar */}
            <Box ref={sliderRef} className="keen-slider">
                {haberler.map((haber, index) => (
                    <Card
                        key={index}
                        className="keen-slider__slide"
                        sx={{
                            width: "90%",            // tam genişlik yerine %90 yap
                            margin: "0 auto",        // ortala
                            borderRadius: 4,
                            overflow: "hidden",
                            background: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 8px 32px rgba(158, 35, 222, 0.1)'
                                : '0 8px 32px rgba(141, 23, 24, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 12px 40px rgba(158, 35, 222, 0.2)'
                                    : '0 12px 40px rgba(141, 23, 24, 0.2)',
                                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.4)' : 'rgba(141, 23, 24, 0.4)'}`,
                            },
                        }}
                    >
                        <CardActionArea component="a" href={haber.link} target="_blank" rel="noopener noreferrer">
                            <CardMedia
                                component="img"
                                sx={{
                                    objectFit: "cover",
                                    width: "100%",
                                    filter: 'brightness(0.9)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        filter: 'brightness(1.1)',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                                image={haber.image}
                            />
                            <CardContent sx={{
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(42, 27, 61, 0.95))'
                                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 244, 246, 0.95))',
                                backdropFilter: 'blur(10px)',
                            }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, #FFFFFF, #E0E0E0)'
                                            : 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {haber.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default News;
