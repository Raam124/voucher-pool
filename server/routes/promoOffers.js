const express = require('express');
const router = express.Router();

const requestVerifierHelper = require('../helpers/request.verifier')
const { PromoOfferController } = require('./controllers')

router.get('/', requestVerifierHelper.ensureAdminAuthorizedUser, PromoOfferController.getAllPromoOffers);

router.post('/', requestVerifierHelper.ensureAuthorizedUser, PromoOfferController.addPromoOffer);

module.exports = router;
