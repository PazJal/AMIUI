//Offical libs:
const uuid = require('uuid').v4;

//Project requires:
const {generateQueueStatusObject} = require('../asteriskActionGenerators/queueActions');

const {amiPort , amiServer , amiUser , amiPassword} = require('../conf/asterisk-conf');

//Utility function to create a JSON onbject from the data.
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
const getQueueStatus = (queue) => {
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
    ami.action(generateQueueStatusObject(actionid , queue) ,function (err ,res) {
      if(err){
        console.log(`Unable to get information for queue ${queue}` , err);
      } else {
        console.log('Queue Status results: ' , res);
      }
    });
    //First draft - incomplete - wait on all params to reach and compile a list. 
    let members = [];
    let queueInfo = undefined;
    let isCompleted = false;
    //Catch all params:
    ami.on('queueparams' , function (event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){
        console.log(event);
        queueInfo = event;
      }
      
    });
    //Listen for queue member information.
    ami.on('queuemember' , function(event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){ 
        members.push(parseEventToMember(event));
      }
    });
    //Listen for queue status last message indicating all the information has been sent.
    ami.on('queuestatuscomplete' , function(event) {
      console.log('Completed!' , queueInfo);
      isCompleted = true;
      queueInfo = queueInfo ? queueInfo : {queue: 'Queue not found'};
      resolve({
        isCompleted,
        queueInfo,
        members
      });
    });
    //Set a 1 second default time out for the request:
    setTimeout(() => {
      reject('Turd!');
    }, 1000);
  }
  );    
}

module.exports = {
  getQueueStatus
};