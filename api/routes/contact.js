import express from 'express'
import { sendContactFormMessage } from '../config/emailService.js'
import axios from 'axios'

const router = express.Router()

router.post('/contact', async (req, res) => {
    const captchaSecretKey = process.env.GOOGLE_CAPTCHA_SECRET_KEY
    const { fname, lname, email, message, recaptchaToken } = req.body

    if (!email || !message || !fname || !lname || !recaptchaToken) {
        return res
            .status(400)
            .json({ success: false, message: 'All fields are required.' })
    }

    try {
        const recaptchaResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: captchaSecretKey,
                    response: recaptchaToken,
                },
            }
        )

        if (!recaptchaResponse.data.success) {
            return res.status(400).json({
                success: false,
                message: 'reCAPTCHA verification failed.',
            })
        }

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
        console.error('Error verifying reCAPTCHA:', error)
        res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again later.',
        })
    }
})

export default router
