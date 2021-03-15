const chalk = require('chalk');
const staticData = require("../geojson.json");
const config = require("../config.json");
const custom = require("../custom");
const input = require("../input.json");
const { lineString,length,along } = require('@turf/turf');
const log = console.log;

// this will help us to remember start index even, if socket is disconnected
const cordIdx = {};

// wait for few seconds before sending the coordinates
const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(() =>res(),config.sendDataAtTimeInterval);
    })
}

/**
 * This method is depreacted, but kept for testing
 * It uses much memory than required
 * @param {Object} line geojson repersentation of line 
 * @param {Object} socket socket object of socket.io
 * @param {String} id id of the line
 */
const continueSendData=async(line,socket,id)=>{
    const cords = line.geometry.coordinates;
    log(chalk.green(`We got line`),id+1);
    for(let i=cordIdx.id||0; i<cords.length; i++){
        await sleep();
        log(chalk.green(`Sent coordinates ${i+1} for line ${id+1} and coordinates:`),cords[i]);
        socket.emit('cords',custom.sendCurCords(cords[i],id));
        cordIdx.id = i;
    }
    log(chalk.green(`Finished line ${id+1}`));
}

/**
 * This method will send coordinates on the fly
 * It will continually generate the data
 * @param {Object} line geojson repersentation of line 
 * @param {Object} socket socket object of socket.io
 * @param {String} id id of the line
 */
const sendData = async(line,socket,id)=>{
    const dist = length(lineString(line), {units: 'kilometers'});
    log(chalk.green(`Line ${id+1} and length: ${dist} km`));
    // distance b/w two generated points
    const sigmentLength = 1/config.lineSignmentLength;
    const lineStringJson = lineString(line);

    for(let i=cordIdx.id||0; i<dist*config.lineSignmentLength;){
        const np = along(lineStringJson, i*sigmentLength, {units:"kilometers"});
        const nCords = np.geometry.coordinates;

        log(chalk.green(`Sent coordinates ${i+1} for line ${id+1} and coordinates:`),nCords);
        socket.emit('cords',custom.sendCurCords(nCords,id));
        cordIdx.id = ++i;
        await sleep();
    }
}

function IO(io){
    io.on('connection', (socket) => {
        console.log(chalk.yellow("A socket connected!"));
        socket.on("disconnect",()=>{
            console.log(chalk.red("A socket disconnected!"));
        });
        
        staticData.lines.forEach((line,id)=>{
            //continueSendData(line,socket,id);
        });

        input.lines.forEach((line,id)=>{
            sendData(line,socket,id);
        })

        socket.emit('static__data',staticData);
    });
}

module.exports = IO;