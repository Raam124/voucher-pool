const userService = require('../../../services/user')

const action = async (req, res, next) => {
  console.log(req.params)
  try {

    const users = await userService.getAllUsers();
    return res.json({ users: users });
  
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
