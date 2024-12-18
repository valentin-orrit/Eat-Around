import { useState, useEffect } from 'react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

export default function MapInit() {
    const [userPosition, setUserPosition] = useState({ lat: 44.8416106, lng: -0.5810938 });
    const [mapLoaded, setMapLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [filters, setFilters] = useState([]);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const position = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    };
                    setUserPosition(position);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (mapLoaded) {
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
        <div id="container" className="h-screen">
            <APIProvider
                apiKey={apiKey}
                libraries={['places']}
                onLoad={() => setMapLoaded(true)}
            >
                <div className="filter-buttons" style={{ margin: '10px' }}>
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

                <Map
                    defaultCenter={userPosition}
                    defaultZoom={14}
                    mapId="DEMO_MAP_ID"
                    center={mapLoaded ? userPosition : undefined}
                >
                    <AdvancedMarker 
                    position={userPosition}
                     />

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
    );
}
