import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayCities() {
    const [cities, setCities] = useState([])

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_AXIOS_BASE_URL}/api/cities`
                )
                setCities(response.data)
            } catch (error) {
                console.error('Error fetching cities:', error)
            }
        }

        fetchCities()
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
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr
                                key={city.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-2 px-4">{city.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
