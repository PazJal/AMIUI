const {amiPort , amiServer , amiUser , amiPassword} = require('../conf/asterisk-conf');
const uuid = require('uuid').v4;
const {generateAgentLoginObject} = require('../asteriskActionGenerators/queueActions');

const parseEventToMember = (event) => {
  return {
    callsTaken:  event.callstaken,
    sinceLastCall: event.lastcall,
    name: event.name,
    paused: !!event.paused,
    queue: event.queue,
    stateInterface: event.stateinterface,
    status: event.status
  };
}



//A function that queries the AMI regarding a certain queue status.

const addMemberToQueue = (queue , endpoint , name) => {
  /*
    TODO: At the moment is set to a hardcoded queue. 
      1) Add input validation
      2) Set to work with input - Done , add tests.
      3) Add error handling.
      4) Add a real uuid. - Done, add test.
      5) Test multiple simultaneoues requests.
  */

  //Return promise - Async request.
  return new Promise(function (resolve , reject) {
    //Set up conneciton: 
    const ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
    // console.log('Processing queue status request.');
    ami.keepConnected();
    const actionid = uuid();
    //Make info request
    ami.action( generateAgentLoginObject(actionid, queue , endpoint , name) ,function (err ,res) {
      if(err){
        console.log(`Error - Unable to add to queue. Queue: ${queue} , Endpoint: ${endpoint}, Name: ${name}` , err);
      } else {
        console.log('Queue add results: ' , res);
      }
    });
    //First draft - incomplete - wait on all params to reach and compile a list. 
    ami.on('queuememberadded' , function(event) {
      console.log('added queue member');
      resolve({
        event
      });
    });
    //Data pull complete:
    setTimeout(() => {
      reject('Turd!');
    }, 1000);
  }
  );    
}


module.exports = {
  addMemberToQueue
};