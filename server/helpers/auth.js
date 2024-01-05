const bcrypt = require('bcrypt');

const passwordSaltRounds = 8;

exports.hashPassword = async password => {
    return await bcrypt.hash(password, passwordSaltRounds);
};

exports.matchPasswords = async (password,confirmPassword) => {
    if(password !== confirmPassword){
        throw new Error('passwords do not match')
    }
}
