import express from 'express'
import prisma from '../prisma/client.js'
import { Webhook } from 'svix'

const router = express.Router()
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

router.post('/api/webhooks/clerk', async (req, res) => {
    try {
        if (!webhookSecret) {
            throw new Error('Webhook secret is not configured')
        }

        const payload = req.body
        const payloadString = payload.toString('utf8')

        const headerPayload = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        }

        const wh = new Webhook(webhookSecret)
        const evt = wh.verify(payloadString, headerPayload)

        if (evt.type === 'user.created') {
            const userId = evt.data.id

            await prisma.user.create({
                data: {
                    clerkUserId: userId,
                    is_admin: false,
                },
            })
        }

        if (evt.type === 'user.deleted') {
            const userId = evt.data.id

            await prisma.user.delete({
                where: {
                    clerkUserId: userId,
                },
            })
        }

        res.status(200).json({ success: true, event: evt.type })
    } catch (error) {
        console.error('Webhook error:', {
            message: error.message,
            name: error.name,
            code: error.code,
            stack:
                process.env.NODE_ENV === 'development'
                    ? error.stack
                    : undefined,
        })

        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
})

export default router
