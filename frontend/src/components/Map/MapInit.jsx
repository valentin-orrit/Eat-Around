import { useState, useEffect } from 'react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

export default function MapInit() {
    const [userPosition, setUserPosition] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const requestLocation = () => {
        setIsLoading(true); 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const position = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    };
                    setUserPosition(position);
                    setIsLoading(false); 
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setIsLoading(false); 
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
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

    if (!userPosition) {
        return (
            <div className="loading-container flex flex-col items-center justify-center h-screen">
                <button
                    onClick={requestLocation}
                    className={`px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all ${
                        isLoading ? 'cursor-not-allowed bg-blue-300' : ''
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Use My Location'}
                </button>
            </div>
        );
    }

    return (
        <div id="container" className="h-screen flex flex-col items-center">
            <APIProvider
                apiKey={apiKey}
                libraries={['places']}
                onLoad={() => setMapLoaded(true)}
            >
                {/* Filter Buttons */}
                <div className="filter-buttons flex flex-wrap justify-center my-4">
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
    
                {/* Map */}
                <div className="w-full flex justify-center">
                    <div className="relative w-9/12 h-[60vh]">
                        <Map
                            defaultCenter={userPosition}
                            defaultZoom={14}
                            mapId="DEMO_MAP_ID"
                            onClick={() => console.log("Aie")}
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
                    </div>
                </div>
            </APIProvider>
        </div>
    );
}    