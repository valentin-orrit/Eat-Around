import express from 'express'

const router = express.Router()

router.get('/maps-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY })
})

export default router
