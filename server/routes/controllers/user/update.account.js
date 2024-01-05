const userService = require('../../../services/user')

const action = async (req, res, next) => {
  try {

    const data = req.body;

    const user = await userService.updateUserById(parseInt(req.user.id),data);
    return res.json({ user: user });
  
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
