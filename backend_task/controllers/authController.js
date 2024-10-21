const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    const payload = { username };
    const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    res.status(200).json({ token });
}


