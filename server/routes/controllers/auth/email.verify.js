const { check, validationResult } = require('express-validator');

const verificationService = require('../../../services/verification');
const userService = require('../../../services/user')

const validate = () => {
    return [
      check('code', 'The code must be a UUID')
        .trim()
        .exists({ checkNull: true })
        .withMessage('Code should be defined')
        .isUUID(),
    ];
};

const action = async (req, res, next) => {
    let message = 'Your email was successfully verified. Now you can log in';
    let status = 200;
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const code = req.params.code;
        const verification = await verificationService.getEmailVerification(code);
        if(verification.type !== verificationService.emailVerificationTypes.ACCOUNT_VERIFY){
          throw Error ("Invalid verification type")
        }
        await userService.updateUserEamilVerifiedById(verification.userId, true);
        await verificationService.updateEmailVerification(code);

      } else {
        message = 'The request contains some validation errors.';
        status = 400;
      }
    } catch (e) {
      console.log(e)
      message = e.message;
      status = 400;
    }
  
    return res.status(status).json({ message: message });
  };
  
  module.exports = action;
  module.exports.validate = validate;