const prisma = require('../prisma/config')


exports.emailVerificationTypes = {

  ACCOUNT_VERIFY : 'ACCOUNT_VERIFY',
  PASSWORD_RESET : 'PASSWORD_RESET'

}

exports.createEmailVerification = async function(userId,type){
  const verification = await prisma.userEmailVerification.create({
    data: {
      userId: userId,
      type: type
    }
    });
    return verification.code;
}

exports.getEmailVerification = async function(code){
  const verification = await prisma.userEmailVerification.findUniqueOrThrow({
    where: {
      code: code
    },
  });
  return verification;
}

exports.updateEmailVerification = async function(code){
  const verification = await prisma.userEmailVerification.update({
    where: {
      code: code,
    },
    data: {
      verified: true,
    },
    });
  return verification;
  
}