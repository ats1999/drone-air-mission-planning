import React,{useState,useEffect} from "react";
import ReactMapGL from 'react-map-gl';
import {GeolocateControl,FullscreenControl,NavigationControl} from "react-map-gl";
import {Marker} from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Layers} from "./UtilMap";
import io from "socket.io-client";

const ViewPlans=(props)=>{
    const [viewport, setViewport] = useState({
      width: "100%",
      height: 500,
      latitude: 26.127565,
      longitude: 85.420509,
      zoom: 8
    });

    const [lines, setLines] = useState([]);
    useEffect(()=>{
        const socket = io("http://localhost:4000");
        socket.on("connect", () => {
            console.log(socket.id); 
        });
    },[])
    return <div className="root-container">
        <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
            mapStyle={"mapbox://styles/rafilos556/ckhrp0auk0ol119s02qvctvh4"}
        >
            <div style={{position: 'absolute', right: 10,bottom:10}}>
                <GeolocateControl />
                <FullscreenControl />
                <NavigationControl />
            </div>
            
            {/* display current longitude and latitude */}
            <div style={{position: 'absolute', left: 10,bottom:30,padding:5,backgroundColor:"white",color:"black"}}>
                <b>lng: </b>{viewport.longitude} <br/>
                <b>lat: </b>{viewport.latitude}
            </div>
            

            {/* display lines */}
            {
                lines.map((line,idx)=>{
                        return <Layers.Line key={`view-plan-line-${idx}`} cords={line.cords} id={`view-plan-line-${idx}`} />
                })
            }

        </ReactMapGL>
    </div>
}

export default ViewPlans;