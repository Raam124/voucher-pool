const voucherService = require('../../../services/voucher')

const action = async (req, res, next) => {
  console.log(req.params)
  const data = req.body;
  try {

    const voucher = await voucherService.getVoucherByCode(req.body.code,req.user.id);
    console.log("trigeredd")
    console.log(voucher)
    if (voucher){
      if(voucher.userId !== req.user.id){
        return res.status(400).json({ message: "Voucher not found" });
      }
      else if (voucher.isValid === false){
        return res.status(400).json({ message: "Voucher is not valid" });
      }
      else{
        const updateData = {
          isValid:false,
          dateUsed:new Date(Date.now())
        }
        const updatedVoucher = await voucherService.updateVoucherByCode(req.body.code,updateData);
        return res.json({ voucher: updatedVoucher });
      }
    }
    return res.json({ voucher: voucher });
  
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
