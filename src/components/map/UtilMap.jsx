import React from 'react'
import {Source,Layer} from "react-map-gl";
import {lineString,circle} from "@turf/turf";

const Circle=({cords,radius,id})=>{
    let options = {steps: 50, units: 'kilometers', properties: {foo: 'bar'}};
    return <Source id={id || "circle-create-plan"} type="geojson" data={circle(cords, radius, options)}>
            <Layer
                id={id || "circle-create-plan"}
                type="fill"
                source={id || "circle-create-plan"}
                paint={{
                'fill-color': 'red',
                'fill-opacity': 0.5,
                'fill-outline-color':'red'
                }} />
    </Source>
}

const Line=({cords,id})=>{
    return <Source id={id || "line-create-plan"} type="geojson" data={lineString(cords)}>
            <Layer
                id={id || "line-create-plan"}
                type="line"
                source={id || "line-create-plan"}
                paint={{
                'line-color': 'red',
                'line-width': 5
                }} />
    </Source>
}
export default function GetCurrentFeature({operation,data}){
    if(operation==='point' || !data) return null;
    switch(operation){
        case 'circle':
            return <Circle cords={data.cords} radius={data.radius}/>
        case 'line':
            return <Line cords={data}/>
        default: return null;
    }
}

export const Layers = {
    Circle:Circle,
    Line:Line
}