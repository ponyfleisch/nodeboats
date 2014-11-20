var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var motorR, motorL;

server.listen(80);

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

    motorR = new five.Motor({
        pin: 'A6'
    });

    motorL = new five.Motor({
        pin: 'A7'
    });

});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.on('connection', function (socket) {

  socket.on('orientation', function (data) {

    if(data.l !== undefined && data.r !== undefined){
        motorL.start(data.l);
        motorR.start(data.r);
    }

  });

});


