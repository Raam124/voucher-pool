const { check, validationResult } = require('express-validator');

const verificationService = require('../../../services/verification');
const userService = require('../../../services/user')

const authHelper = require('../../../helpers/auth')

const validate = () => {
  return [
    check('code', 'The code must be a UUID')
      .trim()
      .exists({ checkNull: true })
      .withMessage('Code should be defined')
      .isUUID(),
    check('newPassword', 'The new password must be a UUID')
      .trim()
      .exists({ checkNull: true })
      .withMessage('Code should be defined')
      .isString(),
    check('confirmPassword', 'The new password must be a UUID')
      .trim()
      .exists({ checkNull: true })
      .withMessage('Code should be defined')
      .isString(),
  ];
};

const action = async (req, res, next) => {
  let message = "Password reset success";
  let status = 200;

  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const code = req.params.code;
      const verification = await verificationService.getEmailVerification(code);

      if(verification.type !== verificationService.emailVerificationTypes.PASSWORD_RESET){
        throw new Error ("Invalid code")
      }
      await authHelper.matchPasswords(req.body.newPassword,req.body.confirmPassword);

      const password = req.body.newPassword
      const hashPassword = await authHelper.hashPassword(password);
      await userService.updateUserPasswordById(verification.userId,hashPassword);

    } else {
      message = 'The request contains some validation errors.';
      status = 400;
    }
  } catch (e) {
    message = e.message;
    status = 400;
  }
  return res.status(status).json(({message}))
};

module.exports = action;
module.exports.validate = validate;
