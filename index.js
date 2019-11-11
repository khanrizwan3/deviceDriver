'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    //console.log("Device is online.");
    io.emit('driver_message','<p>Driver online</p>');
  
    socket.on('driver_message', function(message) {

        //if(message == 's' || message == 's\n'){
        io.emit('driver_message', '<strong>Sending command...</strong>: ' + message);

        request.post('http://localhost:7071/event', {
        json: message
        }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body);
        let bufferOne = Buffer.from(body);

        io.emit('device_message', '<p>'+bufferOne+'</p>');
        });

    });

    //device_online
    socket.on('device_online', function(message) {
        console.log(message);
        io.emit('device_message', message);
    });

});

const server = http.listen(8081, function() {
    console.log('listening on *:8081');
});
