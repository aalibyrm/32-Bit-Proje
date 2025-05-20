import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CLIENT_ID = '22za07v3esedqa0xwl4zzxput4ycf4';
    const ACCESS_TOKEN = '4dslfnlu1fv422ej5mswhrrku233mg';

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:4000/games');
            setGames(response.data);
        } catch (error) {
            console.error('Oyunlar alınamadı:', error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const value = {
        games,
        loading,
        error,
        refetchGames: fetchGames
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export const useGames = () => useContext(GameContext);
