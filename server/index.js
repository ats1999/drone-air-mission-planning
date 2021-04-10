const express=require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const morgan = require('morgan')
const app = express();
const IO = require("./simulation/main");
const http = require("http");
const IOServer = http.createServer(app);
const io = require("socket.io")(IOServer);

const IO_PORT=process.env.IO_PORT||5000;

IO(io);

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(_,res)=>{
    res.send("This is the thing, i want")
})

IOServer.listen(IO_PORT,(err)=>{
    if(!err) 
        console.log("IO server is started..@ PORT "+IO_PORT)
    else console.log("IO server Problem....!!!!")
})
