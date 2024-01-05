const promoOfferService = require('../../../services/promoOffer')
const userService = require('../../../services/user')
const voucherService = require('../../../services/voucher')
var crypto = require('crypto');

const helpService = require('../../../helpers/services')

const action = async (req, res, next) => {
  console.log(req.body)
  const data = req.body;
  try {

    const promoOffer = await promoOfferService.createPromoOffer(data);
    console.log(promoOffer)

    // create voucher code for all user for the newly added promo 
    const users = await userService.getAllUsers()
    console.log(users)

    for(const user of users){
      console.log(user.id)
      const voucherData = {
        code : helpService.randomValueHex(4)+"-"+helpService.randomValueHex(4)+"-"+helpService.randomValueHex(4),
        expireDate : helpService.addDays(Date.now(),3), // setting 3 days after created date as expire date
        promoOfferId : promoOffer.id,
        userId : user.id,
      }
      console.log(voucherData);
      await voucherService.createVoucherCodes(voucherData);
      
    }
    return res.json({ promoOffer: promoOffer });
  
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
    
  }
};

module.exports = action;