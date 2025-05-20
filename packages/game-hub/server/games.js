import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const ACCESS_TOKEN = process.env.IGDB_ACCESS_TOKEN;

function enhanceImageUrls(games, size = 't_1080p') {
    return games.map(game => {
        if (game.cover?.url) {
            game.cover.url = `https:${game.cover.url.replace('t_thumb', size)}`;
        }

        if (game.screenshots) {
            game.screenshots = game.screenshots.map(screenshot => ({
                ...screenshot,
                url: `https:${screenshot.url.replace('t_thumb', size)}`
            }));
        }

        return game;
    });
}

export const getGames = async () => {
    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `fields name,cover.url,summary;
       sort rating desc;
       where rating != null & rating_count > 50;
       limit 25;`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Accept': 'application/json',
                }
            }
        );
        return enhanceImageUrls(response.data, 't_1080p');
    } catch (error) {
        console.error('IGDB API Hatası:', error);
        throw error;
    }
};

export const searchGames = async (query) => {
    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `fields name,cover.url;
       search "${query}";
       limit 10;`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Accept': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('IGDB Arama Hatası:', error);
        throw error;
    }
};