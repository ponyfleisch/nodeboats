var five = require("johnny-five");
var Spark = require("spark-io");
var token;
var id;

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
