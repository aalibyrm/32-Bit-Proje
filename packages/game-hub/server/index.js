import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authMiddleware from './auth.js';
import users from './users.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "cokertme",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


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
        //res.json({ success: true, message: "Login successful" });
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
    }

})

app.listen(4000, () => {
    console.log('Server 4000 portunda çalışıyor.');
});