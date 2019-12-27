const jwt = require('jsonwebtoken');

module.exports= (req, res, next) => {
    const headerAuth = req.headers.authorization;
    if (!headerAuth) 
        return res.status(401).send({ error: 'No token provided.' });

    const parts = headerAuth.split(' ');
    if (parts.length !== 2)
        return res.status(401).send({ error: 'Token error.' });

    const token = parts[1];

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ error: 'Invalid token.' });
        
        req.userId = decoded.id;
        next();
    });
}