const staticInput = require("../input.json");
const chalk = require('chalk');
const log = console.log;
const config = require("../config.json");
const geoJsons = {
    lines:[],
    points:[],
    polygons:[], // a circle can be made by polygons 
}
const {circle,point,lineString,length,along,distance} = require("@turf/turf");

log(chalk.yellow.bgGreen.bold('Generating coordinates...\n'))
log("We have total:"+`
    Lines: ${chalk.yellow(staticInput.lines.length)}
    Circles: ${chalk.yellow(staticInput.circles.length)}
    Points: ${chalk.yellow(staticInput.points.length)}
`);

log(chalk.white.magentaBright("==========================================================================="));

const fs = require('fs');

/**
 * Takes an object and write string repersentation of the object int file.
 * @param {Object} obj object to written
 */
function writeObjectToFile(obj){
    return new Promise((resolve,reject)=>{
        fs.writeFile("./geojson.json", JSON.stringify(obj),"utf8", function (err) {
            if (err) reject(err);
            else resolve();
        });
    })
}
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

/**
 * Return a number of points between those coordinates.
 * @param {Array} cords array of coordinates
 */
const getLineChunksForLineString=(line)=>{
    const sp = line[0], ep = line[line.length-1];
    const dist = length(lineString(line), {units: 'kilometers'});

    // distance b/w two generated points
    const sigmentLength = 1/config.lineSignmentLength;
    const lineStringJson = lineString(line);
    const cords = [];
    for(let i=1; i<dist*config.lineSignmentLength; i++){
        const np = along(lineStringJson, i*sigmentLength, {units:"kilometers"});
        cords.push(np.geometry.coordinates);
    }
    log(chalk.cyan(`        Generated ${cords.length} coordinates between [${sp}] and [${ep}] -- ${chalk.yellow(dist)} KM`))
    return lineString(cords);
}

log(chalk.yellow("Getting coordinates of polygon for circle..."));
log(chalk.white.bgRed(`The ploygons will generated over ${config.circleSteps+1 || 51} coordinates\n`))
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
    //const lineGeoJson = getLineChunksForLineString(line);
    //geoJsons.lines.push(lineGeoJson);
    geoJsons.lines.push(lineString(line));
});



async function WTF(){
    log(chalk.white.magentaBright("==========================================================================="));
    log(chalk.yellow('\nGenerating geojson file...'))
    await writeObjectToFile(geoJsons).then(res=>{
        log(chalk.yellow("Generated geojson..."));
    }).catch(err=>{
        log(chalk.red("ERROR...",err));
    })
}
WTF();