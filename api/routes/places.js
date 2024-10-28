import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET - get all places
router.get('/api/places', async (req, res) => {
    try {
        const places = await prisma.place.findMany({})
        res.status(200).json(places)
    } catch (error) {
        console.error('error fetching places:', error)
        res.status(500).json({ error: error.message })
    }
})

export default router
