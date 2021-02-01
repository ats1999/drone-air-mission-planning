const express=require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan')
const app = express();

const port=process.env.PORT||4000;
const http = require('http').createServer(app);
const io = require('socket.io')(http,{cors:{
    origin:`http://localhost:${port}`,
    methods: ["GET", "POST"]
}});
io.on('connection', (socket) => {
    console.log('a user connected');
});
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status'));

app.get("/",(_,res)=>{
    res.send("This is the thing, i want")
})
app.listen(port,(err)=>{
    if(!err) 
        console.log("server is started..@ PORT "+port)
    else console.log("Problem....!!!!")
})