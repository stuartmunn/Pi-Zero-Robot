var five = require("johnny-five");
// var board = new five.Board();

var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});


board.on("ready", function() {
  console.log("Connected");

  // Initialize the servo instance
  var a = new five.Servo({
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 0,
  });

  var b = new five.Servo({
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 1,
  });

  // var degrees = 10;

   a.cw(0);
   b.cw(0);
  //a.stop();
  //b.stop();
});
