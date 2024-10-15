import pkg, { Prisma, PrismaClient } from '@prisma/client'

const { prismaClient } = pkg
const prisma = new PrismaClient()

export default prisma
