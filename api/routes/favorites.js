import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET - get all favorites
router.get('/api/favorites', async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            include: {
                user: true,
                place: true,
            },
        })
        res.status(200).json(favorites)
    } catch (error) {
        console.error('error fetching favorites:', error)
        res.status(500).json({ error: error.message })
    }
})

export default router
