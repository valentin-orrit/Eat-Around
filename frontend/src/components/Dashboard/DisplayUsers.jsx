import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayUsers() {
    const [users, setUsers] = useState([])
    const api = import.meta.env.VITE_AXIOS_BASE_URL

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${api}/users`)
                setUsers(response.data)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [])

    console.log(api)

    return (
        <div className="min-w-0.5 my-10 mx-40">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b bg-amber-400">
                            <th className="py-2 px-6 font-semibold justify-center">
                                Name
                            </th>
                            <th className="py-2 px-6 font-semibold justify-center">
                                Email
                            </th>
                            <th className="py-2 px-6 font-semibold justify-center">
                                Admin Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
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
