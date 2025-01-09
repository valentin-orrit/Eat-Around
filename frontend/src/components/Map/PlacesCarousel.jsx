import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'

export default function PLacesCarousel({ restaurants }) {
    console.log(restaurants[0])

    return (
        <div className="flex justify-center align-middle text-eablack my-4">
            {restaurants && (
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
                                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 p-1 min-w-11/12 flex"
                            >
                                <div className="flex">
                                    <Card>
                                        <CardContent className="flex flex-col flex-wrap mt-1 p-1">
                                            <img
                                                src={restaurant.photos[0]?.getUrl()}
                                                alt={
                                                    restaurant.name.split(
                                                        ','
                                                    )[0]
                                                }
                                                className="w-full h-auto"
                                            />
                                            <span className="text-eagreen font-semibold">
                                                {restaurant.name.split(',')[0]}
                                            </span>
                                            <span className="text-xs">
                                                {restaurant.vicinity}
                                            </span>
                                        </CardContent>
                                    </Card>
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
