var five = require("johnny-five"), motors, speed;
var keypress = require("keypress");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});


board.on("ready", function() {
  console.log("Basic Shell Contol");
  console.log("Use Arrow Keys to move. Space Bar to stop");
  speed=0.3;
  motors = {
   left : new five.Servos([{
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
  }]),
  right :  new five.Servos([{
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
  }])}


  // Add servos to REPL (optional)
  this.repl.inject({
    motors: motors
  });

// Stop driving after 3 seconds
  this.wait(5000, function() {
     // slight pause
  });
 function controller(ch, key) {
    if (key) {
      if (key.name === "space") {
        motors.left.stop();
        motors.right.stop();
      }
      if (key.name === "up") {
        motors.left.cw(speed);
        motors.right.cw(speed);
      }
      if (key.name === "down") {
        motors.left.ccw(speed);
        motors.right.ccw(speed);
      }
      if (key.name === "right") {
        motors.left.cw(speed);
        // motors.right.ccw(speed / 2);
      }
      if (key.name === "left") {
        // motors.left.ccw(speed / 2);
        motors.right.cw(speed);
      }
	}
 }

  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();

});

