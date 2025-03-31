export default function authMiddleware(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ message: "Giriş yapılmamış!" });
}