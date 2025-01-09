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

// POST - create a new place
router.post('/create-place', async (req, res) => {
    const { name, latitude, longitude } = req.body

    try {
        const newPlace = await prisma.place.create({
            data: {
                name,
                latitude,
                longitude,
            }
        })
        res.status(200).json(newPlace)
    } catch (error) {
        console.error('error creating place:', error)
        res.status(500).json({ error: error.message })
    }
})

export default router
