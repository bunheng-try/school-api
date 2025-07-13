import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import db from '../models/index.js'
const User = db.User;

const SECRET = process.env.JWT_SECRET || 'school-api-secret';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user});
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findone({ where: { email } });
        if (!user) return res.statue(400).json({ message: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare (password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id , email: user.email }, SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default { register, login };