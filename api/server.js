import express from 'express'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import expressSession from 'express-session'
import cors from 'cors'
import prisma from './constants/config.js'
import usersRouter from './routes/users.js'
import citiesRouter from './routes/cities.js'
import placesRouter from './routes/places.js'
import favoritesRouter from './routes/favorites.js'
import { startNgrok } from './config/ngrok.js'

const app = express()
const PORT = process.env.PORT || 3000
const NGROK_URL = process.env.NGROK_URL

// cors setup
app.use(
    cors({
        origin: [
            'http://localhost:5137',
            'http://localhost:5174',
            'http://localhost:5173',
            'https://eat-around-frontend.fly.dev',
            `https://${process.env.NGROK_URL}`,
        ],
        methods: ['POST', 'PUT', 'GET', 'OPTION', 'HEAD', 'DELETE', 'PATCH'],
        credentials: true,
    })
)

// session setup
app.use(
    expressSession({
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 360000,
            httpOnly: true,
        },
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 120000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', usersRouter)
app.use('/', citiesRouter)
app.use('/', placesRouter)
app.use('/', favoritesRouter)

app.get('/', (req, res) => {
    const welcomeMessage = '<h1>Welcome to Eat Around API</h1>'
    const ngrokMessage = `${`<p>Public URL: <a href="${`https://${process.env.NGROK_URL}`}" target="_blank">${NGROK_URL}</a></p>`}`

    if (process.env.NODE_ENV !== 'production') {
        res.send(welcomeMessage + ngrokMessage)
    }

    if (process.env.NODE_ENV === 'production') {
        res.send(welcomeMessage)
    }
})

app.listen(PORT, '0.0.0.0', async (err) => {
    if (err) console.log(err)
    console.log(`Server is running on port ${PORT}`)

    if (process.env.NODE_ENV !== 'production') {
        await startNgrok(PORT, NGROK_URL)
        console.log(`Public ngrok URL: ${NGROK_URL}`)
    }
})
