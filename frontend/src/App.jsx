import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute'
import Layout from './components/Layout'
import { useState } from 'react'

function App() {
    const [filters, setFilters] = useState([
        { name: 'vegetarian', isActive: true },
        { name: 'vegan', isActive: true },
        { name: 'gluten-free', isActive: true },
        { name: 'lactose-free', isActive: true },
        { name: 'halal', isActive: true },
        { name: 'kosher', isActive: true },
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
