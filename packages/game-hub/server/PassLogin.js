export default function passLogin(req, res, next) {
    if (req.session.user) {
        return res.redirect('/home');
    }
    next();
}