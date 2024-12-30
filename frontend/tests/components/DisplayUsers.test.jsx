import { render, screen, waitFor } from '@testing-library/react'
import DisplayUsers from '../../src/components/Dashboard/DisplayUsers'
import axios from 'axios'

vi.mock('axios')
vi.stubEnv('VITE_AXIOS_BASE_URL', 'http://mock-api.com')

describe('DisplayUsers', () => {
    const mockUsers = [
        { clerkUserId: 'admin_123', is_admin: true },
        { clerkUserId: 'user_123', is_admin: false },
    ]

    const cacheKey = 'users_data'
    const cacheTimeKey = `${cacheKey}_time`
    const mockCacheData = JSON.stringify(mockUsers)

    beforeEach(() => {
        vi.resetAllMocks()
        localStorage.clear()
        axios.get.mockResolvedValue({ data: [] })
    })

    it('should render the table headers correctly', async () => {
        render(<DisplayUsers />)

        await waitFor(() => {
            expect(screen.getByText('clerkUserId')).toBeInTheDocument()
            expect(screen.getByText('Admin Status')).toBeInTheDocument()
        })
    })

    it('should render users from the API', async () => {
        axios.get.mockResolvedValueOnce({ data: mockUsers })

        render(<DisplayUsers />)

        await waitFor(() => {
            expect(screen.getByText('admin_123')).toBeInTheDocument()
            expect(screen.getByText('user_123')).toBeInTheDocument()
        })

        expect(screen.getByText('Yes')).toBeInTheDocument()
        expect(screen.getByText('No')).toBeInTheDocument()
    })

    it('should render users from localStorage if cached and valid', async () => {
        localStorage.setItem(cacheKey, mockCacheData)
        localStorage.setItem(cacheTimeKey, (Date.now() - 10000).toString())

        render(<DisplayUsers />)

        await waitFor(() => {
            expect(screen.getByText('admin_123')).toBeInTheDocument()
            expect(screen.getByText('user_123')).toBeInTheDocument()
        })

        expect(screen.getByText('Yes')).toBeInTheDocument()
        expect(screen.getByText('No')).toBeInTheDocument()
    })

    it('should handle expired cache and fetch data again', async () => {
        localStorage.setItem(cacheKey, mockCacheData)
        localStorage.setItem(
            cacheTimeKey,
            (Date.now() - 60 * 60 * 1000).toString()
        )

        axios.get.mockResolvedValueOnce({ data: mockUsers })

        render(<DisplayUsers />)

        await waitFor(() => {
            expect(screen.getByText('admin_123')).toBeInTheDocument()
            expect(screen.getByText('user_123')).toBeInTheDocument()
        })

        expect(screen.getByText('Yes')).toBeInTheDocument()
        expect(screen.getByText('No')).toBeInTheDocument()
    })

    it('should use cache data when API call is successful and cache is invalid', async () => {
        localStorage.setItem(cacheKey, mockCacheData)
        localStorage.setItem(cacheTimeKey, (Date.now() - 10000).toString())
        render(<DisplayUsers />)

        await waitFor(() => {
            expect(screen.getByText('admin_123')).toBeInTheDocument()
            expect(screen.getByText('user_123')).toBeInTheDocument()
        })

        expect(screen.getByText('Yes')).toBeInTheDocument()
        expect(screen.getByText('No')).toBeInTheDocument()
    })

    it('should handle API errors gracefully', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
        axios.get.mockRejectedValueOnce(new Error('API error'))

        render(<DisplayUsers />)

        await waitFor(() => {
            expect(screen.queryByText('admin_123')).not.toBeInTheDocument()
            expect(screen.queryByText('user_123')).not.toBeInTheDocument()
        })
    })
})
