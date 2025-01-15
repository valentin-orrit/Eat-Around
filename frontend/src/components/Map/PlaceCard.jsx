import { Card, CardContent } from '../ui/card'
import { Globe, Phone } from 'lucide-react'

export default function PlaceCard({ restaurant }) {
    // console.log(restaurant)

    return (
        <Card>
            <CardContent className="flex flex-col flex-wrap mt-1 p-1 w-52 h-52 gap-y-1">
                {restaurant.photos?.[0] ? (
                    <img
                        src={restaurant.photos[0].getUrl()}
                        alt={restaurant.name.split(',')[0]}
                        className="object-cover h-24 rounded-md"
                    />
                ) : (
                    <div className="w-full h-auto flex items-center justify-center bg-gray-200">
                        <span className="text-sm text-gray-600">
                            No Image Available
                        </span>
                    </div>
                )}
                <div className="flex flex-col px-2 w-full gap-y-">
                    <span className="text-eagreen text-start font-semibold text-nowrap text-ellipsis overflow-hidden w-full">
                        {restaurant.name.split(/[,\|\-]/)[0]}
                    </span>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-start text-nowrap text-ellipsis overflow-hidden w-36">
                            {restaurant.vicinity.split(',')[0]}
                        </span>
                        <span className="text-end">{restaurant.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        {restaurant.website && (
                            <a
                                href={restaurant.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-start"
                            >
                                <Globe size={18} />
                            </a>
                        )}
                        {restaurant.formatted_phone_number && (
                            <p className="text-xs tracking-tight">
                                {restaurant.formatted_phone_number}
                            </p>
                        )}
                    </div>
                    <div className="text-xs">
                        {restaurant.opening_hours && (
                            <div>
                                {restaurant.opening_hours.open_now ? (
                                    <p className="border rounded-md bg-eagreen text-eaoffwhite w-14">
                                        open
                                    </p>
                                ) : (
                                    <p className="border rounded-md bg-red-600 text-eaoffwhite w-14">
                                        closed
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
