import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute'
import Layout from './components/Layout'

function App() {
    return (
        <div className="flex flex-col w-dvw">
            <Router>
                <Layout>
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
                </Layout>
            </Router>
        </div>
    )
}

export default App
