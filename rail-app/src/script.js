const express = require('express');
const path = require('path');
const cors = require('cors');
const server = express();

server.use(express.urlencoded({extended: "true"}));
server.use(express.json())
server.use(cors())
server.get('/', (req,res) =>{
    console.log('Connection Established!');
    res.send('Hello! Msg from the server!');
    res.end();
});
server.post('/change', (req,res) =>{
    console.log(req.body);
});

server.listen(1000,()=>{console.log('listening on port:1000!')});