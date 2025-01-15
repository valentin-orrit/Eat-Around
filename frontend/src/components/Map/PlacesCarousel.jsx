import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'
import PlaceCard from './PlaceCard'

export default function PlacesCarousel({ restaurants }) {
    return (
        <div className="flex justify-center align-middle text-eablack my-4">
            {restaurants.length > 0 && (
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-4xl"
                >
                    <CarouselContent className="">
                        {restaurants.map((restaurant, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/1 md:basis-1/4 xl:basis-1/5 p-1 min-w-11/12 flex"
                            >
                                <div className="flex">
                                    <PlaceCard restaurant={restaurant} />
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
