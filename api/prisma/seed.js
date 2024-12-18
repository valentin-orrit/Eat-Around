import prisma from './client.js'

async function main() {
    try {
        // seed users
        await prisma.user.createMany({
            data: [
                {
                    clerkUserId: 'user_2qNrJPfD0VudRW8t8mkqcxxTIcd',
                    is_admin: true,
                },
                {
                    clerkUserId: 'user_2qNrLWBlX62XFEFnkUfmdbcWRT2',
                    is_admin: false,
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
        console.log('SEED SUCCESSFUL')
    } catch (error) {
        console.error('Error during database seeding:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
