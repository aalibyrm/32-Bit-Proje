import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Avatar, Button, Checkbox, Container, Divider, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import ThemeToggleButton from '../components/ThemeToggleButton';
import AuthContext from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { AlertContext } from '../alert/AlertContext';

function Login() {

    const theme = useTheme();
    const mode = theme.palette.mode;
    const { login, rememberToken, rememberUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, rememberMe);
    }

    const handleClick = () => {
        navigate("/fast-login", { replace: true });
    }

    useEffect(() => {
        rememberToken();
    }, []);

    const resetPassword = () => {
        showAlert('Sıfırlama bağlantısı gönderildi', 'success');
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
                                px: { xs: 4, sm: 6, md: 6 },
                                py: 4,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                                Giriş
                            </Typography>

                            {
                                rememberUser ?
                                    <Box>

                                        <Box
                                            onClick={handleClick}
                                            sx={{
                                                p: 2,
                                                borderRadius: 10,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' ? '#0d0d0d' : '#e0e0e0',
                                                },
                                            }}
                                        >
                                            <Avatar sx={{ width: 48, height: 48 }} src="/broken-image.jpg" />
                                            <Box>
                                                <Typography variant="body2" >
                                                    {rememberUser}
                                                </Typography>
                                                <Typography variant="caption">
                                                    Bu hesapla devam edin
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mt: 2.5,

                                            }}
                                        >
                                            <Divider sx={{ backgroundColor: 'red', flex: 1, }} />
                                            <Typography sx={{ px: 1, fontSize: '0.8rem' }}>veya</Typography>
                                            <Divider sx={{ flex: 1 }} />
                                        </Box>

                                    </Box>
                                    :
                                    <Typography variant="body2" gutterBottom>
                                        Hoş geldiniz!
                                    </Typography>
                            }


                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                {forgotPassword ? (
                                    <>
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
                                            <Link underline="hover" variant="body2" onClick={() => setForgotPassword(false)}
                                                sx={{ cursor: 'pointer' }}>
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
                                    </>
                                ) : (
                                    <>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="E-posta Adresi"
                                            autoFocus
                                            size="small"
                                            required
                                        />
                                        <Box sx={{
                                            mt: 2,
                                            display: 'flex',
                                            justifyContent: 'end',
                                            alignItems: 'center'
                                        }}>

                                            <Link onClick={() => setForgotPassword(true)} underline="hover" variant="body2" sx={{
                                                cursor: 'pointer'
                                            }}>
                                                Giriş Yap
                                            </Link>
                                        </Box>
                                        <Button
                                            fullWidth

                                            variant="contained"
                                            sx={{ mt: 4, mb: 2 }}
                                            onClick={() => resetPassword()}
                                        >
                                            Sıfırla
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Box >
    )
}

export default Login