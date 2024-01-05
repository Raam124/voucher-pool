const prisma = require('../prisma/config')

exports.createVoucherCodes = async function(data){
    const voucherCode = await prisma.voucherCode.create({
        data: data,
        select: {
            id:true,
            code: true,
            expireDate:true,
            isValid:true,
            dateUsed:true,
            promoOffer: true,
            user:true,
            createdAt:true
        },
      })
    
    return voucherCode;
}

exports.getAllVouchers = async function(userId){
    console.log(userId)
    const userVouchers = await prisma.voucherCode.findMany({
        where: {
          userId: userId,
          isValid : true
        },
        select: {
            id:true,
            code: true,
            expireDate:true,
            isValid:true,
            dateUsed:true,
            promoOffer: true,
            createdAt:true
        },
    });
    return userVouchers
}

exports.getVoucherByCode = async function(code,userId){
    console.log(code)
    console.log(userId)
    const voucher = await prisma.voucherCode.findUniqueOrThrow({
        where: {
          code : code
        },
        select: {
            id:true,
            code: true,
            expireDate:true,
            isValid:true,
            dateUsed:true,
            promoOffer: true,
            createdAt:true,
            userId : true
        },
    });
    return voucher
}

exports.updateVoucherByCode = async function(code,data){
    const user = await prisma.voucherCode.update({
        where: {
          code: code,
        },
        data:data,
        select: {
            id:true,
            promoOffer: {
                select:{
                    percentage:true
                }
            }
        },
    });
    return user
}
