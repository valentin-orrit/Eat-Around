import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'

export default function PLacesCarousel() {
    return (
        <div className="flex align-middle justify-center">
            <Carousel
                opts={{
                    align: 'center',
                    loop: true,
                }}
                className="w-full max-w-sm"
            >
                <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-1 w-full"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6 w-full">
                                        <span className="text-3xl font-semibold">
                                            {index + 1}
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
        </div>
    )
}
