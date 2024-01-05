const express = require('express');
const router = express.Router();

const requestVerifierHelper = require('../helpers/request.verifier')
const { userController } = require('./controllers')

router.get('/', requestVerifierHelper.ensureAdminAuthorizedUser, userController.getAllusers);

router.get('/me', requestVerifierHelper.ensureAuthorizedUser, userController.getAccount);

router.put('/me', requestVerifierHelper.ensureAuthorizedUser, userController.updateAccount);

router.get('/:id', requestVerifierHelper.ensureAdminAuthorizedUser, userController.getUserById);

router.put('/:id', requestVerifierHelper.ensureAdminAuthorizedUser, userController.updateUserById);

router.delete('/:id', requestVerifierHelper.ensureAdminAuthorizedUser, userController.deleteUserById);


module.exports = router;
