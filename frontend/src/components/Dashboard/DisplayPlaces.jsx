import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayPlaces() {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_AXIOS_BASE_URL}/api/places`
                )
                setPlaces(response.data)
            } catch (error) {
                console.error('Error fetching places:', error)
            }
        }

        fetchPlaces()
    }, [])

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
                        {places.map((place) => (
                            <tr
                                key={place.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-2 px-4">{place.name}</td>
                                <td className="py-2 px-4">{place.latitude}</td>
                                <td className="py-2 px-4">{place.longitude}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
