import express from 'express'
import prisma from '../prisma/client.js'

const router = express.Router()

// GET - get all places
router.get('/places', async (req, res) => {
    try {
        const places = await prisma.place.findMany({})
        res.status(200).json(places)
    } catch (error) {
        console.error('error fetching places:', error)
        res.status(500).json({ error: error.message })
    }
})

// POST - add place to favorite
router.post('/add-place-to-favorite', async (req, res) => {
    const { name, latitude, longitude, clerkUserId } = req.body;

    try {
        if (!clerkUserId) {
            return res.status(400).json({ error: 'clerkUserId is required' });
        }

        const user = await prisma.user.findUnique({
            where: { clerkUserId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let place = await prisma.place.findFirst({
            where: { name, latitude, longitude },
        });

        if (!place) {
            place = await prisma.place.create({
                data: { name, latitude, longitude },
            });
        }

        const favorite = await prisma.favorite.upsert({
            where: {
                userId_placeId: { userId: user.id, placeId: place.id },
            },
            create: {
                userId: user.id,
                placeId: place.id,
            },
            update: {},
        });

        res.status(201).json({ message: 'Place added to favorites', favorite });

    } catch (error) {
        console.error('Error adding place to favorites:', error);
        res.status(500).json({ error: error.message });
    }
});


export default router
