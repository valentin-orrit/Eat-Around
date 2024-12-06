import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

export default function MapInit() {
    const position = { lat: 44.8416106, lng: -0.5810938 }
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    return (
        <div id="container" className="h-screen">
            <h1>map</h1>

            <APIProvider
                apiKey={apiKey}
                onLoad={() => console.log('Maps API has loaded.')}
            >
                <Map
                    defaultCenter={position}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                >
                    <AdvancedMarker position={position} />
                </Map>
            </APIProvider>
        </div>
    )
}
