const userService = require('../../../services/user')

const action = async (req, res, next) => {
  try {
    console.log(req.user.id)
    const user = await userService.getUserById(req.user.id);
    return res.json({ user: user });
  
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;