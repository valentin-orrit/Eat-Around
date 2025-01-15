import { Card, CardContent } from '../ui/card'
import { Globe, Phone } from 'lucide-react'

export default function PlaceCard({ restaurant }) {
    // console.log(restaurant)

    return (
        <Card>
            <CardContent className="flex flex-col flex-wrap mt-1 p-1 w-40 sm:w-52 h-auto gap-y-1">
                <div className="relative ">
                    {restaurant.photos?.[0] ? (
                        <>
                            <img
                                src={restaurant.photos[0].getUrl()}
                                alt={restaurant.name.split(',')[0]}
                                className={`object-cover h-24 w-full rounded-md ${
                                    !restaurant.opening_hours?.open_now &&
                                    'grayscale opacity-70'
                                }`}
                            />
                            {restaurant.opening_hours && (
                                <div className="absolute bottom-2 left-2">
                                    {restaurant.opening_hours?.open_now ? (
                                        <p className="border rounded-md bg-eagreen text-eaoffwhite w-14 text-center text-xs">
                                            open
                                        </p>
                                    ) : (
                                        <p className="border rounded-md bg-red-800 text-eaoffwhite w-14 text-center text-xs">
                                            closed
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-24 flex items-center justify-center bg-gray-200">
                            <span className="text-sm text-gray-600">
                                No Image Available
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col px-2 w-full gap-y-1">
                    <span className="text-eabrown text-start font-semibold text-nowrap text-ellipsis overflow-hidden w-full">
                        {restaurant.name.split(/[,\|\-]/)[0]}
                    </span>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-start text-nowrap text-ellipsis overflow-hidden w-36">
                            {restaurant.vicinity.split(',')[0]}
                        </span>
                        <span className="hidden sm:inline text-end">
                            {restaurant.rating} ⭐
                        </span>
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
                            <p className="flex text-xs tracking-tight">
                                <Phone size={14} className="mr-1" />
                                {restaurant.formatted_phone_number}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
