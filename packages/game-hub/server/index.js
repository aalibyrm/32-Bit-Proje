import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authMiddleware from './auth.js';
import users from './users.js'

const app = express();

app.use(cookieParser());
app.use(session({
    secret: "cokertme",
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
        req.session.user = { email: user.email };
        res.json({ user: req.session.user });
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

app.post('/logout', (req, res) => {
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