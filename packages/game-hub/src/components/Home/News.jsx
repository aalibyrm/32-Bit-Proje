import React, { useRef, useEffect, useState } from 'react'
import api from '../../api/api'
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Box, IconButton, Card, CardContent, Typography, CardMedia, CardActionArea } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const News = () => {
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
                        sx={{ position: "absolute", top: "45%", left: 0, zIndex: 1 }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton
                        onClick={() => slider.current?.next()}
                        sx={{ position: "absolute", top: "45%", right: 0, zIndex: 1 }}
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
                        }}
                    >
                        <CardActionArea component="a" href={haber.link} target="_blank" rel="noopener noreferrer">
                            <CardMedia
                                component="img"
                                sx={{ objectFit: "cover", width: "100%" }}
                                image={haber.image}
                            />
                            <CardContent>
                                <Typography variant="h5">{haber.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default News;
