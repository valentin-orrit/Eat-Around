// ExampleComponent.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_AXIOS_BASE_URL}/api/users`
                )
                setUsers(response.data)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <h1 className='text-3xl'>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}
