import express from 'express'
import prisma from '../prisma/client.js'

const router = express.Router()

// GET - get all cities
router.get('/cities', async (req, res) => {
    try {
        const cities = await prisma.city.findMany({})
        res.status(200).json(cities)
    } catch (error) {
        console.error('error fetching cities:', error)
        res.status(500).json({ error: error.message })
    }
})

export default router
