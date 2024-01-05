const prisma = require('../prisma/config')

exports.getPromoOffers = async function(){
    const promoOffers = await prisma.promoOffer.findMany();
    return promoOffers;
}


exports.createPromoOffer = async function(data){
    const voucherCode = await prisma.promoOffer.create({
        data: data,
        select: {
            id:true,
            name: true,
            percentage:true,
        },
      })

      
    
    return voucherCode;
}
