import MapInit from '../components/Map/MapInit'
import LogoLight from '../assets/eat-around-logo-light.svg'

export default function Home() {
    return (
        <div className="">
            <div id="title">
                <img src={LogoLight} alt="eat around logo" className="w-8" />
                <h1 className="text-4xl font-bold">Eat Around</h1>
                <p>
                    Find your next <span>favorite</span> place!
                </p>
            </div>

            <div id="map" className="min-w-full">
                <MapInit />
            </div>

            <div id="cards"></div>
        </div>
    )
}
