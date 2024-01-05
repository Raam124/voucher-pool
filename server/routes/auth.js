const express = require('express');
const router = express.Router();

const { authController } = require('./controllers')

router.post('/signup', authController.signUp.validate(), authController.signUp);

router.post('/token', authController.accessToken.validate(), authController.accessToken);

router.post('/token/refresh', authController.refreshToken.validate(), authController.refreshToken);

router.post('/verify-email/:code', authController.verifyEmail.validate(), authController.verifyEmail);

router.post('/resend-verify-email', authController.verifyEmailResend.validate(), authController.verifyEmailResend);

router.post('/reset-password-request',authController.resetPasswordRequest.validate(),authController.resetPasswordRequest);

router.post('/reset-password/:code', authController.resetPassword.validate(), authController.resetPassword);

module.exports = router;
