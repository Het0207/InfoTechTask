require("dotenv").config()
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

const secret = process.env.JWT_SECRET;
const expiresIn=  process.env.JWT_EXPIRES_IN;

app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    const payload = { username };
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
    res.status(200).json({ token });
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403); //for Forbidden
        }
        req.user = user; 
        next();
    });
};

app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.username}, you have access to this protected route.` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
