import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute'
import Layout from './components/Layout'
import { useState } from 'react'

function App() {
    const [filters, setFilters] = useState([
        { key: 1, name: 'vegetarian', isActive: true, isSelected: false },
        { key: 2, name: 'vegan', isActive: true, isSelected: false },
        { key: 3, name: 'gluten-free', isActive: true, isSelected: false },
        { key: 4, name: 'lactose-free', isActive: true, isSelected: false },
        { key: 5, name: 'halal', isActive: true, isSelected: false },
        { key: 6, name: 'kosher', isActive: true, isSelected: false },
    ])

    return (
        <div className="flex flex-col w-dvw">
            <Router>
                <Layout filters={filters} setFilters={setFilters}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    filters={filters}
                                    setFilters={setFilters}
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
                    </Routes>
                </Layout>
            </Router>
        </div>
    )
}

export default App
