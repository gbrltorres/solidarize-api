function isAuthenticated(req, res, next) {
    if (req.session && req.session.email) {
        return next();
    } else {
        return res.status(401).send('Usuário não autenticado.');
    }
}

export default isAuthenticated;
