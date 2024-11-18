import request from 'supertest'
import { jest } from '@jest/globals'
import express from 'express'
import usersRouter from '../../routes/users.js'
import prisma from '../../prisma/client.js'

describe('User Routes', () => {
    const app = express()
    app.use(express.json())
    app.use(usersRouter)

    // GET all users
    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const mockUsers = [
                { id: 1, name: 'John', email: 'john@test.com' },
                { id: 2, name: 'Jane', email: 'jane@test.com' },
            ]

            jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers)

            const response = await request(app).get('/api/users')

            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(mockUsers)
        }, 10000) // Increase timeout

        it('should handle errors when fetching users', async () => {
            jest.spyOn(prisma.user, 'findMany').mockRejectedValue(
                new Error('Database error')
            )

            const response = await request(app).get('/api/users')

            expect(response.statusCode).toBe(500)
            expect(response.body).toHaveProperty('error')
        }, 10000)
    })

    // GET single user
    describe('GET /api/user/:id', () => {
        it('should return a specific user', async () => {
            const mockUser = { id: 1, name: 'John', email: 'john@test.com' }
            jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser)

            const response = await request(app).get('/api/user/1')

            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(mockUser)
        })

        it('should return 404 if user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null)

            const response = await request(app).get('/api/user/999')

            expect(response.statusCode).toBe(404)
            expect(response.body).toHaveProperty('error', 'User not found')
        })
    })

    // POST create user
    describe('POST /api/create-user', () => {
        it('should create a new user', async () => {
            const newUser = {
                name: 'New User',
                email: 'new@test.com',
                password: 'password123',
                is_admin: false,
            }
            const createdUser = { id: 3, ...newUser }
            jest.spyOn(prisma.user, 'create').mockResolvedValue(createdUser)

            const response = await request(app)
                .post('/api/create-user')
                .send(newUser)

            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(createdUser)
        })
    })

    // PUT update user
    describe('PUT /api/update-user/:id', () => {
        it('should update an existing user', async () => {
            const updateData = {
                name: 'Updated Name',
                email: 'updated@test.com',
                is_admin: true,
            }
            const updatedUser = { id: 1, ...updateData }
            jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser)

            const response = await request(app)
                .put('/api/update-user/1')
                .send(updateData)

            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(updatedUser)
        })
    })

    // DELETE user
    describe('DELETE /api/user/:id', () => {
        it('should delete a user', async () => {
            const deletedUser = { id: 1, name: 'John', email: 'john@test.com' }
            jest.spyOn(prisma.user, 'delete').mockResolvedValue(deletedUser)

            const response = await request(app).delete('/api/user/1')

            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(deletedUser)
        })

        it('should return 404 if user not found', async () => {
            const error = new Error('User not found')
            error.code = 'P2025'
            prisma.user.delete.mockRejectedValue(error)

            const response = await request(app).delete('/api/user/999')

            expect(response.statusCode).toBe(404)
            expect(response.body).toHaveProperty('error', 'User not found')
        })
    })
})
