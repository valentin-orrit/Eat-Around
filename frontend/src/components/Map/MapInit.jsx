import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

export default function MapInit() {
    const position = { lat: 44.8416106, lng: -0.5810938 }

    const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY

    return (
        <>
            {console.log(apiKey)}
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={position}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                >
                    <AdvancedMarker position={position} />
                </Map>
            </APIProvider>
        </>
    )
}
