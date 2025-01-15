import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'
import PlaceCard from './PlaceCard'

export default function PlacesCarousel({
    restaurants,
    favorites,
    setFavorites,
}) {
    return (
        <div className="flex justify-center align-middle text-eablack mt-8 w-full">
            {restaurants.length > 0 && (
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="max-w-36 sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-4xl 2xl:max-w-5xl"
                >
                    <CarouselContent className="">
                        {restaurants.map((restaurant, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/3 md:basis-1/4 xl:basis-1/5 p-1 min-w-11/12 flex"
                            >
                                <div className="flex">
                                    <PlaceCard
                                        restaurant={restaurant}
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    )
}
