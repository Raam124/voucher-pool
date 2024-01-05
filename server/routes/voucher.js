const express = require('express');
const router = express.Router();

const requestVerifierHelper = require('../helpers/request.verifier')
const { VoucherController } = require('./controllers')

router.get('/', requestVerifierHelper.ensureAdminAuthorizedUser, VoucherController.getAllVouchers);

router.post('/redeem', requestVerifierHelper.ensureAuthorizedUser, VoucherController.redeemVoucher);

module.exports = router;
