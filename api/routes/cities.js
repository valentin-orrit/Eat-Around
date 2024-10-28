import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET - get all cities
router.get('/api/cities', async (req, res) => {
    try {
        const cities = await prisma.city.findMany({})
        res.status(200).json(cities)
    } catch (error) {
        console.error('error fetching cities:', error)
        res.status(500).json({ error: error.message })
    }
})

export default router
