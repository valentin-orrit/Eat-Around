import { useState, useEffect } from 'react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

export default function MapInit() {
    const [userPosition, setUserPosition] = useState({ lat: 44.8416106, lng: -0.5810938 });
    const [mapLoaded, setMapLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const position = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    };
                    setUserPosition(position); // Update user position
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
            const service = new google.maps.places.PlacesService(document.createElement('div')); // Dummy container
            service.nearbySearch(
                {
                    location: userPosition,
                    radius: 5000, 
                    type: 'restaurant', 
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
    }, [mapLoaded, userPosition]);


    return (
        <div id="container" className="h-screen">

<APIProvider
                apiKey={apiKey}
                libraries={['places']} 
                onLoad={() => setMapLoaded(true)} 
            >
                <Map
                    defaultCenter={userPosition}
                    defaultZoom={14}
                    mapId="DEMO_MAP_ID"
                    center={mapLoaded ? userPosition : undefined}
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
    );
}