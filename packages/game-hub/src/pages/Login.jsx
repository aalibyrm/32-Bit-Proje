import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ThemeContext } from '@emotion/react';
import ThemeToggleButton from '../components/ThemeToggleButton';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

    const { mode } = useContext(ThemeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login', {
                email,
                password,
                rememberMe
            });

            if (response) {
                navigate('/home');
            } else {
                alert('Giriş başarısız');
            }


        } catch (error) {
            console.error('İstek hatası:', error);
        }
    }

    return (

        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            position: 'relative'
        }}>

            <Box sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 1
            }}>
                <ThemeToggleButton />
            </Box>
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >

                <Grid
                    container
                    sx={{
                        maxWidth: { xs: '100%', md: '80%' },
                        height: { md: '70vh' },
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 8
                    }}
                >

                    {mode === "light" ? (<Grid
                        item
                        xs={false}
                        sm={5}
                        md={6}
                        sx={{
                            backgroundImage: "url('/assets/lightLogo.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    />) : (<Grid
                        item
                        xs={false}
                        sm={5}
                        md={6}
                        sx={{
                            backgroundImage: "url('/assets/darkLogo.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    />)}

                    <Grid
                        item
                        xs={12}
                        sm={7}
                        md={6}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                px: { xs: 4, sm: 6, md: 8 },
                                py: 6,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                                Giriş
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Hoş geldiniz!
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} >
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="E-posta Adresi"
                                    autoFocus
                                    size="small"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Şifre"
                                    type="password"
                                    size="small"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required
                                />

                                <Box sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={rememberMe}
                                            onChange={(e) => { setRememberMe(e.target.checked) }}
                                        />}
                                        label="Beni hatırla"
                                    />
                                    <Link href="#" underline="hover" variant="body2" >
                                        Şifremi Unuttum
                                    </Link>
                                </Box>

                                <Button
                                    fullWidth
                                    type='submit'
                                    variant="contained"
                                    sx={{ mt: 4, mb: 2 }}
                                >
                                    Giriş Yap
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}

export default Login