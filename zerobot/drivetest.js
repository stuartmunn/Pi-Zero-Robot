var five = require("johnny-five"), wheelsleft, wheelsright;

var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});


board.on("ready", function() {
  console.log("Zerobot ready...");
  // wheels = {};

  wheelsleft  =  new five.Servos([{
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 0,
    invert: false
    },{
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 2,
    invert: false
  }]);


  wheelsright  =  new five.Servos([{
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 1,
    invert: true
    },{
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 3,
    invert: true
  }]);


  // Add servos to REPL (optional)
  this.repl.inject({
    wheelsleft: wheelsleft,
    wheelsright: wheelsright
    // allwheels: allwheels
  });

wheelsleft.cw(1);
wheelsright.ccw(1);
// Stop driving after 3 seconds
  this.wait(5000, function() {
    wheelsleft.stop();
    wheelsright.stop();
  });
  
});

