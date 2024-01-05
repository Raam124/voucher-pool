const jwt = require('jsonwebtoken');

const userService = require('../services/user')

exports.generateTokens = async(user) =>{
    const userData = {
        email : user.email,
        userId : user.id,
        role : user.role
    }
    const accessToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // set 24 hours for the expiration
        data: userData
    }, process.env.JWT_SECRET);

    const refreshToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // set 24 hours for the expiration
        data: userData
    }, process.env.JWT_SECRET);

    return { accessToken,refreshToken }
}

exports.generateAccessTokenByrefreshToken = async(refreshToken) => {
    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await userService.getUserById(decoded.data.userId);
        const userData = {
            email : user.email,
            userId : user.id,
            role : user.role
        }
        const accessToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // set 24 hours for the expiration
            data: userData
        }, process.env.JWT_SECRET);
        return accessToken;
    }
    catch(e){
        throw new Error(e.message);
    }
}