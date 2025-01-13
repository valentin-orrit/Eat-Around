import { useRef, useState, useEffect } from 'react'
import {
    AdvancedMarker,
    APIProvider,
    Map,
    InfoWindow,
} from '@vis.gl/react-google-maps'
import { Search, MapPin } from 'lucide-react'
import PLacesCarousel from './PlacesCarousel'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'

export default function MapInit({
    filters,
    setFilters,
    favorites,
    setFavorites,
}) {
    const [userPosition, setUserPosition] = useState(null)
    const [mapLoaded, setMapLoaded] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState('')
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const infoWindowRef = useRef(null)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { userId } = useAuth()
    const selectedFilters = filters
        .filter((f) => f.isSelected)
        .map((f) => f.name)
        .join(' ')

    const handleMarkerClick = (restaurant) => {
        setSelectedRestaurant(restaurant)
    }

    const requestLocation = (inputAddress) => {
        setIsLoading(true)
        const errorMessageElement = document.getElementById('error-message')
        const clearErrorMessage = () => {
            if (errorMessageElement) {
                errorMessageElement.textContent = ''
            }
        }

        if (inputAddress) {
            fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    inputAddress
                )}&key=${apiKey}`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'OK') {
                        const position = data.results[0].geometry.location
                        setUserPosition(position)
                        setIsLoading(false)
                        clearErrorMessage()
                    } else {
                        console.error('Geocoding error:', data.status)
                        if (errorMessageElement) {
                            errorMessageElement.textContent =
                                'Problem locating the address'
                            setTimeout(clearErrorMessage, 5000)
                        }
                        setIsLoading(false)
                    }
                })
                .catch((error) => {
                    console.error('Error fetching geocode data:', error)
                    if (errorMessageElement) {
                        errorMessageElement.textContent =
                            'Problem locating the address'
                        setTimeout(clearErrorMessage, 5000)
                    }
                    setIsLoading(false)
                })
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const position = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    }
                    setUserPosition(position)
                    setIsLoading(false)
                    clearErrorMessage()
                },
                (error) => {
                    console.error('Error getting user location:', error)
                    if (errorMessageElement) {
                        errorMessageElement.textContent =
                            'Problem getting your location'
                        setTimeout(clearErrorMessage, 5000)
                    }
                    setIsLoading(false)
                }
            )
        } else {
            console.warn('Geolocation is not supported by this browser.')
            if (errorMessageElement) {
                errorMessageElement.textContent =
                    'Problem getting your location'
                setTimeout(clearErrorMessage, 5000)
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (mapLoaded && userPosition) {
            const service = new google.maps.places.PlacesService(
                document.createElement('div')
            )

            const fetchNearbyRestaurants = () => {
                service.nearbySearch(
                    {
                        location: userPosition,
                        radius: 5000,
                        type: 'restaurant',
                        keyword: selectedFilters,
                    },
                    async (results, status) => {
                        if (
                            status === google.maps.places.PlacesServiceStatus.OK
                        ) {
                            const detailedRestaurants = await Promise.all(
                                results.map((restaurant) =>
                                    fetchRestaurantDetails(service, restaurant)
                                )
                            )
                            setRestaurants(detailedRestaurants)
                        } else {
                            console.error(
                                'Error searching for restaurants:',
                                status
                            )
                        }
                    }
                )
            }

            fetchNearbyRestaurants()
        }
    }, [mapLoaded, userPosition, filters])

    const fetchRestaurantDetails = (service, restaurant) => {
        return new Promise((resolve) => {
            service.getDetails(
                {
                    placeId: restaurant.place_id,
                    fields: [
                        'name',
                        'vicinity',
                        'photos',
                        'rating',
                        'formatted_phone_number',
                        'website',
                        'opening_hours',
                    ],
                },
                (details, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve({ ...restaurant, ...details })
                    } else {
                        console.error('Error fetching details:', status)
                        resolve(restaurant)
                    }
                }
            )
        })
    }

    function toggleFilter(filterName) {
        setFilters((prevFilters) =>
            prevFilters.map((filter) =>
                filter.name === filterName
                    ? { ...filter, isSelected: !filter.isSelected }
                    : filter
            )
        )
    }

    async function handleSaveToFavorites(place, userId) {
        const apiBack = import.meta.env.VITE_AXIOS_BASE_URL

        try {
            await axios.post(`${apiBack}/add-place-to-favorite`, {
                name: place.name,
                address: place.vicinity,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                clerkUserId: userId,
            })

            const favoritesResponse = await axios.get(
                `${apiBack}/favorites/${userId}`
            )

            setFavorites(favoritesResponse.data || [])
            setSelectedRestaurant(null)
        } catch (error) {
            console.error('Error saving place to favorites:', error)
        }
    }

    return (
        <div className="flex flex-col w-full">
            <PLacesCarousel restaurants={restaurants} />
            <div
                id="searchandfilters"
                className="flex flex-col xl:flex-row justify-center items-center lg:mx-16"
            >
                <div
                    id="search"
                    className="flex items-center w-full h-10 p-2 border border-gray-300 rounded-full shadow-md bg-white"
                >
                    <Search className="stroke-eaogreyaccent" />
                    <input
                        type="text"
                        name="search"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                requestLocation(address)
                            }
                        }}
                        className="bg-transparent w-full rounded-full px-2"
                        placeholder="Search for a city, region or zipcode..."
                    />
                </div>
                <div className="filter-buttons my-4 xl:whitespace-nowrap text-sm">
                    {filters.map(
                        (filter) =>
                            filter.isActive && (
                                <button
                                    key={filter.key}
                                    onClick={() => toggleFilter(filter.name)}
                                    className={`m-1 px-2 py-1 rounded-full cursor-pointer border
                ${
                    selectedFilters.includes(filter.name)
                        ? 'bg-eagreen text-eaoffwhite border-eagreen'
                        : 'bg-eaoffwhite text-eaogreyaccent border-eaogreyaccent hover:border-eagreen hover:text-eagreen'
                }`}
                                >
                                    {filter.name}
                                </button>
                            )
                    )}
                </div>
            </div>
            <div className="justify-center">
                {userPosition ? (
                    <div className="mt-4">
                        <div className="flex flex-col items-center">
                            <div className="w-11/12 h-96 md:w-4/5 md:h-svh">
                                <APIProvider
                                    apiKey={apiKey}
                                    libraries={['places']}
                                    onLoad={() => setMapLoaded(true)}
                                >
                                    <Map
                                        defaultCenter={userPosition}
                                        defaultZoom={14}
                                        mapId="281c4f31582ca5d6"
                                        scrollwheel={true}
                                    >
                                        <AdvancedMarker
                                            position={userPosition}
                                            title="Your location"
                                        />
                                        {restaurants.map(
                                            (restaurant, index) => (
                                                <AdvancedMarker
                                                    key={index}
                                                    position={{
                                                        lat: restaurant.geometry.location.lat(),
                                                        lng: restaurant.geometry.location.lng(),
                                                    }}
                                                    title={restaurant.name}
                                                    onClick={() =>
                                                        handleMarkerClick(
                                                            restaurant
                                                        )
                                                    }
                                                />
                                            )
                                        )}
                                        {selectedRestaurant && (
                                            <InfoWindow
                                                position={{
                                                    lat: selectedRestaurant.geometry.location.lat(),
                                                    lng: selectedRestaurant.geometry.location.lng(),
                                                }}
                                                onCloseClick={() =>
                                                    setSelectedRestaurant(null)
                                                }
                                            >
                                                <div
                                                    style={{
                                                        maxWidth: '300px',
                                                    }}
                                                >
                                                    <h3>
                                                        {
                                                            selectedRestaurant.name
                                                        }
                                                    </h3>
                                                    <p>
                                                        <strong>
                                                            Address:
                                                        </strong>{' '}
                                                        {
                                                            selectedRestaurant.vicinity
                                                        }
                                                    </p>
                                                    {selectedRestaurant.rating && (
                                                        <p>
                                                            <strong>
                                                                Rating:
                                                            </strong>{' '}
                                                            {
                                                                selectedRestaurant.rating
                                                            }{' '}
                                                            ⭐
                                                        </p>
                                                    )}
                                                    {selectedRestaurant.opening_hours && (
                                                        <p>
                                                            <strong>
                                                                Open Now:
                                                            </strong>{' '}
                                                            {selectedRestaurant
                                                                .opening_hours
                                                                .open_now
                                                                ? 'Yes'
                                                                : 'No'}
                                                        </p>
                                                    )}
                                                    {selectedRestaurant.formatted_phone_number && (
                                                        <p>
                                                            <strong>
                                                                Phone:
                                                            </strong>{' '}
                                                            {
                                                                selectedRestaurant.formatted_phone_number
                                                            }
                                                        </p>
                                                    )}
                                                    {selectedRestaurant.website && (
                                                        <p>
                                                            <strong>
                                                                Website:
                                                            </strong>{' '}
                                                            <a
                                                                href={
                                                                    selectedRestaurant.website
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {
                                                                    selectedRestaurant.website
                                                                }
                                                            </a>
                                                        </p>
                                                    )}
                                                    {selectedRestaurant.photos &&
                                                        selectedRestaurant
                                                            .photos.length >
                                                            0 && (
                                                            <img
                                                                src={selectedRestaurant.photos[0]?.getUrl()}
                                                                alt={
                                                                    selectedRestaurant.name
                                                                }
                                                                style={{
                                                                    width: '100%',
                                                                    maxHeight:
                                                                        '150px',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        )}
                                                    <button
                                                        onClick={() =>
                                                            handleSaveToFavorites(
                                                                selectedRestaurant,
                                                                userId
                                                            )
                                                        }
                                                        style={{
                                                            padding: '8px 12px',
                                                            backgroundColor:
                                                                '#007BFF',
                                                            color: '#FFF',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            marginTop: '10px',
                                                        }}
                                                    >
                                                        Save to Favorites
                                                    </button>
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </Map>
                                </APIProvider>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-lg font-semibold text-gray-500">
                                OR
                            </h1>
                            <button
                                onClick={() => requestLocation()}
                                className={`mx-8 py-3 bg-eaorange text-white rounded-full shadow-md hover:bg-orange-500 transition-all ${
                                    isLoading
                                        ? 'cursor-not-allowed bg-blue-300'
                                        : ''
                                }`}
                                disabled={isLoading}
                            >
                                <div className="flex items-center justify-center gap-2 font-medium">
                                    <MapPin className="" />
                                    {isLoading
                                        ? 'Loading...'
                                        : 'use my location'}
                                </div>
                            </button>
                        </div>
                        <div
                            id="error-message"
                            className="text-red-500 mt-4"
                        ></div>
                    </>
                )}
            </div>
        </div>
    )
}
