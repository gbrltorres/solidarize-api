function isAuthenticated(req, res, next) {
    const sessionToken = req.session.token;
    const headerToken = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    if (!sessionToken || !headerToken) {
        return res.status(401).send('Usuário não autenticado.');
    }

    if (tokenSessao === tokenHeader) {
        return next();
    }
}

export default isAuthenticated;
