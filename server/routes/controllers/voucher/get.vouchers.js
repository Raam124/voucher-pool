const voucherService = require('../../../services/voucher')

const action = async (req, res, next) => {
  console.log(req.params)
  try {

    const userVouchers = await voucherService.getAllVouchers(req.user.id);
    console.log(userVouchers)
    return res.json({ userVouchers: userVouchers });
  
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
