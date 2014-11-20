var five = require("johnny-five");
var Spark = require("spark-io");
var board = new five.Board({
    io: new Spark({
        token: process.env.SPARK_TOKEN,
        deviceId: process.env.SPARK_DEVICE_ID
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

    board.repl.inject({
        servo: servo,
        r: motorR,
        l: motorL
    });

});
