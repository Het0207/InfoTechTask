const jwt = require('jsonwebtoken');

const jwtConfig = require('../config/jwtConfig');

module.exports.login = (req,res) => {
    const uname = req.body.username
    const pass = req.body.password

    if(!username || !password){
        res.status(400).json({message: "username or password is not entered"});
    }
    
}


