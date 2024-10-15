import express from 'express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import cors from 'cors';
import prisma from './constants/config.js';

const app = express();
const PORT = 3000;

// cors setup
app.use(
  cors({
    origin: ['http://localhost:5137', 'http://localhost:5174'],
    methods: ['POST', 'PUT', 'GET', 'OPTION', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// session setup
app.use(
  expressSession({
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
      maxAge: 360000,
      httpOnly: true,
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 120000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
