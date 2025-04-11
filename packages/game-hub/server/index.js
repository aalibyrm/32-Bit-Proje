import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import users from './users.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import passLogin from './PassLogin.js';

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function hashPassword(password) {
    return crypto.createHash("sha256")
        .update(password)
        .digest("hex");
}

app.post('/login', (req, res) => {
    const { email, password, rememberMe } = req.body;


    if (!email || !password) {
        return res.status(400).json({ error: "Email ve şifre gereklidir!" });
    }

    const hashedPassword = hashPassword(password);

    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
        req.session.user = { email: user.email, rememberMe: rememberMe };

        if (rememberMe) {

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.cookie('rememberMeToken', token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
        }

        res.json({
            success: true,
            user: req.session.user,
            rememberMe: rememberMe,
            message: "Giriş başarılı!"
        });

    } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
    }

})



app.get('/session', (req, res) => {

    if (req.session.user) {
        return res.json({ user: req.session.user });
    }

    res.status(401).json({ message: "Giriş yapılmamış!" });
});

app.get('/fast-login', (req, res) => {

    if (req.session && req.session.user) {
        return res.json({ message: 'Zaten giriş yapıldı', user: req.session.user });
    }

    const token = req.cookies.rememberMeToken;
    if (!token) return res.status(401).json({ message: 'Hızlı giriş başarısız' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.session.user = { email: decoded.email, rememberMe: true };
        res.json({ message: 'Hızlı giriş başarılı', user: req.session.user });


    } catch (err) {
        res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' });
    }

})

app.get('/token-control', (req, res) => {
    const token = req.cookies.rememberMeToken;
    if (!token) {
        return res.status(401).json({ message: 'Token bulunamadı' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded.email });


    } catch (err) {
        res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' });
    }
})


app.post('/logout', (req, res) => {

    if (!req.session.user.rememberMe) {
        res.clearCookie('rememberMeToken');
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Çıkış yapılamadı!" });
        }
        res.clearCookie('connect.sid', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });



        res.json({ message: "Çıkış başarılı!" });
    })
})

app.listen(4000, () => {
    console.log('Server 4000 portunda çalışıyor.');
});