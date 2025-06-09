import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CLIENT_ID = '22za07v3esedqa0xwl4zzxput4ycf4';
    const ACCESS_TOKEN = '4dslfnlu1fv422ej5mswhrrku233mg';

    // Özel oyunlarımız
    const customGames = [
        {
            id: 'custom-1',
            name: 'Tombala',
            cover: {
                url: 'https://i.imgur.com/T0RzZ5Y.png'
            },
            rating: 85,
            summary: `  
Geleneksel Türk tombala oyunu. Arkadaşlarınızla eğlenceli vakit geçirebileceğiniz, klasik tombala deneyimi. 

Her oyuncuya özel bir tombala kartı verilir. Oyun boyunca rastgele sayılar çekilir ve ekranda gösterilir. Eğer çekilen sayı sizin kartınızda varsa, o sayıya tıklamanız gerekir. Dikkat! Sayıya tıklamadan devam ederseniz kazanma şansınızı kaybedebilirsiniz.

Oyun aşamaları:  
- 1. Çinko: Kartınızdaki herhangi bir satırın tüm sayıları işaretlendiğinde yapılır.  
- 2. Çinko: İkinci bir satırı da doldurduğunuzda gerçekleşir.  
- Tombala: Kartınızdaki tüm satırlar eksiksiz doldurulursa tombala yaparsınız ve oyunu kazanırsınız!
`,
            screenshots: [
                {
                    url: 'https://i.imgur.com/LCz8FT5.png'
                }
            ]
        }
    ];

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:4000/games');
            // API'den gelen oyunlarla kendi oyunlarımızı birleştir
            setGames([...customGames, ...response.data]);
        } catch (error) {
            console.error('Oyunlar alınamadı:', error);
            // API çalışmasa bile kendi oyunlarımızı göster
            setGames(customGames);
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
