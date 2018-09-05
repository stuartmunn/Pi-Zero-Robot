var five = require("johnny-five");
// var board = new five.Board();

var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});


board.on("ready", function() {
  console.log("Zerobot ready...");
  
  wheels = {};
  
  var wheels.frontleft = new five.Servo({
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 0,
	invert: true;
  });

  var wheels.frontright = new five.Servo({
    address: 0x40,
    controller: "PCA9685",
    type: "continuous",
    pin: 1,
	invert: true
  });

 
  wheels.both = new five.Servos().stop(); // reference both together

  
  // Add servos to REPL (optional)
  this.repl.inject({
    wheels: wheels
  });

// Stop driving after 3 seconds
  this.wait(3000, function() {
    wheels.both.stop();
  });
  
});
