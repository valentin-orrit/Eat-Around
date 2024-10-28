import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const cities = await prisma.city.createMany({
        data: [{ name: 'Paris', zipcode: '75000' }],
    })
}
