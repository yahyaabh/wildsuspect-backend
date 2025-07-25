//importing necessary modules
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
require('dotenv').config();
//using middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//socket integration
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

require('./socket')(io);

server.listen(PORT,'0.0.0.0',()=>{
  console.log("server is running on port " + PORT);
})

