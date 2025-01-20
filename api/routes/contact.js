import express from 'express'
import { sendContactFormMessage } from '../config/emailService.js'

const router = express.Router()

router.post('/contact', async (req, res) => {
    const { fname, lname, email, message } = req.body

    if (!email || !message || !fname || !lname) {
        return res
            .status(400)
            .json({ success: false, message: 'All fields are required.' })
    }

    try {
        await sendContactFormMessage({
            name: `${fname} ${lname}`,
            email,
            message,
        })

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully!',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send your message. Please try again.',
        })
    }
})

export default router
