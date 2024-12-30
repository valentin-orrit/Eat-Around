import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import DisplayUsers from '../components/Dashboard/DisplayUsers'
import DisplayPlaces from '../components/Dashboard/DisplayPlaces'

export default function Dashboard() {
    const [visibleTables, setVisibleTables] = useState({
        users: false,
        places: false,
    })
    const { isSignedIn } = useAuth()

    if (!isSignedIn) {
        return <Navigate to="/" />
    }
    const toggleTable = (table) => {
        setVisibleTables((prev) => ({
            ...prev,
            [table]: !prev[table],
        }))
    }

    return (
        <div className="flex flex-col align-middle justify-center mx-20">
            <h1 className="text-8xl font-bold mb-8">Dashboard</h1>

            {/* Users Dropdown */}
            <div className="w-full mb-4">
                <button
                    onClick={() => toggleTable('users')}
                    className="flex justify-between items-center w-full border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                    <span>Users</span>
                    <span
                        className={`transform transition-transform duration-200 ${
                            visibleTables.users ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                        ▼
                    </span>
                </button>
                {visibleTables.users && <DisplayUsers />}
            </div>

            {/* Places Dropdown */}
            <div className="w-full mb-4">
                <button
                    onClick={() => toggleTable('places')}
                    className="flex justify-between items-center w-full border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                    <span>Places</span>
                    <span
                        className={`transform transition-transform duration-200 ${
                            visibleTables.places ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                        ▼
                    </span>
                </button>
                {visibleTables.places && <DisplayPlaces />}
            </div>
        </div>
    )
}
