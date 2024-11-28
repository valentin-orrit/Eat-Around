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

export default router
