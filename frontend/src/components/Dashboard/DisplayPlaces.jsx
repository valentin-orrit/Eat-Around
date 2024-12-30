import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayPlaces() {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const api = import.meta.env.VITE_AXIOS_BASE_URL
    const cacheKey = 'places_data'
    const cacheTime = 30 * 60 * 1000 // 30 minutes cache expiration

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const cachedData = localStorage.getItem(cacheKey)
                const cachedTime = localStorage.getItem(`${cacheKey}_time`)

                if (
                    cachedData &&
                    cachedTime &&
                    Date.now() - cachedTime < cacheTime
                ) {
                    setPlaces(JSON.parse(cachedData))
                    setLoading(false)
                } else {
                    const response = await axios.get(`${api}/places`)
                    const newPlaces = response.data
                    setPlaces(newPlaces)

                    localStorage.setItem(cacheKey, JSON.stringify(newPlaces))
                    localStorage.setItem(
                        `${cacheKey}_time`,
                        Date.now().toString()
                    )
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching places:', error)
                setLoading(false)
            }
        }

        fetchPlaces()
    }, [api])

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
                                Latitude
                            </th>
                            <th className="py-2 px-6 font-semibold justify-center">
                                Longitude
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            places.map((place) => (
                                <tr
                                    key={place.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-2 px-4">{place.name}</td>
                                    <td className="py-2 px-4">
                                        {place.latitude}
                                    </td>
                                    <td className="py-2 px-4">
                                        {place.longitude}
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
