const chalk = require('chalk');
const staticData = require("../geojson.json");
const config = require("../config.json");
const custom = require("../custom");
const log = console.log;

// this will help us to remember start index even, if socket is disconnected
const cordIdx = {};
const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(() =>res(),config.sendDataAtTimeInterval);
    })
}
//console.log(staticLines[0].geometry.coordinates.length)

/**
 * 
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
        socket.emit('cords',custom.sendCurCords(cords[i],id))
        cordIdx.id = i;
    }
}

function IO(io){
    io.on('connection', (socket) => {
        console.log(chalk.yellow("A socket connected!"));
        socket.on("disconnect",()=>{
            console.log(chalk.red("A socket disconnected!"));
        });
        
        staticData.lines.forEach((line,id)=>{
            continueSendData(line,socket,id);
        })
    });

}

module.exports = IO;