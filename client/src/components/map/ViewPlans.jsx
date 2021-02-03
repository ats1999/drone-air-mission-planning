import React,{useState} from "react";
import ReactMapGL from 'react-map-gl';
import {GeolocateControl,FullscreenControl,NavigationControl} from "react-map-gl";
import {Marker} from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Layers} from "./UtilMap";
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import staticData from "./static";

const useStyles = makeStyles({
    operationContainer:{
        position:"absolute",
        bottom:0,
        right:0,
        backgroundColor:"white",
        color:"black",
        margin:5,
        padding:5,
        width:"200px",
        height:200,
        zIndex:1000,
        boxShadow:'0px 0px 30px lightgreen',
        border:"4px solid lightgreen"
    }
})
const ViewPlans=({store})=>{
    const [viewport, setViewport] = useState({
      width: "100%",
      height: 500,
      latitude: 26.127565,
      longitude: 85.420509,
      zoom: 8
    });

    const [show, setShow] = useState({
        points:true,lines:true,circles:true
    })

    let accessToken = localStorage.mapToken || process.env.REACT_APP_MAP_BOX_TOKEN;

    return <div className="root-container">
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
            
            {/* display current longitude and latitude */}
            <div style={{position: 'absolute', left: 10,bottom:30,padding:5,backgroundColor:"white",color:"black"}}>
                <b>lng: </b>{viewport.longitude} <br/>
                <b>lat: </b>{viewport.latitude}
            </div>
            
            {/* display ponints */}
            {
                show.points && store.points.map((point,idx)=>{
                    return <Marker key={`view-plan-point-${idx}`}  offsetLeft={-20} offsetTop={-25} longitude={point[0]} latitude={point[1]}>
                            <LocationOnIcon className="add_location_icon" color="secondary"/>
                    </Marker>
                })
            }

            {/* display lines */}
            {
                show.lines ? store.lines.map((line,idx)=>{
                    return <Layers.Line key={`view-plan-line-${idx}`} cords={line} id={`view-plan-line-${idx}`} />
                }):null
            }

            {/* display circles */}
            {
                show.circles && store.circles.map((circle,idx)=>{
                    return <Layers.Circle cords={circle.cords} radius={circle.radius} id={`view-plan-circle-${idx}`} key={`view-plan-circle-${idx}`} />
                })
            }
        </ReactMapGL>
        <ShowLayers show={show} setShow={setShow} store={store} />
    </div>
}

const ShowLayers=({show,setShow,store})=>{
    const classes = useStyles();
    return <Card className={classes.operationContainer}>
            <p className="muted__text p_margin">Select the layers to display</p> <hr/>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={show.points} onChange={(e)=>{
                        setShow({...show,points:!show.points})
                    }} name="Points" />}
                    label="Points"
                />
                <FormControlLabel
                    control={<Checkbox checked={show.lines} onChange={(e)=>{
                        setShow({...show,lines:!show.lines})
                    }} name="Lines" />}
                    label="Lines"
                />
                <FormControlLabel
                    control={<Checkbox checked={show.circles} onChange={(e)=>{
                        setShow({...show,circles:!show.circles})
                    }} name="Circles" />}
                    label="Circles"
                />
            </FormGroup>
            
      <Fab onClick={()=>{
           const el = document.createElement('textarea');
           el.value = JSON.stringify(store);
           // we can use staticData(store), but it is freezing browser
           el.setAttribute('readonly', '');
           el.style.position = 'absolute';
           el.style.left = '-9999px';
           document.body.appendChild(el);
           el.select();
           document.execCommand('copy');
           document.body.removeChild(el);
        }} 
        color="primary" aria-label="add" variant="extended" size="small" >
        <FileCopyIcon fontSize="small"/>
        Copy geojson Data
      </Fab>
    </Card>
}
export default ViewPlans;