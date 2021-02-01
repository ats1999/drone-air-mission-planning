const staticInput = require("../input.json");
const chalk = require('chalk');
const log = console.log;
const geoJsons = {
    lines:[],
    points:[],
    polygons:[], // a circle can be made by polygons 
}
const {circle,point,lineString,lineChunk,along,distance} = require("@turf/turf");

log(chalk.yellow.bgGreen.bold('Generating coordinates...\n'))
log("We have total:"+`
    Lines: ${chalk.yellow(staticInput.lines.length)}
    Circles: ${chalk.yellow(staticInput.circles.length)}
    Points: ${chalk.yellow(staticInput.points.length)}
`);

log(chalk.white.magentaBright("==========================================================================="));
/**
 * generate coordinates for circle.
 * @param {Array} center [longitude,latitude]
 * @param {Number} radius radius of cirlcle
 */
const circleToPolygon=(center,radius)=>{
    const steps = staticInput.steps || 50;
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
    const dist = parseInt(distance(point(sp),point(ep),{units:"kilometers"}));
    let cp = sp; // current point

    // distance between generated two points
    let sigmentLength = dist/staticInput.sigmentLength || dist/1;
        sigmentLength = parseInt(sigmentLength);

    const chunkCords = [sp];
    for(let i=0; i<dist; i++){
        const line = lineString([cp,ep]);

        // new point
        let np = along(line, sigmentLength, { units:"kilometers"});
        chunkCords.push(np.geometry.coordinates);
    }
    chunkCords.push(ep);
    log(chalk.cyan(`        Generated ${chunkCords.length} coordinates between two coordinates`))
    return chunkCords;
}
log(chalk.yellow("Getting coordinates of polygon for circle..."));
log(chalk.white.bgRed(`The ploygons will generated over ${staticInput.steps+1 || 51} coordinates\n`))
//generate geojson polygon for each circle
staticInput.circles.forEach((circle,idx)=>{
    const polygon = circleToPolygon(circle.cords,circle.radius);
    geoJsons.polygons.push(polygon);
    // log
    log(chalk.green(`   Circle - ${idx+1}
        Cords:[${circle.cords}]
        Radius:${circle.radius}
            ${chalk.red.bgWhiteBright("Polygon for Circle")} - ${idx+1}:
            ${polygon.geometry.coordinates[0].length} coordinates generated for ${chalk.yellow('this')} circle
    `))
});

log(chalk.yellow("Generating geojson for points..."));
//generate geojson points
staticInput.points.forEach((pointInput,idx)=>{
    const pointGeoJson = getPoint(pointInput);
    geoJsons.points.push(pointGeoJson);
    // log
    log(chalk.green(`   Point - ${idx+1}
        Cords:[${pointInput}]
        ${chalk.yellow("Generated!")}
    `))
});

log(chalk.yellow("Generating line chunks for lines..."));
// generate lines
staticInput.lines.forEach((line,idx)=>{
    // log
    log(chalk.green(`   Line - ${idx+1}
        Length:[${line.length}]
    `))
    const lineGeoJson = getLineChunksForLineString(line);
    geoJsons.lines.push(lineGeoJson);
});

const path = require("path");
const fs = require('fs');
log(chalk.white.magentaBright("==========================================================================="));
log(chalk.yellow('\nGenerating geojson file...'))
fs.writeFile("./geojson.json", JSON.stringify(geoJsons),"utf8", function (err) {
  if (err) throw err;
  log(chalk.green('\nGenerated geojson file\n geojson operation completed'))
});