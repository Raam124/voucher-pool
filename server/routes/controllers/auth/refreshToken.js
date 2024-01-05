const { check, validationResult } = require('express-validator');
const authService = require('../../../services/auth')

const validate = () => {
    return [
      check('refreshToken')
        .exists({ checkNull: true })
        .withMessage('Field should be defined')
        .isString()
    ];
  };


const action = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    console.log("came")
    const { refreshToken } = req.body;

    const accessToken = await authService.generateAccessTokenByrefreshToken(refreshToken);
    console.log(accessToken);
    return res.json({ accessToken: accessToken });
  
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
module.exports.validate = validate;