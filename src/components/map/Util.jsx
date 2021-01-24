import React,{useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    addButton:{
        position:"absolute",
        bottom:4,
        left:4
    },
    uploadButton:{
        position:"absolute",
        bottom:4,
        right:4
    }
});
const GetSelectedOperation=({operation,mapProps})=>{
    switch(operation){
        case "point":
            return <PointOperation mapProps={mapProps}/>;

        case 'line':
            return <LineOperation mapProps={mapProps}/>;
            
        case 'circle':
            return <CircleOperation mapProps={mapProps}/>;
        default : return null;
    }
}

const CircleOperation=({mapProps})=>{
    const classes = useStyles();
    const [radius, setRadius] = React.useState(20);
    useEffect(()=>{
        if(mapProps && mapProps.clickedLngLat){
            mapProps.setTmpData({
                cords:mapProps.clickedLngLat,
                radius:radius
            });
        }
    },[mapProps.clickedLngLat,radius]);

    return <div>
        <p className="muted__text">Click any where on the map to create add circle center point</p>
        {
            (mapProps&&mapProps.clickedLngLat)&&<>
                <hr/>
                <p>Your selected point</p>
                <ul>
                    <li>
                        <b>Lon:</b> {mapProps.clickedLngLat[0]}
                    </li>
                    <li>
                        <b>Lat:</b> {mapProps.clickedLngLat[1]}
                    </li>
                </ul>
            </>
        }
        <div className="input_radius_container">
            <p>Radius</p>
            <input 
                value={radius}
                onChange={(e)=>setRadius(e.target.value)}
                type="number"
                placeholder="radius in KM"
            />
            <p>KM</p>
        </div>
        <Button variant="contained" color="primary" 
            size="small" disabled={!mapProps||!mapProps.clickedLngLat}
            className={classes.addButton}
            onClick={(e)=>{
                mapProps.setCurData({
                    cords:mapProps.clickedLngLat,
                    radius:radius
                });
                mapProps.setClickedLngLat(null);
                mapProps.setTmpData(null);
            }}
            >
            Add Circle 
        </Button>
    </div>
}
const LineOperation=({mapProps})=>{
    const classes = useStyles();
    return <div>
        <p className="muted__text">Click any where on the map to create add line point</p>

        {
            (mapProps&&mapProps.clickedLngLat)&&<>
                <hr/>
                <p>Your selected point</p>
                <ul>
                    <li>
                        <b>Lon:</b> {mapProps.clickedLngLat[0]}
                    </li>
                    <li>
                        <b>Lat:</b> {mapProps.clickedLngLat[1]}
                    </li>
                </ul>
            </>
        }
        <Button variant="contained" color="primary" 
            size="small" disabled={!mapProps||!mapProps.clickedLngLat}
            className={classes.addButton}
            onClick={(e)=>{
                let data = mapProps.tmpData || [mapProps.clickedLngLat];
                mapProps.setTmpData([...data,mapProps.clickedLngLat]);
                mapProps.setClickedLngLat(null);
            }}
            >
            Add point
        </Button>
        <Button variant="contained" color="primary" 
            size="small" disabled={!mapProps.tmpData}
            className={classes.uploadButton}
            onClick={(e)=>{
                mapProps.setCurData(mapProps.tmpData);
                mapProps.setClickedLngLat(null);
                mapProps.setTmpData(null);
            }}
            >
            Add Line 
        </Button>
    </div>
}

const PointOperation=({mapProps})=>{
    const classes = useStyles();
    return <div>
        <p className="muted__text">Click any where on the map to create point</p>

        {
            (mapProps&&mapProps.clickedLngLat)&&<>
                <hr/>
                <p>Your selected point</p>
                <ul>
                    <li>
                        <b>Lon:</b> {mapProps.clickedLngLat[0]}
                    </li>
                    <li>
                        <b>Lat:</b> {mapProps.clickedLngLat[1]}
                    </li>
                </ul>
            </>
        }
        <Button variant="contained" color="primary" 
            size="small" disabled={!mapProps||!mapProps.clickedLngLat}
            className={classes.addButton}
            onClick={(e)=>{
                mapProps.setCurData(mapProps.clickedLngLat);
                mapProps.setClickedLngLat(null);
            }}
            >
            Add point
        </Button>
    </div>
}

export default GetSelectedOperation;