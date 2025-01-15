import MapInit from '../components/Map/MapInit'
import LogoLight from '../assets/eat-around-logo-light.svg'

export default function Home({ filters, setFilters, favorites, setFavorites }) {
    return (
        <div className="flex flex-col p-4 w-11/12 lg:px-16 lg:py-8 lg:max-w-8xl">
            <div
                id="title"
                className="flex justify-center items-center mt-4 lg:mt-0 mb-8"
            >
                <img
                    src={LogoLight}
                    alt="eat around logo"
                    className="w-20 mr-2 mb-2"
                />
                <div id="title-text" className="flex items-end">
                    <h1 className="text-4xl font-extrabold mr-2 hidden sm:inline">
                        Eat Around
                    </h1>
                    <p className="text-sm pb-1 hidden md:inline">
                        find your next{' '}
                        <span className="text-eaorange"> favorite </span> place!
                    </p>
                </div>
            </div>

            <div id="map" className="">
                <MapInit
                    filters={filters}
                    setFilters={setFilters}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
            </div>

            <div id="cards"></div>
        </div>
    )
}
