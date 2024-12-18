import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'

export function useUserData() {
    const { user } = useUser()
    const api = import.meta.env.VITE_AXIOS_BASE_URL
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (user && user.id) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${api}/user/${user.id}`)
                    setUserData(response.data)
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }

            fetchUserData()
        }
    }, [user])

    return { userData }
}
