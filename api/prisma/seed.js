import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        // reset the db
        await prisma.favorite.deleteMany()
        await prisma.user.deleteMany()
        await prisma.place.deleteMany()
        await prisma.city.deleteMany()

        console.log('Database reset successful')

        // seed cities
        await prisma.city.createMany({
            data: [
                { name: 'Paris' },
                { name: 'Nantes' },
                { name: 'Lille' },
                { name: 'Toulouse' },
                { name: 'Lyon' },
            ],
        })

        // get city ids
        const paris = await prisma.city.findFirst({ where: { name: 'Paris' } })
        const nantes = await prisma.city.findFirst({
            where: { name: 'Nantes' },
        })

        console.log('cities seeded')

        // seed users
        await prisma.user.createMany({
            data: [
                {
                    name: 'jean',
                    email: 'jean@jean.com',
                    password: '1234',
                    is_admin: false,
                    cityId: paris.id,
                },
                {
                    name: 'sylvie',
                    email: 'sylvie@sylvie.com',
                    password: '1234',
                    is_admin: false,
                    cityId: paris.id,
                },
                {
                    name: 'john',
                    email: 'john@john.com',
                    password: '1234',
                    is_admin: true,
                    cityId: nantes.id,
                },
                {
                    name: 'julie',
                    email: 'julie@julie.com',
                    password: '1234',
                    is_admin: true,
                    cityId: nantes.id,
                },
            ],
        })

        console.log('users seeded')

        // seed places
        await prisma.place.createMany({
            data: [
                {
                    name: 'Papilles',
                    latitude: 48.88197566430336,
                    longitude: 2.3465367460386606,
                },
                {
                    name: 'Le Local Bio',
                    latitude: 48.88293970241375,
                    longitude: 2.365022309449113,
                },
                {
                    name: '42 Degrés',
                    latitude: 48.87796581630001,
                    longitude: 2.3489834161212966,
                },
                {
                    name: 'Riz Riz',
                    latitude: 48.86447072161099,
                    longitude: 2.3528600967941604,
                },
                {
                    name: 'BigLove',
                    latitude: 48.86226325990371,
                    longitude: 2.3636566666106975,
                },
                {
                    name: 'Paulette',
                    latitude: 44.83812751594591,
                    longitude: -0.5754261825108467,
                },
                {
                    name: 'Jolly',
                    latitude: 44.840645483999715,
                    longitude: -0.57202034951001,
                },
                {
                    name: 'WOODKITCHEN',
                    latitude: 44.84115720654007,
                    longitude: -0.5797517739957367,
                },
                {
                    name: 'CASA GAÏA',
                    latitude: 44.85073705428533,
                    longitude: -0.5711551045006193,
                },
                {
                    name: 'Le Furtado',
                    latitude: 44.82527303864398,
                    longitude: -0.5610057719141974,
                },
            ],
        })

        console.log('places seeded')

        // Fetch all users and places for favorites
        const users = await prisma.user.findMany()
        const places = await prisma.place.findMany()

        // random favorite for each user
        const favoriteData = users.flatMap((user) => {
            return places
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map((place) => ({
                    userId: user.id,
                    placeId: place.id,
                }))
        })

        // Create favorites
        if (favoriteData.length > 0) {
            await prisma.favorite.createMany({ data: favoriteData })
        }

        console.log('Favorites seeded')
        console.log('SEED SUCCESSFUL')
    } catch (error) {
        console.error('Error during database seeding:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
