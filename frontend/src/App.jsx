import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedAdminRoute>
                            <Dashboard />
                        </ProtectedAdminRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
