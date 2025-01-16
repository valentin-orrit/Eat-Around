import { useAuth } from "@clerk/clerk-react"
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps"

export default function CustomMarker ({restaurant,index,setSelectedRestaurant,favorites}) {
    const matchingFavorite = favorites?.find((fav) => {
        const restaurantLat = restaurant.geometry.location.lat()
        const restaurantLng = restaurant.geometry.location.lng()

        const threshold = 0.0000001
        return (
            Math.abs(fav.place.latitude - restaurantLat) < threshold &&
            Math.abs(fav.place.longitude - restaurantLng) < threshold
        )
    })

    const isFavorite = !!matchingFavorite

    const handleMarkerClick = (restaurant) => {
        setSelectedRestaurant(restaurant)
    }
    return (
        <div>
            {console.log(index)}
                    <AdvancedMarker
                        key={restaurant.name}
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
                        
                    >
                        {isFavorite ?
                        <Pin
                        background={"#f9a705"}
                        scale={1.1}
                        glyphColor={"#3c8236"}
                        borderColor={"#f9a705"}
                    /> : <Pin/>}
                    </AdvancedMarker>
        </div>
    )
}