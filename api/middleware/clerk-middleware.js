import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'

const clerkMiddleware = ClerkExpressWithAuth({
    secretKey: process.env.CLERK_SECRET_KEY,
})

export default clerkMiddleware
