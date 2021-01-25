import React,{useEffect} from 'react'
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import {GeolocateControl,FullscreenControl,NavigationControl} from "react-map-gl";
import {Marker} from "react-map-gl";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import GetSelectedOperation from "./Util";
import GetCurrentFeature from "./UtilMap"

const useStyles = makeStyles({
    operationContainer:{
        position:"absolute",
        top:0,
        left:0,
        backgroundColor:"white",
        color:"black",
        margin:5,
        padding:5,
        width:"300px",
        height:300,
        zIndex:1000,
        boxShadow:'0px 0px 30px lightgreen',
        border:"4px solid lightgreen"
    },
    label:{
        padding:5
    }
})
function CreatePlan(props) {
    const {store,addSource} = props;
    const [viewport, setViewport] = useState({
      width: "100%",
      height: 500,
      latitude: 26.127565,
      longitude: 85.420509,
      zoom: 8
    });

    const [operation, setOperation] = useState("select");
    const [clickedLngLat, setClickedLngLat] = useState(null);
    const [curData, setCurData] = useState(null);
    const [tmpData, setTmpData] = useState(null);

    useEffect(()=>{
        if(curData){
            addSource(curData,operation)
        }
    },[curData]);
    return (
        <div className="root-container">
            <ReactMapGL
                onClick={(e)=>{
                    setClickedLngLat(e.lngLat);
                }}
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

                {
                    (clickedLngLat)&&
                    <Marker offsetLeft={-20} offsetTop={-25} longitude={clickedLngLat[0]} latitude={clickedLngLat[1]}>
                        <AddLocationIcon className="add_location_icon" color="secondary"/>
                    </Marker>
                }
                <GetCurrentFeature operation={operation} data={tmpData}/>
            </ReactMapGL>
            
            <Operations 
                operation={operation} 
                getOperation={setOperation}
                flushData={(e)=>{
                    setTmpData(null);
                    setCurData(null);
                    setClickedLngLat(null)
                }}
                mapProps={{
                    clickedLngLat:clickedLngLat,
                    setClickedLngLat:setClickedLngLat,
                    setCurData:setCurData,
                    curData:curData,
                    tmpData:tmpData,
                    setTmpData:setTmpData
                }}
            />
        </div>
    )
}

const Operations=({getOperation,operation,mapProps,flushData})=>{
    const classes = useStyles();
    return <Card className={classes.operationContainer}>
        <FormControl >
        <InputLabel className={`${classes.label}`}>Add</InputLabel>
        <Select 
            value={operation}
            onChange={(e)=>{
                getOperation(e.target.value);
                flushData();
            }} 
        >
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="point">Point</MenuItem>
            <MenuItem value="circle">Circle</MenuItem>
            <MenuItem value="polygon">Polygon</MenuItem>
        </Select>
    </FormControl>
    <hr/>
    {operation === "select" && <p className="muted__text">Please select any operation</p>}

        <GetSelectedOperation operation={operation} mapProps={mapProps}/>
    </Card>
}
export default CreatePlan
