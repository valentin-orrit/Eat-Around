import MapInit from '../components/Map/MapInit'

export default function Home() {
    return (
        <>
            <h1 className="text-4xl font-bold">Eat Around</h1>
            <div className="map">
                <MapInit />
            </div>
        </>
    )
}
