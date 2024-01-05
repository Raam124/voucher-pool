const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const promoOffers = await prisma.promoOffer.createMany({
    data : [
        {
            name: 'Promo Offer One',
            percentage: 60,
        },
        {
            name: 'Promo Offer One',
            percentage: 30,
        }   
    ]
    
  });
  console.log({ promoOffers })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })