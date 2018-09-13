// Initialize App Server
var server = require('diet');
var app = server();
app.listen(8000);

// Require diet-static
var static = require('diet-static')({ path: app.path+'/static' });
app.footer(static);

// Set up Johnny-Five.io
var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});
var speed, motors;
// Speed hard coded to 80% (for now).

board.on("ready", function() {
  console.log("Basic Shell Contol");
  speed=0.6;
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
    }])};
});
  
// Attach static as a global footer

// Process requests
app.get('/', function($){
        console.log("Redirecting to index.html");
		$.redirect('index.html'); 
    });
app.get('/action/:actionname', function($){
        $.end('The requested action is ' + $.params.actionname);
        // console.log('The requested action is ' + $.params.actionname)
        switch($.params.actionname) {
          case "STOP":
		// Stop all motors
		motors.left.stop();
		motors.right.stop();
      		break;
          case "fwda":
                // All motors forward
		motors.left.cw(speed);
		motors.right.cw(speed);
		break;
          case "fwdl":
                // Left motors forward
		motors.left.cw(speed);
		motors.right.stop();
		break;
          case "fwdr":
                // Right motors forward
		motors.right.cw(speed);
		motors.left.stop();
		break;
          case "reva":
		// Full reverse
		motors.left.ccw(speed);
		motors.right.ccw(speed);
		break;
          case "revl":
		// Left Motors reverse
		motors.left.ccw(speed);
		motors.right.stop();
		break;
          case "revr":
		// Right motors reverse
		motors.right.ccw(speed);
		motors.left.stop();
		break;
	  default:
		// Serve a 404
      }
    });
