var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.on('connection', function (socket) {

  socket.on('orientation', function (data) {
    console.log(data);
  });

});


if (process.env.SPARK_TOKEN == undefined || process.env.SPARK_DEVICE_ID == undefined){

    var config = require('./config');
    token = config.token;
    id = config.id;

}else{

    token = process.env.SPARK_TOKEN;
    id = process.env.SPARK_DEVICE_ID;

}

var board = new five.Board({
    io: new Spark({
        token: token,
        deviceId: id
    })
});

board.on("ready", function() {
    var led = new five.Led("D7");

    // This bit of js injects the led variable into the
    // repl you get after this script finishes execution.
    board.repl.inject({
        led: led
    });

});