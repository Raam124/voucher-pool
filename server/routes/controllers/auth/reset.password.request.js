const { check, validationResult } = require('express-validator');

const userService = require('../../../services/user');
const emailService = require('../../../services/email');
const verificationService = require('../../../services/verification');

const validate = () => {
  return [
    check('email', 'The email must be between 6 and 320 characters long')
      .trim()
      .escape()
      .exists({ checkNull: true })
      .withMessage('Field should be defined')
      .isEmail()
      .withMessage('Invalid email format')
      .isString()
      .isLength({ min: 6, max: 320 }),
  ];
};

const action = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const user = await userService.getUserByEmail(req.body.email);

    if (user) {
      const code = await verificationService.createEmailVerification(user.id, verificationService.emailVerificationTypes.PASSWORD_RESET);
      emailService.sendResetPasswordEmail(user, code);
    }

    return res.json({
      message: 'The email was sent. Please check it and change you password.',
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
module.exports.validate = validate;
