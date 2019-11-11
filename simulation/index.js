'use strict'

/*
* Modify this file as needed.
*/

// Connect to server
var io = require('socket.io-client');
const http = require('http')
const mechineStates = require('../simulation/machineStates');

var socket = io.connect("http://localhost:8081/", {
    reconnection: true
});

socket.on('connect', function () {
    socket.emit('device_online', 'Device Online.');
});

process.on('SIGTERM', function() {
  process.exit(0)
})

const server = http.createServer(function(req, res) {
  let body = []
  req.on('data', body.push.bind(body))
  req.on('end', () => {
    // just print to stdout
    //console.log(Buffer.concat(body).toString())
    
     let response = mechineStates.statesReponse(body);
     let stringResponse = `Recieved: ${body} command recieved \n ${response}`;
     console.log('Recieved: '+body+' Result:' +response);

    res.end(stringResponse,'ascii')
  })
})

server.listen(7071)
