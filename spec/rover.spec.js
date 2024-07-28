const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it ("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover (98382);
    expect (rover.position).toEqual(98382);
    expect (rover.mode). toEqual("NORMAL");
    expect (rover.generatorWatts). toEqual(110);
  });

  it ("response returned by receiveMessage contains the name of the message", function (){
    let command = [new Command ("MODE_CHANGE")];
    let message = new Message ("Test receiveMessage contains the name of the message", command);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    expect (response.message).toEqual("Test receiveMessage contains the name of the message");
  })

  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function (){
    let command = [new Command ("MODE_CHANGE"), new Command ("STATUS_CHECK")];
    let message = new Message ("Two Command Response", command);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    expect (response.results.length).toEqual(2);
  })

  it ("responds correctly to the status check command", function () {
    let command = [new Command ("STATUS_CHECK")];
    let message = new Message ("Testing Status Check Functionality", command);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    expect (response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect (response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect (response.results[0].roverStatus.position).toEqual(98382);
  });

  it ("responds correctly to the mode change command", function (){
    let command = [new Command ("MODE_CHANGE")];
    let message = new Message ("Mode Change Command Response Test", command);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    expect (response.results[0].completed).toEqual(true);
  })

  it ("responds with a false completed value when attempting to move in LOW_POWER mode", function (){
    let command = [new Command ("MODE_CHANGE", "LOW_POWER"), new Command ("MOVE", 12500)];
    let message = new Message ("Can't Move in Low Power", command);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    expect (response.results[1].Rover).toEqual("Can't be Moved in this State");
    expect (rover.position).toEqual(98382);
  })

  it ("responds with the position for the move command", function (){
    let command = [new Command ("MODE_CHANGE", "NORMAL"), new Command ("MOVE", 12500)];
    let message = new Message ("Testing new position for the Move Command", command);
    let rover = new Rover (98382);
    let response = rover.receiveMessage (message);
    expect (rover.position). toEqual (12500);
  })

});
