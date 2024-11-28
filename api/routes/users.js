import express from 'express'
import prisma from '../prisma/client.js'

const router = express.Router()

// GET - get all users
router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET - get user
router.get('/user/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST - create a user
router.post('/create-user', async (req, res) => {
    const { name, email, password, is_admin } = req.body

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                is_admin,
            },
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// PUT - update user
router.put('/update-user/:id', async (req, res) => {
    const { id } = req.params
    const { name, email, is_admin } = req.body

    try {
        const updateUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                is_admin,
            },
        })

        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// DELETE - delete user
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        })

        res.status(200).json(user)
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(500).json({ error: error.message })
    }
})

export default router
