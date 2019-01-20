const {port , server , user , password} = require('../conf/asterisk-conf');
const uuid = require('uuid').v4;

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
      2) Set to work with input
      3) Add error handling.
      4) Add a real uuid. - Done, add test.
      5) Test multiple simultaneoues requests.
  */

  //Return promise - Async request.
  return new Promise(function (resolve , reject) {
    //Set up conneciton: 
    const ami = new require('asterisk-manager')(port, server, user, password, true);
    // console.log('Processing queue status request.');
    ami.keepConnected();
    const actionid = uuid();
    //Make info request
    ami.action({
      'action': 'queuestatus',
      actionid,
      'queue': queue

    } ,function (err ,res) {
      if(err){
        console.log('An errror has occred' , err);
      } else {
        console.log('Queue add results: ' , res);
      }
    });
    //First draft - incomplete - wait on all params to reach and compile a list. 
    let members = [];
    let queueInfo;
    let isCompleted = false;
    //Catch all params:
    ami.on('queueparams' , function (event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){
        console.log(event);
        queueInfo = event;
      }
      
    });

    ami.on('queuemember' , function(event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){ 
        members.push(parseEventToMember(event));
      }
    });
    ami.on('queuestatuscomplete' , function(event) {
      console.log('Completed!');
      isCompleted = true;
      resolve({
        isCompleted,
        queueInfo,
        members
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
  getQueueStatus
};