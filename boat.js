var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var motorR, motorL;
var five = require("johnny-five");
var Spark = require("spark-io");

server.listen(80);

console.log('BARR');

if (process.env.SPARK_TOKEN == undefined || process.env.SPARK_DEVICE_ID == undefined){

    var config = require('./config');
    token = config.token;
    id = config.id;

}else{

    token = process.env.SPARK_TOKEN;
    id = process.env.SPARK_DEVICE_ID;

}

console.log(token);
console.log(id);
var board = new five.Board({
    io: new Spark({
        token: token,
        deviceId: id
    })
});

board.on("ready", function() {    

    servo = new five.Servo("A1");

    motorR = new five.Motor({
        pin: 'A6'
    });

    motorL = new five.Motor({
        pin: 'A7'
    });

    io.on('connection', function (socket) {
        
        servo.sweep();

        socket.on('orientation', function (data) {

            if(data.l !== undefined && data.r !== undefined){
                motorL.start(data.l);
                motorR.start(data.r);
            }

        });

    });

});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});




