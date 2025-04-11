import React, { useEffect, useState } from 'react'
import api from '../api/api'

function Home() {
    const [user, setUser] = useState();
    const info = async () => {
        const res = await api.get('http://localhost:4000/session')
        setUser(res.data.user.email);
    }

    useEffect(() => { info(); }, []);
    return (
        <div>Home{user}</div>
    )
}

export default Home

