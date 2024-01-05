const userService = require('../../../services/user')

const action = async (req, res, next) => {
  try {

    const data = req.body;

    const user = await userService.deleteUserById(parseInt(req.params.id));
    return res.json({ user: user });
  
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
