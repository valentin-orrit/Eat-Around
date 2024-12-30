import { useEffect, useState } from 'react'
import axios from 'axios'

let cachedUsers = null

export default function DisplayUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const api = import.meta.env.VITE_AXIOS_BASE_URL

    useEffect(() => {
        const fetchUsers = async () => {
            if (cachedUsers) {
                setUsers(cachedUsers)
                setLoading(false)
                return
            }

            try {
                const response = await axios.get(`${api}/users`)
                cachedUsers = response.data
                setUsers(response.data)
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [api])

    if (loading) {
        return <p>Loading users...</p>
    }

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
                        {users.map((user) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
