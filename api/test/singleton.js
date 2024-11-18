import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'jest-mock-extended'

export const prismaMock = mockDeep(new PrismaClient())

jest.mock('../prisma/client.js', () => ({
    __esModule: true,
    default: prismaMock,
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export default prismaMock
