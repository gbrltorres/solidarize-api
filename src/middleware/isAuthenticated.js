import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    verifyToken(token, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

function verifyToken(token, callback) {
    jwt.verify(token, process.env.SECRET, callback);
}

export default isAuthenticated;
