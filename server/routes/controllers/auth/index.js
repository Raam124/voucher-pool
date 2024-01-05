const signUp = require('./signUp');
const verifyEmail = require('./email.verify')
const verifyEmailResend = require('./email.verify.resend')
const resetPasswordRequest = require('./reset.password.request')
const resetPassword = require('./reset.password')
const accessToken = require('./accessToken')
const refreshToken = require('./refreshToken')


module.exports = {
    signUp,
    verifyEmail,
    verifyEmailResend,
    resetPasswordRequest,
    resetPassword,
    accessToken,
    refreshToken
}