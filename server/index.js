const express=require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const morgan = require('morgan')
const app = express();
const IO = require("./simulation/main");
const chalk = require('chalk');
const http = require("http");
const IOServer = http.createServer(app);
const io = require("socket.io")(IOServer);

const port=process.env.PORT||4000;
const IO_PORT=process.env.IO_PORT||5000;
io.on('connection', (socket) => {
    console.log(chalk.yellow("A socket connected!"));
    socket.emit("hello", "world");
    socket.on("hello",(arg)=>console.log(arg))
    IO(socket);
});
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(_,res)=>{
    res.send("This is the thing, i want")
})
// app.listen(port,(err)=>{
//     if(!err) 
//         console.log("server is started..@ PORT "+port)
//     else console.log("Problem....!!!!")
// });
IOServer.listen(5000,(err)=>{
    if(!err) 
        console.log("IO server is started..@ PORT "+IO_PORT)
    else console.log("IO server Problem....!!!!")
})
