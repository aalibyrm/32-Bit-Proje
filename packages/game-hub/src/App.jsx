import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import GameDetails from './pages/GameDetails'
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeContextProvider } from './theme/ThemeContext';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutHandler from './components/LogoutHandler';
import FastLoginHandler from './components/FastLoginHandler';
import LoginRoute from './components/LoginRoute';
import { AlertProvider } from './alert/AlertContext';
import AlertManager from './components/AlertManager';
import './App.css';
import { GameProvider } from './games/GameContext';
import AllGames from './pages/AllGames';
import FavGames from './pages/FavGames';

function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <GameProvider>
                    <ThemeContextProvider>

                        <CssBaseline />
                        <AlertManager />
                        <Routes>

                            <Route element={<LoginRoute />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/fast-login" element={<FastLoginHandler />} />
                            </Route>



                            <Route element={<ProtectedRoute />}>
                                <Route path="/home" element={<Home />} />
                                <Route path="/game-details/:id" element={<GameDetails />} />
                                <Route path="/all-games" element={<AllGames />} />
                                <Route path="/fav-games" element={<FavGames />} />


                                <Route path="/game" element={<GameDetails />} />
                                <Route path="/logout" element={<LogoutHandler />} />
                            </Route>

                            <Route path="*" element={<NotFoundPage />} />

                        </Routes>
                    </ThemeContextProvider>
                </GameProvider>
            </AuthProvider >
        </AlertProvider>
    )
}

export default App