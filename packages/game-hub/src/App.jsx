import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeContextProvider } from './theme/ThemeContext';
import { CssBaseline } from '@mui/material';

function App() {
    return (

        <ThemeContextProvider>

            <CssBaseline />
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/game-detail" element={<GameDetail />} />
                <Route path="/game-detail" element={<GameDetail />} />
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </ThemeContextProvider>
    )
}

export default App