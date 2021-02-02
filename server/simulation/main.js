const chalk = require('chalk');
const staticData = require("../geojson.json");
const config = require("../config.json");
const log = console.log;

// this will help us to remember start index even, if socket is disconnected
const cordIdx = {};
const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(() =>res(),config.sendDataAtTimeInterval);
    })
}
//console.log(staticLines[0].geometry.coordinates.length)

// continusly send data through socket
const continueSendData=async(line,socket,id)=>{
    const cords = line.geometry.coordinates;
    log(chalk.green(`We got line`),id+1);

    for(let i=cordIdx.id||0; i<cords.length; i++){
        await sleep();
        log(chalk.green(`Sent coordinates ${i+1} for line ${id+1} and coordinates:`),cords[i]);
        socket.emit('cords',{cord:cords[i],id})
        cordIdx.id = i;
    }
}

function IO(socket){
    socket.on("disconnect",()=>{
        console.log(chalk.red("A socket disconnected!"));
    });

    staticData.lines.forEach((line,id)=>{
        continueSendData(line,socket,id);
    })
}

module.exports = IO;