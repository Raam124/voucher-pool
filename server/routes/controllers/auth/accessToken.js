const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const userService = require('../../../services/user');
const authService = require('../../../services/auth');

const validate = () => {
    return [
      check('email')
        .exists({ checkNull: true })
        .withMessage('Field should be defined')
        .isString(),
      check('password')
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
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    const verifiedPassword = await bcrypt.compare(
        password,
        user.password
    );

    if(!verifiedPassword){
      return res.status(401).json({ message: "Invalid password or email" });
    }
    else{
      const tokens = await authService.generateTokens(user);
      return res.json({ message: "Log in success",userId:user.id,accessToken:tokens.accessToken,refreshToken:tokens.refreshToken });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
module.exports.validate = validate;