import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../../src/pages/Dashboard'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { it } from 'vitest'

vi.mock('axios')
vi.mock('@clerk/clerk-react', () => ({
    useAuth: vi.fn(),
}))

// Create a wrapper component with BrowserRouter for Link & Navlink components
const renderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter })
}

describe('Dashboard Integration Tests', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    const mockUsers = [
        { clerkUserId: 'admin_123', is_admin: true },
        { clerkUserId: 'user_456', is_admin: false },
    ]

    const mockPlaces = [
        { id: 1, name: 'Place 1', latitude: '40.7128', longitude: '-74.0060' },
        { id: 2, name: 'Place 2', latitude: '34.0522', longitude: '-118.2437' },
    ]

    it('should not render users and places when not toggled', () => {
        useAuth.mockReturnValue({ isSignedIn: true })

        render(<Dashboard />)

        expect(screen.queryByText('admin_123')).not.toBeInTheDocument()
        expect(screen.queryByText('user_456')).not.toBeInTheDocument()

        expect(screen.queryByText('Place 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Place 2')).not.toBeInTheDocument()
    })

    it('should render users and places tables correctly when toggled', async () => {
        axios.get.mockImplementation((url) => {
            if (url.endsWith('/users')) {
                return Promise.resolve({ data: mockUsers })
            }
            if (url.endsWith('/places')) {
                return Promise.resolve({ data: mockPlaces })
            }
            return Promise.reject(new Error('Unknown endpoint'))
        })

        useAuth.mockReturnValue({ isSignedIn: true })

        render(<Dashboard />)

        expect(screen.getByText('Dashboard')).toBeInTheDocument()

        const usersButton = screen.getByText('Users')
        fireEvent.click(usersButton)

        await waitFor(() => {
            expect(screen.getByText('admin_123')).toBeInTheDocument()
            expect(screen.getByText('user_456')).toBeInTheDocument()
        })

        const placesButton = screen.getByText('Places')
        fireEvent.click(placesButton)

        await waitFor(() => {
            expect(screen.getByText('Place 1')).toBeInTheDocument()
            expect(screen.getByText('Place 2')).toBeInTheDocument()
        })
    })

    it('should redirect to home if not signed in', () => {
        useAuth.mockReturnValue({ isSignedIn: false })

        renderWithRouter(<Dashboard />)

        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })
})
