import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())


app.get('/login', (req, res) => {
    const { email, password, rememberMe } = req.body;

    res.json({ message: "Giriş başarılı!", email });
    res.json({ message: "Giriş başarılı!", password });
})

app.listen(4000, () => {
    console.log('Server 3001 portunda çalışıyor.');
});