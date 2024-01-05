const { check, validationResult } = require('express-validator');
var crypto = require('crypto');

// services
const userService = require('../../../services/user');
const verificationService = require('../../../services/verification')
const emailService = require('../../../services/email')
const voucherService = require('../../../services/voucher')
const promoOfferService = require('../../../services/promoOffer')


// helpers
const authHelper = require('../../../helpers/auth')
const helpService = require('../../../helpers/services')

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
      check('password', 'The password must be between 6 and 50 characters long')
        .trim()
        .exists({ checkNull: true })
        .withMessage('Field should be defined')
        .isString()
        .isLength({ min: 6, max: 50 }),
      check('confirmPassword', 'The password must be between 6 and 50 characters long')
        .trim()
        .exists({ checkNull: true })
        .withMessage('Field should be defined')
        .isString()
        .isLength({ min: 6, max: 50 }),
    ];
  };


const action = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { firstName, lastName, email, password, confirmPassword, phone, role } = req.body;
    await authHelper.matchPasswords(password,confirmPassword);
    const hashPassword = await authHelper.hashPassword(password);

    const user = {
      firstName: firstName,
      lastName: lastName,
      role: role,
      email: email,
      password: hashPassword,
      phone:phone
    };
  
    const createdUser = await userService.createUser(user);
    const code = await verificationService.createEmailVerification(createdUser.id,verificationService.emailVerificationTypes.ACCOUNT_VERIFY);
    
    emailService.sendVerificationEmail(createdUser, code);


    // Get all promo offers 
    const promoOffers = await promoOfferService.getPromoOffers();
    console.log(promoOffers);

    // Create voucher codes for all promo offers in user registration
    for (const promoOffer of promoOffers){
      console.log(promoOffer.id)
      const voucherData = {
        code : helpService.randomValueHex(4)+"-"+ helpService.randomValueHex(4)+"-"+ helpService.randomValueHex(4),
        expireDate : helpService.addDays(Date.now(),3), // setting 3 days after created date as expire date
        promoOfferId : promoOffer.id,
        userId : createdUser.id,
      }
      console.log(voucherData);
      await voucherService.createVoucherCodes(voucherData);
    }
    
    return res.json({
      message: 'Verification code was sent on your email. Please check it and finish your registration.',

    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
module.exports.validate = validate;