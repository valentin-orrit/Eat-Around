import { render, screen, waitFor } from '@testing-library/react'
import DisplayPlaces from '../../src/components/Dashboard/DisplayPlaces'
import axios from 'axios'

vi.mock('axios')
vi.stubEnv('VITE_AXIOS_BASE_URL', 'http://mock-api.com')

describe('DisplayPlaces', () => {
    const mockPlaces = [
        {
            id: 1,
            name: 'Papilles',
            latitude: '48.88197566430336',
            longitude: '2.346536746038661',
        },
        {
            id: 2,
            name: 'Jolly',
            latitude: '44.84064548399972',
            longitude: '-0.57202034951001',
        },
    ]
    const cacheKey = 'places_data'
    const cacheTimeKey = `${cacheKey}_time`
    const mockCacheData = JSON.stringify(mockPlaces)

    beforeEach(() => {
        vi.resetAllMocks()
        localStorage.clear()
        axios.get.mockResolvedValue({ data: [] })
    })

    it('should render the table headers correctly', async () => {
        render(<DisplayPlaces />)

        await waitFor(() => {
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(screen.getByText('Latitude')).toBeInTheDocument()
            expect(screen.getByText('Longitude')).toBeInTheDocument()
        })
    })

    it('should render places from the API', async () => {
        axios.get.mockResolvedValueOnce({ data: mockPlaces })

        render(<DisplayPlaces />)

        await waitFor(() => {
            expect(screen.getByText('Papilles')).toBeInTheDocument()
            expect(screen.getByText('Jolly')).toBeInTheDocument()
        })

        expect(screen.getByText('48.88197566430336')).toBeInTheDocument()
        expect(screen.getByText('2.346536746038661')).toBeInTheDocument()

        expect(screen.getByText('44.84064548399972')).toBeInTheDocument()
        expect(screen.getByText('-0.57202034951001')).toBeInTheDocument()
    })

    it('should render places from localStorage if cached and valid', async () => {
        localStorage.setItem(cacheKey, mockCacheData)
        localStorage.setItem(cacheTimeKey, (Date.now() - 10000).toString())

        render(<DisplayPlaces />)

        await waitFor(() => {
            expect(screen.getByText('Papilles')).toBeInTheDocument()
            expect(screen.getByText('Jolly')).toBeInTheDocument()
        })

        expect(screen.getByText('48.88197566430336')).toBeInTheDocument()
        expect(screen.getByText('2.346536746038661')).toBeInTheDocument()

        expect(screen.getByText('44.84064548399972')).toBeInTheDocument()
        expect(screen.getByText('-0.57202034951001')).toBeInTheDocument()
    })

    it('should handle expired cache and fetch data again', async () => {
        localStorage.setItem(cacheKey, mockCacheData)
        localStorage.setItem(
            cacheTimeKey,
            (Date.now() - 60 * 60 * 1000).toString()
        )

        axios.get.mockResolvedValueOnce({ data: mockPlaces })

        render(<DisplayPlaces />)

        await waitFor(() => {
            expect(screen.getByText('Papilles')).toBeInTheDocument()
            expect(screen.getByText('Jolly')).toBeInTheDocument()
        })

        expect(screen.getByText('48.88197566430336')).toBeInTheDocument()
        expect(screen.getByText('2.346536746038661')).toBeInTheDocument()

        expect(screen.getByText('44.84064548399972')).toBeInTheDocument()
        expect(screen.getByText('-0.57202034951001')).toBeInTheDocument()
    })

    it('should use cache data when API call is successful and cache is valid', async () => {
        localStorage.setItem(cacheKey, mockCacheData)
        localStorage.setItem(cacheTimeKey, (Date.now() - 10000).toString())

        render(<DisplayPlaces />)

        await waitFor(() => {
            expect(screen.getByText('Papilles')).toBeInTheDocument()
            expect(screen.getByText('Jolly')).toBeInTheDocument()
        })

        expect(screen.getByText('48.88197566430336')).toBeInTheDocument()
        expect(screen.getByText('2.346536746038661')).toBeInTheDocument()

        expect(screen.getByText('44.84064548399972')).toBeInTheDocument()
        expect(screen.getByText('-0.57202034951001')).toBeInTheDocument()
    })

    it('should handle API errors gracefully', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
        axios.get.mockRejectedValueOnce(new Error('API error'))

        render(<DisplayPlaces />)

        await waitFor(() => {
            expect(screen.queryByText('Papilles')).not.toBeInTheDocument()
            expect(screen.queryByText('Jolly')).not.toBeInTheDocument()
        })
    })
})
