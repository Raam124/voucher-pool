const promoOfferService = require('../../../services/promoOffer')

const action = async (req, res, next) => {
  console.log(req.params)
  try {

    const promoOffers = await promoOfferService.getPromoOffers();
    console.log(promoOffers)
    return res.json({ promoOffers: promoOffers });
  
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e.message });
  }
};

module.exports = action;
