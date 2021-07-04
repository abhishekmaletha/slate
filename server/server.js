
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});
let connections = [];
io.on("connect", (socket) => {
    connections.push(socket);
    console.log(`${socket.id} has connected`);
    socket.on('send', (data)=> {
        connections.forEach(con => {
            if(con.id != socket.id)
            con.emit('draw', data);
            console.log('data in server', data);
        })
    });
    //Disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.id} was disconnected`);
        connections=connections.filter((con) => con.id!==socket.id);
    });
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 4000;
http.listen(server_port, () => {
    console.log("Started on : " + server_port);
});
