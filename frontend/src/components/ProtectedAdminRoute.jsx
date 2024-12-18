/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'

export function ProtectedAdminRoute({ children }) {
    const { userData } = useUserData()

    if (userData && !userData.is_admin) {
        return <Navigate to="/" replace />
    }

    return children
}
