const config = {
    "circleSteps":50,
    "lineSignmentLength":1
};
const geoJsons = {
    lines:[],
    points:[],
    polygons:[], // a circle can be made by polygons 
}
const {circle,point,lineString,lineChunk,along,distance} = require("@turf/turf");

/**
 * generate coordinates for circle.
 * @param {Array} center [longitude,latitude]
 * @param {Number} radius radius of cirlcle
 */
const circleToPolygon=(center,radius)=>{
    const steps = config.circleSteps || 50;
    const options = {steps: steps, units: 'kilometers',properties:{
        madeUsing:"Circle to polygon"
    }};
    const circleCords = circle(center, radius, options);
    return circleCords;
}

/**
 * get geojson for the coordinates.
 * @param {Array} center [longitude,latitude]
 */
const getPoint=(center)=>{
    const pointGeoJson = point(center);
    return pointGeoJson;
}

const getLineChunksForLineString=(cords)=>{
    let lineCords = [];
    for(let i=0; i<cords.length-1; i++){
        const lineChunk = getLineChunk(cords[i],cords[i+1]);
        lineCords = [...lineCords,...lineChunk];
    }
    return lineString(lineCords);
}

/**
 * Get line chunks between two points
 * @param {Array} sp [lon,lat] start point of line sigment
 * @param {Arrat} ep [lon,lat] end point of the line sigment 
 */
const getLineChunk=(sp,ep)=>{
    const dist = parseInt(distance(point(sp),point(ep),{units:"kilometers"}))*1000;
    let cp = sp; // current point

    // distance between generated two points
    let sigmentLength = dist/config.lineSignmentLength || dist/1;
        sigmentLength = parseInt(sigmentLength);

    const chunkCords = [sp];
    for(let i=0; i<dist; i++){
        const line = lineString([cp,ep]);

        // new point
        let np = along(line, sigmentLength, { units:"kilometers"});
        chunkCords.push(np.geometry.coordinates);
    }
    chunkCords.push(ep);
    return chunkCords;
}
export default function generateData(staticInput){
    //generate geojson polygon for each circle
    staticInput.circles.forEach((circle,idx)=>{
        const polygon = circleToPolygon(circle.cords,circle.radius);
        geoJsons.polygons.push(polygon);
    });

    //generate geojson points
    staticInput.points.forEach((pointInput,idx)=>{
        const pointGeoJson = getPoint(pointInput);
        geoJsons.points.push(pointGeoJson);
    });

    // generate lines
    staticInput.lines.forEach((line,idx)=>{
        const lineGeoJson = getLineChunksForLineString(line);
        geoJsons.lines.push(lineGeoJson);
    });

    return JSON.stringify(geoJsons);
}