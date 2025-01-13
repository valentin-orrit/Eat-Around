import express from 'express'
import prisma from '../prisma/client.js'

const router = express.Router()

// GET - get all favorites for a user
router.get('/favorites/:clerkUserId', async (req, res) => {
    const { clerkUserId } = req.params

    try {
        if (!clerkUserId) {
            return res.status(400).json({ error: 'clerkUserId is required' })
        }

        const user = await prisma.user.findUnique({
            where: { clerkUserId },
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        // Fetch favorites for the user
        const favorites = await prisma.favorite.findMany({
            where: { userId: user.id },
            include: {
                place: true,
            },
        })

        res.status(200).json(favorites)
    } catch (error) {
        console.error('Error fetching favorites:', error)
        res.status(500).json({ error: error.message })
    }
})

// DELETE - delete a favorite for a user
router.delete('/favorites/:favoriteId', async (req, res) => {
    const { favoriteId } = req.params

    try {
        if (!favoriteId) {
            return res.status(400).json({ error: 'Favorite ID is required' })
        }

        const deletedFavorite = await prisma.favorite.delete({
            where: { id: parseInt(favoriteId, 10) },
        })

        res.status(200).json({
            message: 'Favorite deleted successfully',
            deletedFavorite,
        })
    } catch (error) {
        console.error('Error deleting favorite:', error)
        res.status(500).json({ error: error.message })
    }
})

export default router
