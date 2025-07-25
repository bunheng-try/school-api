import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'school-api-secret';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status (403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

export default auth;