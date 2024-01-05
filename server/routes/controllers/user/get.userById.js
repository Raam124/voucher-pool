const userService = require('../../../services/user')

const action = async (req, res, next) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    return res.json({ user: user });
  
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
