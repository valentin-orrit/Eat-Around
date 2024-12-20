import { useState, useEffect } from 'react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

export default function MapInit() {
    const [userPosition, setUserPosition] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState('');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const requestLocation = (inputAddress) => {
        setIsLoading(true);
        const errorMessageElement = document.getElementById('error-message');
        const clearErrorMessage = () => {
            if (errorMessageElement) {
                errorMessageElement.textContent = '';
            }
        };

        if (inputAddress) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputAddress)}&key=${apiKey}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'OK') {
                        const position = data.results[0].geometry.location;
                        setUserPosition(position);
                        setIsLoading(false);
                        clearErrorMessage();
                    } else {
                        console.error('Geocoding error:', data.status);
                        if (errorMessageElement) {
                            errorMessageElement.textContent = 'Problem locating the address';
                            setTimeout(clearErrorMessage, 5000);
                        }
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching geocode data:', error);
                    if (errorMessageElement) {
                        errorMessageElement.textContent = 'Problem locating the address';
                        setTimeout(clearErrorMessage, 5000);
                    }
                    setIsLoading(false);
                });
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const position = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    };
                    setUserPosition(position);
                    setIsLoading(false);
                    clearErrorMessage();
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    if (errorMessageElement) {
                        errorMessageElement.textContent = 'Problem getting your location';
                        setTimeout(clearErrorMessage, 5000);
                    }
                    setIsLoading(false);
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
            if (errorMessageElement) {
                errorMessageElement.textContent = 'Problem getting your location';
                setTimeout(clearErrorMessage, 5000);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (mapLoaded && userPosition) {
            const service = new google.maps.places.PlacesService(document.createElement('div'));
            service.nearbySearch(
                {
                    location: userPosition,
                    radius: 5000,
                    type: 'restaurant',
                    keyword: filters.join(' '),
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setRestaurants(results);
                    } else {
                        console.error('Error searching for restaurants:', status);
                    }
                }
            );
        }
    }, [mapLoaded, userPosition, filters]);

    const toggleFilter = (filter) => {
        setFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    return (
        <div className="h-screen flex flex-col items-center">
            <div className="w-3/4 md:w-1/2 mb-4">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            requestLocation(address);
                        }
                    }}
                    placeholder="Enter your address"
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-md"
                />
            </div>
            <div className="main-container w-9/12 justify-center h-screen">
                {userPosition ? (
                    <>
                        <div className="filter-buttons justify-center my-4">
                            {['vegetarian', 'gluten-free', 'vegan', 'halal', 'lactose-free'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => toggleFilter(filter)}
                                    style={{
                                        margin: '5px',
                                        padding: '10px',
                                        backgroundColor: filters.includes(filter) ? 'lightgreen' : 'lightgray',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="h-screen flex flex-col items-center">
                            <div className="relative w-9/12 h-[60vh]">
                                <APIProvider
                                    apiKey={apiKey}
                                    libraries={['places']}
                                    onLoad={() => setMapLoaded(true)}
                                >
                                    <Map
                                        defaultCenter={userPosition}
                                        defaultZoom={14}
                                        mapId="DEMO_MAP_ID"
                                        scrollwheel={true}
                                    >
                                        <AdvancedMarker position={userPosition} />
                                        {restaurants.map((restaurant, index) => (
                                            <AdvancedMarker
                                                key={index}
                                                position={{
                                                    lat: restaurant.geometry.location.lat(),
                                                    lng: restaurant.geometry.location.lng(),
                                                }}
                                                title={restaurant.name}
                                            />
                                        ))}
                                    </Map>
                                </APIProvider>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-lg font-semibold text-gray-500">OR</h1>
                            <button
                                onClick={() => requestLocation()}
                                className={`px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all ${
                                    isLoading ? 'cursor-not-allowed bg-blue-300' : ''
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Use My Location'}
                            </button>
                        </div>
                        <div id="error-message" className="text-red-500 mt-4"></div>
                    </>
                )}
            </div>
        </div>
    );
}
