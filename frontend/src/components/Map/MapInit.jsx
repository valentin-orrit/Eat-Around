import { useRef, useState, useEffect } from 'react'
import {
    AdvancedMarker,
    APIProvider,
    Map,
    InfoWindow,
} from '@vis.gl/react-google-maps'
import { Search, MapPin } from 'lucide-react'
import PlacesCarousel from './PlacesCarousel'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import PlaceCard from './PlaceCard'

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
    const [mapKey, setMapKey] = useState(0)
    const infoWindowRef = useRef(null)
    const inputRef = useRef(null)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { userId } = useAuth()
    const selectedFilters = filters
        .filter((f) => f.isSelected)
        .map((f) => f.name)
        .join(' ')

    function loadGoogleMapsApi(apiKey, libraries = []) {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve(window.google.maps)
                return
            }
            if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
                // Wait for the existing script to load
                const interval = setInterval(() => {
                    if (window.google && window.google.maps) {
                        clearInterval(interval)
                        resolve(window.google.maps)
                    }
                }, 50)
                return
            }
            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(
                ','
            )}`
            script.async = true
            script.defer = true
            script.onload = () => resolve(window.google.maps)
            script.onerror = (err) => reject(err)
            document.head.appendChild(script)
        })
    }

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

        loadGoogleMapsApi(apiKey, ['places'])
            .then(() => {
                if (inputRef.current) {
                    const autocomplete =
                        new window.google.maps.places.Autocomplete(
                            inputRef.current,
                            {
                                types: ['(cities)'],
                                fields: ['geometry', 'formatted_address'],
                            }
                        )

                    autocomplete.addListener('place_changed', () => {
                        const place = autocomplete.getPlace()
                        if (place.geometry && place.geometry.location) {
                            const position = {
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            }
                            setAddress(place.formatted_address)
                            setUserPosition(position)
                            setMapKey((prevKey) => prevKey + 1)
                        } else {
                            console.error(
                                'No geometry found for the selected place.'
                            )
                        }
                    })
                }
            })
            .catch((err) =>
                console.error('Error loading Google Maps API:', err)
            )
    }, [])

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
                        setMapKey((prevKey) => prevKey + 1)
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
                    setMapKey((prevKey) => prevKey + 1)
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

    return (
        <div className="flex flex-col w-full">
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
                        ref={inputRef}
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
                            <div className="w-11/12 h-72 md:w-4/5 md:h-96">
                                <APIProvider
                                    apiKey={apiKey}
                                    libraries={['places']}
                                    onLoad={() => setMapLoaded(true)}
                                >
                                    <Map
                                        key={mapKey}
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
                                                <PlaceCard
                                                    restaurant={
                                                        selectedRestaurant
                                                    }
                                                    setRestaurant={
                                                        setSelectedRestaurant
                                                    }
                                                    favorites={favorites}
                                                    setFavorites={setFavorites}
                                                />
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
            <PlacesCarousel
                restaurants={restaurants}
                setSelectedRestaurant={setSelectedRestaurant}
                favorites={favorites}
                setFavorites={setFavorites}
            />
        </div>
    )
}
