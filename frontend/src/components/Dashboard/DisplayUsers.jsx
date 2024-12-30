import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const api = import.meta.env.VITE_AXIOS_BASE_URL
    const cacheKey = 'users_data'
    const cacheTime = 30 * 60 * 1000 // 30 minutes cache expiration

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const cachedData = localStorage.getItem(cacheKey)
                const cachedTime = localStorage.getItem(`${cacheKey}_time`)

                if (
                    cachedData &&
                    cachedTime &&
                    Date.now() - cachedTime < cacheTime
                ) {
                    setUsers(JSON.parse(cachedData))
                    setLoading(false)
                } else {
                    const response = await axios.get(`${api}/users`)
                    const newUsers = response.data
                    setUsers(newUsers)

                    localStorage.setItem(cacheKey, JSON.stringify(newUsers))
                    localStorage.setItem(
                        `${cacheKey}_time`,
                        Date.now().toString()
                    )
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching users:', error)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [api])

    return (
        <div className="min-w-0.5 my-10 mx-40">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b bg-amber-400">
                            <th className="py-2 px-6 font-semibold justify-center">
                                clerkUserId
                            </th>
                            <th className="py-2 px-6 font-semibold justify-center">
                                Admin Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="2" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.clerkUserId}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-2 px-4">
                                        {user.clerkUserId}
                                    </td>
                                    <td className="py-2 px-4">
                                        {user.is_admin ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
