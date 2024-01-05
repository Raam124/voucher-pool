const getAllusers = require('./get.users');
const getAccount = require('./get.account');
const updateAccount = require('./update.account');
const getUserById = require('./get.userById');
const updateUserById = require('./update.userById')
const deleteUserById = require('./delete.userById')

module.exports = {
    getAllusers,
    getAccount,
    getUserById,
    updateAccount,
    updateUserById,
    deleteUserById
    
}