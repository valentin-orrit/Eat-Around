import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayFavorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_AXIOS_BASE_URL}/favorites`
                )
                setFavorites(response.data)
            } catch (error) {
                console.error('Error fetching favorites:', error)
            }
        }

        fetchFavorites()
    }, [])

    return (
        <div className="min-w-0.5 my-10 mx-40">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b bg-amber-400">
                            <th className="py-2 px-6 font-semibold justify-center">
                                User
                            </th>
                            <th className="py-2 px-6 font-semibold justify-center">
                                favorite
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map((favorite) => (
                            <tr
                                key={favorite.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-2 px-4">
                                    {favorite.user.name}
                                </td>
                                <td className="py-2 px-4">
                                    {favorite.place.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
