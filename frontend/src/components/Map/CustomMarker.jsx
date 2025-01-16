import { useAuth } from "@clerk/clerk-react"
import { AdvancedMarker } from "@vis.gl/react-google-maps"

export default function CustomMarker ({restaurant,index,setSelectedRestaurant,favorites}) {

    const { userId } = useAuth()

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
                        glyphColor={isFavorite ? "blue" : "pink"}
                    />
        </div>
    )
}