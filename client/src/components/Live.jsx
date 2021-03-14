import React,{useState,useEffect} from 'react'
import ReactMapGL from 'react-map-gl';
import {point,bearing} from "@turf/turf";

import {
    GeolocateControl,
    FullscreenControl,
    NavigationControl,
    Marker,
    Source,
    Layer
} from "react-map-gl";
import io from "socket.io-client";

const lineLayer = {
    'id': 'test__line',
    'type': 'line',
    'properties':{
        name:"test__line"
    },
    'source': 'test__line',
    'paint': {
        'line-color': 'red',
        'line-width':4
    }
}
function Live() {
    const [viewport, setViewport] = useState({
      width: "100%",
      height: 500,
      latitude: 26.127565,
      longitude: 85.420509,
      zoom: 2
    });

    const [dronePos, setDronePos] = useState({
        longitude:85.420509,
        latitude:26.127565,
        bearing:0
    });

    const [geojsonData, setGeojsonData] = useState(null);
    
    useEffect(() => {
        let socket = io("http://localhost:5000/");
        socket.on("cords",(data)=>{
            setDronePos({
                longitude:data.cords[0],
                latitude:data.cords[1],
                bearing:bearing(
                    point(data.cords),
                    point([
                        dronePos.longitude,
                        dronePos.latitude
                    ])
                )
            });
        });

        socket.on('static__data',(staticData)=>{
            setGeojsonData(staticData);
        });
        
        return () => {
            socket.disconnect();
        }
    }, [])
    let accessToken = localStorage.mapToken || process.env.REACT_APP_MAP_BOX_TOKEN;
    return (
        <div>
            <ReactMapGL
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken={accessToken}
                mapStyle={"mapbox://styles/mapbox/streets-v11"}
            >
                <div style={{position: 'absolute', right: 10,bottom:10}}>
                    <GeolocateControl />
                    <FullscreenControl />
                    <NavigationControl />
                </div>

                <Marker
                    longitude={dronePos.longitude}
                    latitude={dronePos.latitude}
                    offsetTop={-22}
                >
                    <img 
                        alt="Drone" 
                        src="https://img.icons8.com/ios-filled/50/000000/airplane-landing.png"
                        height={40}
                        width={40}
                        style={{
                            transform:`rotate(${dronePos.bearing}deg)`
                        }}
                    />
                </Marker>

                {geojsonData && <Source
                    id="test__line"
                    type="geojson"
                    data={geojsonData.lines[0]}
                >
                    <Layer {...lineLayer}/>
                </Source>}
            </ReactMapGL>
        </div>
    )
}

export default Live
