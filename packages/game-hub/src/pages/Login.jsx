import React from 'react'
import Box from '@mui/material/Box';
import { Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

function Login() {
    return (

        <Box sx={{
            backgroundColor: '#D9D9D9',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }} >
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CssBaseline />
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
                    <Grid
                        item
                        xs={false}
                        sm={5}
                        md={6}
                        sx={{
                            backgroundImage: "url('/assets/redLogo.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    />
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
                            <Typography component="h1" variant="h4" gutterBottom>
                                Giriş
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Hoş geldiniz!
                            </Typography>

                            <Box component="form" sx={{ mt: 3 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="E-posta Adresi"
                                    autoFocus
                                    size="small"
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Şifre"
                                    type="password"
                                    autoComplete="current-password"
                                    size="small"
                                />

                                <Box sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" />}
                                        label="Beni hatırla"
                                    />
                                    <Link href="#" variant="body2">
                                        Şifremi Unuttum
                                    </Link>
                                </Box>

                                <Button
                                    fullWidth
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