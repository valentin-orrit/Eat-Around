import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute'
import Layout from './components/Layout'
import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'
import Guc from './pages/Guc'

function App() {
    const { userId, isLoaded } = useAuth()
    const [favorites, setFavorites] = useState([])
    const api = import.meta.env.VITE_AXIOS_BASE_URL
    const [userPosition, setUserPosition] = useState(null)
    const [mapKey, setMapKey] = useState(0)

    const defaultFilters = [
        { key: 1, name: 'vegetarian', isActive: true, isSelected: false },
        { key: 2, name: 'vegan', isActive: true, isSelected: false },
        { key: 3, name: 'gluten-free', isActive: true, isSelected: false },
        { key: 4, name: 'lactose-free', isActive: true, isSelected: false },
        { key: 5, name: 'halal', isActive: true, isSelected: false },
        { key: 6, name: 'kosher', isActive: true, isSelected: false },
    ]

    const [filters, setFilters] = useState(null)

    async function fetchFavorites(api, userId, setFavorites) {
        if (!api || !userId) {
            return
        }

        try {
            const response = await axios.get(`${api}/favorites/${userId}`)
            setFavorites(response.data || [])
        } catch (error) {
            console.error('Error fetching favorites:', error)
        }
    }

    useEffect(() => {
        fetchFavorites(api, userId, setFavorites)
    }, [api, userId])

    useEffect(() => {
        if (isLoaded) {
            if (userId) {
                const savedFilters = localStorage.getItem(
                    `userFilters_${userId}`
                )
                setFilters(
                    savedFilters ? JSON.parse(savedFilters) : defaultFilters
                )
            } else {
                setFilters(defaultFilters)
            }
        }
    }, [isLoaded, userId])

    useEffect(() => {
        if (isLoaded && userId && filters) {
            localStorage.setItem(
                `userFilters_${userId}`,
                JSON.stringify(filters)
            )
        }
    }, [filters, userId, isLoaded])

    if (filters === null) {
        return (
            <div className="flex flex-col justify-center items-center align-middle h-screen">
                <LoaderCircle size={30} className="animate-spin text-eagreen" />
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Router>
                <Layout
                    filters={filters}
                    setFilters={setFilters}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    userPosition={userPosition}
                    setUserPosition={setUserPosition}
                    mapKey={mapKey}
                    setMapKey={setMapKey}
                >
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    filters={filters}
                                    setFilters={setFilters}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    userPosition={userPosition}
                                    setUserPosition={setUserPosition}
                                    mapKey={mapKey}
                                    setMapKey={setMapKey}
                                />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedAdminRoute>
                                    <Dashboard />
                                </ProtectedAdminRoute>
                            }
                        />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/guc" element={<Guc />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    )
}

export default App
